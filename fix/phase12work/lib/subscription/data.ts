import { connectToDatabase } from "@/lib/mongodb";
import Subscription from "@/models/subscription";
import { PLANS, type PlanId } from "@/config/plans";

export async function getUserSubscription(userId: string) {
  await connectToDatabase();
  const subscription = await Subscription.findOne({ userId, status: "active" })
    .sort({ createdAt: -1 })
    .lean();

  if (!subscription) {
    return { plan: PLANS.free, status: "active" as const, source: "default" as const };
  }

  const planId = (subscription.plan === "pro" ? "pro" : "free") as PlanId;
  const expired = Boolean(subscription.currentPeriodEnd && new Date(subscription.currentPeriodEnd) <= new Date());

  if (expired && planId === "pro") {
    return { plan: PLANS.free, status: "active" as const, source: "expired" as const };
  }

  return {
    plan: PLANS[planId],
    status: subscription.status,
    source: "database" as const,
    currentPeriodEnd: subscription.currentPeriodEnd ?? null,
    provider: subscription.provider,
  };
}

export async function hasProAccess(userId: string) {
  const subscription = await getUserSubscription(userId);
  return subscription.plan.id === "pro" && subscription.status === "active";
}
