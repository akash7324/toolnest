import Link from "next/link";
import { BarChart3, Bookmark, Clock3, CreditCard, LayoutDashboard, Settings, UserRound } from "lucide-react";

const items = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Profile", "/dashboard/profile", UserRound],
  ["Tool History", "/dashboard/history", Clock3],
  ["Saved Tools", "/dashboard/saved", Bookmark],
  ["Usage", "/dashboard/usage", BarChart3],
  ["Subscription", "/dashboard/subscription", CreditCard],
  ["Settings", "/dashboard/settings", Settings],
] as const;

export function DashboardNav() {
  return (
    <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Account navigation">
      {items.map(([label, href, Icon]) => (
        <Link key={href} href={href} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm font-semibold transition hover:border-indigo-300 hover:text-indigo-600">
          <Icon size={17} /> {label}
        </Link>
      ))}
    </nav>
  );
}
