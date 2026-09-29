import { NextResponse } from "next/server";
import { requireAdminResponse } from "@/lib/admin/route";
import { connectToDatabase } from "@/lib/mongodb";
import Subscription from "@/models/subscription";
export async function GET() { const { response } = await requireAdminResponse(); if (response) return response; await connectToDatabase(); const rows = await Subscription.find({}).populate("userId", "name email").sort({ createdAt: -1 }).limit(500).lean(); return NextResponse.json(rows.map((r) => ({ ...r, _id: r._id.toString(), user: r.userId && typeof r.userId === "object" ? r.userId : null, userId: undefined }))); }
