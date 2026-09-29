import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { requireAdminResponse } from "@/lib/admin/route";
export async function GET() {
  const { response } = await requireAdminResponse(); if (response) return response;
  await connectToDatabase(); const users = await User.find({}).select("name email role isActive createdAt updatedAt").sort({ createdAt: -1 }).lean();
  return NextResponse.json(users.map((u) => ({ ...u, _id: u._id.toString() })));
}
