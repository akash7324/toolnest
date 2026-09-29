import { NextResponse } from "next/server";
import { requireAdminResponse } from "@/lib/admin/route";
import { ensureCatalogSeeded } from "@/lib/admin/data";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/category";
import { categorySchema } from "@/lib/admin/validation";
export async function GET() { const { response } = await requireAdminResponse(); if (response) return response; await ensureCatalogSeeded(); const rows = await Category.find({}).sort({ sortOrder: 1, name: 1 }).lean(); return NextResponse.json(rows.map((r) => ({ ...r, _id: r._id.toString() }))); }
export async function POST(request: Request) { const { response } = await requireAdminResponse(); if (response) return response; const parsed = categorySchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Invalid category data." }, { status: 400 }); try { await connectToDatabase(); const row = await Category.create(parsed.data); return NextResponse.json({ ...row.toObject(), _id: row._id.toString() }, { status: 201 }); } catch { return NextResponse.json({ error: "Unable to create category. The slug may already exist." }, { status: 409 }); } }
