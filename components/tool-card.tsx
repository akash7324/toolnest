import Link from "next/link";
import { ArrowUpRight, Calculator, CalendarDays, CaseSensitive, FileImage, FileText, IndianRupee, Percent, ReceiptIndianRupee, Scaling, Type, Zap, Image as ImageIcon, GraduationCap } from "lucide-react";
import type { Tool } from "@/types";

const icons = { Calculator, CalendarDays, CaseSensitive, FileImage, FileText, IndianRupee, Percent, ReceiptIndianRupee, Scaling, Type, Zap, Image: ImageIcon, GraduationCap };

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = icons[tool.icon as keyof typeof icons] ?? Zap;
  return <Link href={`/tools/${tool.slug}`} className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:hover:border-indigo-900">
    <div className="mb-8 flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"><Icon size={21} /></span><ArrowUpRight className="text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500" size={19} /></div>
    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">{tool.category}</p><h3 className="text-base font-semibold">{tool.name}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{tool.description}</p>
  </Link>;
}
