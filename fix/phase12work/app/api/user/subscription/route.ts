import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserSubscription } from "@/lib/subscription/data";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const subscription = await getUserSubscription(session.user.id);
  return NextResponse.json(subscription);
}
