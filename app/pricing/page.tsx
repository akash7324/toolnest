import type { Metadata } from "next";
import Link from "next/link";
import { PLANS } from "@/config/plans";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare ToolNest Free and Pro plans.",
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-indigo-600">ToolNest Pricing</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Simple plans for every workflow.</h1>
        <p className="mt-4 text-[var(--muted)]">Start free today. Pro pricing is prepared for a future payment launch; no payment is collected in this version.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {([PLANS.free, PLANS.pro]).map((plan) => (
          <section key={plan.id} className={`rounded-3xl border bg-[var(--card)] p-7 ${plan.id === "pro" ? "border-indigo-400 shadow-lg" : "border-[var(--border)]"}`}>
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="text-2xl font-black">{plan.name}</h2><p className="mt-1 text-sm text-[var(--muted)]">{plan.id === "pro" ? "For power users and frequent workflows." : "For everyday essential tools."}</p></div>
              {plan.id === "pro" && <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">Future Pro</span>}
            </div>
            <div className="mt-6"><span className="text-4xl font-black">₹{plan.monthlyPriceInr}</span><span className="text-[var(--muted)]"> / month</span></div>
            {plan.id === "pro" && <p className="mt-1 text-sm text-[var(--muted)]">₹{plan.yearlyPriceInr} / year</p>}
            <ul className="mt-6 space-y-3 text-sm">
              {plan.features.map((feature) => <li key={feature} className="flex gap-2"><span className="font-bold text-indigo-600">✓</span>{feature}</li>)}
            </ul>
            <Link href={plan.id === "pro" ? "/dashboard/subscription" : "/register"} className="mt-7 block rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-indigo-500">
              {plan.id === "pro" ? "View Pro status" : "Get started free"}
            </Link>
          </section>
        ))}
      </div>
    </main>
  );
}
