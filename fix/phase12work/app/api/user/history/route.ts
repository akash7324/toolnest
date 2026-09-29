import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import ToolUsage from "@/models/tool-usage";
import { getTool } from "@/lib/tools/catalog";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const history = await ToolUsage.find({ userId: session.user.id, event: "opened" }).sort({ createdAt: -1 }).limit(50).lean();
  return NextResponse.json({ history: history.map((item) => ({ toolSlug: item.toolSlug, tool: getTool(item.toolSlug), createdAt: item.createdAt })) });
}
