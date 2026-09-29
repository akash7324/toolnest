import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/favorite";
import { getTool } from "@/lib/tools/catalog";
import { z } from "zod";

const schema = z.object({ toolSlug: z.string().min(1).max(120) });

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const favorites = await Favorite.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ favorites: favorites.map((item) => item.toolSlug) });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success || !getTool(parsed.data.toolSlug)) return NextResponse.json({ error: "Unknown tool." }, { status: 400 });

  await connectToDatabase();
  const existing = await Favorite.findOne({ userId: session.user.id, toolSlug: parsed.data.toolSlug });
  if (existing) {
    await existing.deleteOne();
    return NextResponse.json({ favorited: false });
  }

  await Favorite.create({ userId: session.user.id, toolSlug: parsed.data.toolSlug });
  return NextResponse.json({ favorited: true });
}
