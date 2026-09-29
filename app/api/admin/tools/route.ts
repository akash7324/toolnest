import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Tool from "@/models/tool";
import { requireAdminResponse } from "@/lib/admin/route";
import { toolSchema } from "@/lib/admin/validation";
import { ensureCatalogSeeded } from "@/lib/admin/data";
export async function GET() { const { response } = await requireAdminResponse(); if (response) return response; await ensureCatalogSeeded(); const tools = await Tool.find({}).sort({ category: 1, sortOrder: 1, name: 1 }).lean(); return NextResponse.json(tools.map((t) => ({ ...t, _id: t._id.toString() })));
}
export async function POST(request: Request) { const { response } = await requireAdminResponse(); if (response) return response; const parsed = toolSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Invalid tool data.", details: parsed.error.flatten() }, { status: 400 }); try { await connectToDatabase(); const tool = await Tool.create(parsed.data); return NextResponse.json({ ...tool.toObject(), _id: tool._id.toString() }, { status: 201 }); } catch { return NextResponse.json({ error: "Unable to create tool. The slug may already exist." }, { status: 409 }); } }
