import { NextResponse } from "next/server";
import { requireAdminResponse } from "@/lib/admin/route";
import { connectToDatabase } from "@/lib/mongodb";
import ContactMessage from "@/models/contact-message";
export async function GET() { const { response } = await requireAdminResponse(); if (response) return response; await connectToDatabase(); const rows = await ContactMessage.find({}).sort({ createdAt: -1 }).limit(500).lean(); return NextResponse.json(rows.map((r) => ({ ...r, _id: r._id.toString() }))); }
