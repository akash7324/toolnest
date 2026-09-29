import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";
import { getSubscriptionProvider } from "@/lib/subscription/provider";

const schema = z.object({
  planId: z.literal("pro"),
  interval: z.enum(["monthly", "yearly"]),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid subscription request." }, { status: 400 });
  }

  const provider = getSubscriptionProvider();
  if (!provider) {
    return NextResponse.json(
      { error: "Pro billing is not enabled yet. Razorpay integration is a future module." },
      { status: 501 },
    );
  }

  const result = await provider.createSubscription({
    userId: session.user.id,
    planId: parsed.data.planId,
    interval: parsed.data.interval,
  });

  return NextResponse.json(result);
}
