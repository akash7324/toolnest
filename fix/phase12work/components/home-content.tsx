"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Check,
  FileText,
  Gauge,
  GraduationCap,
  Image as ImageIcon,
  Search,
  ShieldCheck,
  Sparkles,
  Type,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { categories, placeholderTools } from "@/config/site";
import { ToolCard } from "./tool-card";

const categoryIcons = { Calculator, Type, Image: ImageIcon, FileText, Zap, GraduationCap };

export function HomeContent() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(
    () => placeholderTools.filter((tool) => `${tool.name} ${tool.category} ${tool.description}`.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const popular = placeholderTools.filter((tool) => tool.popular);
  const valueProps: Array<[LucideIcon, string, string]> = [
    [ShieldCheck, "Privacy-first", "Browser-side processing where possible, with no unnecessary file storage."],
    [Gauge, "Fast by design", "Lean pages, reusable components and a modern Next.js architecture."],
    [Sparkles, "Built to grow", "A scalable foundation ready for accounts, blog, subscriptions and ads."],
  ];

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,.18),transparent_44%)]" />
        <div className="absolute left-1/2 top-28 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="mx-auto max-w-5xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:pt-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300">
            <Sparkles size={14} /> Free tools. Zero hassle.
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            All Your Essential Tools.
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">In One Place.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Free online tools for calculations, text, images, PDFs, productivity and everyday tasks.
          </p>

          <div className="relative mx-auto mt-9 max-w-2xl">
            <div className="flex items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-xl shadow-slate-900/5 ring-1 ring-black/[.02]">
              <Search className="ml-3 shrink-0 text-slate-400" size={20} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a tool..."
                aria-label="Search tools"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
              />
              <Link href="/tools" className="hidden rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500 sm:block">
                Browse all
              </Link>
            </div>

            {query && (
              <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 text-left shadow-2xl">
                {results.length ? results.slice(0, 6).map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block rounded-xl px-3 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                    <span className="text-sm font-semibold">{tool.name}</span>
                    <span className="ml-2 text-xs text-[var(--muted)]">{tool.category}</span>
                  </Link>
                )) : (
                  <p className="px-3 py-4 text-sm text-[var(--muted)]">No matching tool found yet.</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[var(--muted)]">
            <span>✓ No signup required</span>
            <span>✓ Browser-friendly</span>
            <span>✓ Mobile ready</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-indigo-600">Popular tools</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Start with something useful</h2>
          </div>
          <Link href="/tools" className="hidden items-center gap-1 text-sm font-bold text-indigo-600 sm:flex">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold text-indigo-600">Explore by category</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Find the right tool faster</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Everything is organized into focused categories so you can get to the task you need without digging through clutter.</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = categoryIcons[category.icon as keyof typeof categoryIcons] ?? Zap;
              return (
                <Link href={`/categories/${category.slug}`} key={category.slug} className="group rounded-2xl border border-[var(--border)] p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-indigo-900">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200"><Icon size={20} /></span>
                    <div><h3 className="font-semibold group-hover:text-indigo-600">{category.name}</h3><p className="mt-1 text-sm leading-6 text-[var(--muted)]">{category.description}</p></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {valueProps.map(([Icon, title, text]) => (
            <div key={String(title)} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <Icon size={22} className="text-indigo-600" aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{String(text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-white sm:px-12">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold text-indigo-300">ToolNest Pro — coming later</p>
              <h2 className="mt-2 max-w-xl text-3xl font-bold tracking-tight">More power, without the clutter.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">The first release stays free. A future Pro plan may add higher limits, saved history, bulk processing and an ad-free experience.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:min-w-64">
              <div className="text-sm text-slate-300">Planned starting price</div>
              <div className="mt-1 text-3xl font-black">₹99<span className="text-sm font-medium text-slate-400">/month</span></div>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {["Higher usage limits", "Saved history", "No advertisements"].map((item) => <li key={item} className="flex gap-2"><Check size={14} className="text-indigo-300" />{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
