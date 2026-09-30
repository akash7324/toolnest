import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getFavoriteTools, getRecentHistory, getUsageSummary } from "@/lib/user-data";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const [favorites, history, usage] = await Promise.all([getFavoriteTools(session.user.id), getRecentHistory(session.user.id, 5), getUsageSummary(session.user.id)]);

  return <DashboardShell title={`Welcome, ${session.user.name ?? "there"}`} description="Manage your saved tools, recent activity and account from one place.">
    <div className="grid gap-4 sm:grid-cols-3">
      {[['Tools opened', usage.opened], ['Completed', usage.completed], ['Unique tools', usage.uniqueTools]].map(([label, value]) => <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Saved tools</h2><Link href="/dashboard/saved" className="text-sm font-semibold text-indigo-600">View all</Link></div>{favorites.length ? <div className="mt-4 space-y-2">{favorites.slice(0, 5).map((tool) => tool && <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block rounded-xl border border-[var(--border)] p-4 hover:border-indigo-300"><p className="font-semibold">{tool.name}</p><p className="mt-1 text-sm text-[var(--muted)]">{tool.description}</p></Link>)}</div> : <p className="mt-4 text-sm text-[var(--muted)]">You have not saved any tools yet.</p>}</section>
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Recent activity</h2><Link href="/dashboard/history" className="text-sm font-semibold text-indigo-600">View history</Link></div>{history.length ? <div className="mt-4 space-y-2">{history.map((item) => item.tool && <Link key={item.id} href={`/tools/${item.toolSlug}`} className="block rounded-xl border border-[var(--border)] p-4 hover:border-indigo-300"><p className="font-semibold">{item.tool.name}</p><p className="mt-1 text-xs text-[var(--muted)]">{new Date(item.createdAt).toLocaleString("en-IN")}</p></Link>)}</div> : <p className="mt-4 text-sm text-[var(--muted)]">Your tool activity will appear here.</p>}</section>
    </div>
  </DashboardShell>;
}
