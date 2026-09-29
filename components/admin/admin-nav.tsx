import Link from "next/link";
import { BarChart3, BookOpen, Boxes, FolderTree, Gauge, Mail, Settings, Users, CreditCard } from "lucide-react";
const links = [
  ["/admin", "Overview", Gauge], ["/admin/users", "Users", Users], ["/admin/tools", "Tools", Boxes], ["/admin/categories", "Categories", FolderTree], ["/admin/blog", "Blog", BookOpen], ["/admin/messages", "Messages", Mail], ["/admin/subscriptions", "Subscriptions", CreditCard], ["/admin/reports", "Reports", BarChart3], ["/admin/settings", "Settings", Settings],
] as const;
export function AdminNav({ current }: { current?: string }) { return <nav className="mb-8 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2"><div className="flex min-w-max gap-1">{links.map(([href, label, Icon]) => <Link key={href} href={href} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${current === href ? "bg-indigo-600 text-white" : "hover:bg-black/5 dark:hover:bg-white/5"}`}><Icon size={16} />{label}</Link>)}</div></nav>; }
