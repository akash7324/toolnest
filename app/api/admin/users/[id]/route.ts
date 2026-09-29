import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { requireAdminResponse } from "@/lib/admin/route";
const schema = z.object({ role: z.enum(["user", "admin"]).optional(), isActive: z.boolean().optional() }).refine((v) => v.role !== undefined || v.isActive !== undefined);
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, response } = await requireAdminResponse(); if (response) return response;
  const { id } = await params; const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid user update." }, { status: 400 });
  if (id === session?.user?.id && parsed.data.isActive === false) return NextResponse.json({ error: "You cannot deactivate your own admin account." }, { status: 400 });
  await connectToDatabase(); const updated = await User.findByIdAndUpdate(id, parsed.data, { new: true, runValidators: true }).select("name email role isActive createdAt").lean();
  if (!updated) return NextResponse.json({ error: "User not found." }, { status: 404 });
  return NextResponse.json({ ...updated, _id: updated._id.toString() });
}
