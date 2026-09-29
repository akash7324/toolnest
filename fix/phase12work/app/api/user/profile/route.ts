import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(80, "Name is too long."),
});

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = profileSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid name." }, { status: 400 });

  await connectToDatabase();
  const user = await User.findByIdAndUpdate(session.user.id, { $set: { name: parsed.data.name } }, { new: true }).select("name email role");
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  return NextResponse.json({ user: { name: user.name, email: user.email, role: user.role } });
}
