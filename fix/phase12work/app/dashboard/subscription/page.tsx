import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getUserSubscription } from "@/lib/subscription/data";
import { PLANS } from "@/config/plans";

export const metadata: Metadata = { title: "Subscription" };

export default async function SubscriptionPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const subscription = await getUserSubscription(session.user.id);
  const plan = subscription.plan;

  return (
    <DashboardShell title="Subscription" description="Manage your ToolNest plan and see the features available to your account.">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7">
          <p className="text-sm font-semibold text-indigo-600">Current plan</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-black">{plan.name}</h2>
            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold uppercase tracking-wide">{subscription.status}</span>
          </div>
          <p className="mt-3 text-[var(--muted)]">{plan.id === "pro" ? "Your Pro entitlement is active." : "You are currently using ToolNest for free. No payment is active."}</p>
          <ul className="mt-6 space-y-3 text-sm">{plan.features.map((feature) => <li key={feature} className="flex gap-2"><span className="font-bold text-indigo-600">✓</span>{feature}</li>)}</ul>
          {subscription.currentPeriodEnd && <p className="mt-6 text-sm text-[var(--muted)]">Current period ends: {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-IN")}</p>}
        </section>

        <section className="rounded-3xl border border-indigo-200 bg-indigo-50 p-7 dark:border-indigo-900 dark:bg-indigo-950/30">
          <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Pro plan</p>
          <h2 className="mt-2 text-2xl font-black">₹{PLANS.pro.monthlyPriceInr}/month</h2>
          <p className="mt-1 text-sm text-indigo-900/70 dark:text-indigo-200/70">or ₹{PLANS.pro.yearlyPriceInr}/year</p>
          <p className="mt-4 text-sm text-indigo-900/80 dark:text-indigo-200/80">Payment collection is intentionally disabled in this ₹0 phase. The Razorpay provider boundary is ready for a future launch.</p>
          <button disabled className="mt-6 w-full cursor-not-allowed rounded-xl bg-indigo-300 px-4 py-3 text-sm font-bold text-white dark:bg-indigo-900/60">Pro checkout coming later</button>
        </section>
      </div>
    </DashboardShell>
  );
}
