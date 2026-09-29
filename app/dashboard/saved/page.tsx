import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getFavoriteTools } from "@/lib/user-data";

export default async function SavedPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const favorites = await getFavoriteTools(session.user.id);
  return <DashboardShell title="Saved Tools" description="Keep your frequently used tools one tap away."><div className="grid gap-4 sm:grid-cols-2">{favorites.length ? favorites.map((tool) => tool && <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-indigo-300"><p className="font-bold">{tool.name}</p><p className="mt-2 text-sm text-[var(--muted)]">{tool.description}</p></Link>) : <div className="rounded-3xl border border-dashed border-[var(--border)] p-8 sm:col-span-2"><p className="font-semibold">No saved tools yet.</p><p className="mt-2 text-sm text-[var(--muted)]">Open a tool and use “Save tool” to add it here.</p></div>}</div></DashboardShell>;
}
