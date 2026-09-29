import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SignOutButton } from "@/components/dashboard/account-actions";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return <DashboardShell title="Account Settings" description="Manage your current session and review account basics."><div className="max-w-xl space-y-4"><div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"><h2 className="font-bold">Account</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">Email</dt><dd className="font-semibold">{session.user.email}</dd></div><div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">Role</dt><dd className="font-semibold capitalize">{session.user.role}</dd></div></dl></div><div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"><h2 className="font-bold">Session</h2><p className="mt-2 text-sm text-[var(--muted)]">Sign out from this device. You can log back in anytime.</p><div className="mt-5"><SignOutButton /></div></div></div></DashboardShell>;
}
