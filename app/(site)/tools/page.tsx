import Link from "next/link";
import { calculators } from "@/lib/calculators/data";
import { mediaTools } from "@/lib/media/data";
import { textTools } from "@/lib/text-tools/data";

export default function ToolsPage() {
  const tools = [...calculators.map(t => ({ ...t, category: "Calculators" })), ...textTools, ...mediaTools];
  return <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-sm font-semibold text-indigo-600">Tool library</p><h1 className="mt-2 text-4xl font-black tracking-tight">All Tools</h1><p className="mt-4 max-w-2xl text-[var(--muted)]">Use ToolNest&apos;s calculators, text, image and PDF tools directly in your browser.</p><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tools.map(tool => <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"><p className="text-xs font-bold uppercase tracking-wider text-indigo-600">{tool.category}</p><h2 className="mt-2 text-lg font-bold">{tool.name}</h2><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{tool.description}</p></Link>)}</div></main>;
}
