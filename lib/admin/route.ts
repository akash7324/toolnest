import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/blog/auth";

export async function requireAdminResponse() {
  const session = await requireAdmin();
  if (!session) return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  return { session, response: null };
}
