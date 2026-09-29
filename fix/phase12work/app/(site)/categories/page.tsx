import Link from "next/link";
import { categories } from "@/config/site";

export default function CategoriesPage() { return <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><h1 className="text-4xl font-black">Tool Categories</h1><p className="mt-4 max-w-2xl text-[var(--muted)]">Browse ToolNest by the kind of task you want to complete.</p><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map(c => <Link key={c.slug} href={`/categories/${c.slug}`} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 hover:-translate-y-1 hover:shadow-md"><h2 className="font-semibold">{c.name}</h2><p className="mt-2 text-sm text-[var(--muted)]">{c.description}</p></Link>)}</div></main>; }
