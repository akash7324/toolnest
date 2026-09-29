import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getUsageSummary } from "@/lib/user-data";

export default async function UsagePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const usage = await getUsageSummary(session.user.id);
  return <DashboardShell title="Usage" description="A simple overview of your ToolNest activity. We only track useful product events needed for this account feature."><div className="grid gap-4 sm:grid-cols-3">{[["Tools opened", usage.opened, "Times you opened a tool"], ["Tools completed", usage.completed, "Completed tool actions"], ["Unique tools", usage.uniqueTools, "Different tools used"]].map(([label, value, note]) => <div key={String(label)} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-4xl font-black">{value}</p><p className="mt-2 text-xs text-[var(--muted)]">{note}</p></div>)}</div></DashboardShell>;
}
