import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminResponse } from "@/lib/admin/route";
import { connectToDatabase } from "@/lib/mongodb";
import ContactMessage from "@/models/contact-message";
const schema = z.object({ status: z.enum(["new", "read", "archived"]) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { const { response } = await requireAdminResponse(); if (response) return response; const { id } = await params; const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Invalid status." }, { status: 400 }); await connectToDatabase(); const row = await ContactMessage.findByIdAndUpdate(id, parsed.data, { new: true }).lean(); if (!row) return NextResponse.json({ error: "Message not found." }, { status: 404 }); return NextResponse.json({ ...row, _id: row._id.toString() }); }
