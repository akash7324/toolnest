import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import ToolUsage from "@/models/tool-usage";
import { getTool } from "@/lib/tools/catalog";

const usageSchema = z.object({
  toolSlug: z.string().min(1).max(120),
  event: z.enum(["opened", "completed"]),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ tracked: false });
  const parsed = usageSchema.safeParse(await request.json());
  if (!parsed.success || !getTool(parsed.data.toolSlug)) return NextResponse.json({ error: "Unknown tool." }, { status: 400 });

  await connectToDatabase();
  await ToolUsage.create({ userId: session.user.id, ...parsed.data });
  return NextResponse.json({ tracked: true });
}
