import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/config/site";
import { calculators } from "@/lib/calculators/data";
import { mediaTools } from "@/lib/media/data";
import { textTools } from "@/lib/text-tools/data";

export function generateStaticParams() { return categories.map(c => ({ slug: c.slug })); }
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) notFound();
  const all = [...calculators.map(t => ({ ...t, category: "Calculators" })), ...textTools, ...mediaTools];
  const tools = all.filter(t => t.category.toLowerCase().replaceAll(" ", "-") === slug);
  return <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><Link href="/categories" className="text-sm text-[var(--muted)]">← All categories</Link><h1 className="mt-5 text-4xl font-black">{category.name}</h1><p className="mt-3 max-w-2xl text-[var(--muted)]">{category.description}</p><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tools.length ? tools.map(t => <Link key={t.slug} href={`/tools/${t.slug}`} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 hover:-translate-y-1 hover:shadow-md"><h2 className="font-semibold">{t.name}</h2><p className="mt-2 text-sm text-[var(--muted)]">{t.description}</p></Link>) : <p className="text-sm text-[var(--muted)]">More tools are planned for this category.</p>}</div></main>;
}
