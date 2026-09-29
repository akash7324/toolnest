import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getRecentHistory } from "@/lib/user-data";

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const history = await getRecentHistory(session.user.id, 50);
  return <DashboardShell title="Tool History" description="See the tools you have recently opened."><div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">{history.length ? <div className="divide-y divide-[var(--border)]">{history.map((item) => item.tool && <Link key={item.id} href={`/tools/${item.toolSlug}`} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div><p className="font-semibold">{item.tool.name}</p><p className="mt-1 text-sm text-[var(--muted)]">{item.tool.category}</p></div><time className="text-xs text-[var(--muted)]">{new Date(item.createdAt).toLocaleString("en-IN")}</time></Link>)}</div> : <p className="text-sm text-[var(--muted)]">No tool history yet.</p>}</div></DashboardShell>;
}
