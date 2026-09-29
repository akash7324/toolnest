import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ToolNest Blog",
  description: "Practical guides, calculator explainers, productivity tips and useful online-tool tutorials from ToolNest.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts(24);
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">ToolNest Blog</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Useful guides for everyday work.</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--muted)]">Practical articles about calculations, productivity, text, images, PDFs and the tools that make everyday tasks easier.</p>
      </header>

      {posts.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
              {post.featuredImage ? <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url("${post.featuredImage}")` }} aria-label="Featured image" /> : <div className="h-44 bg-gradient-to-br from-indigo-500/15 via-transparent to-slate-500/10" />}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--muted)]"><span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-indigo-600">{post.category}</span>{post.publishedAt && <span className="inline-flex items-center gap-1"><CalendarDays size={13} />{new Date(post.publishedAt).toLocaleDateString("en-IN")}</span>}</div>
                <h2 className="mt-4 text-xl font-bold tracking-tight group-hover:text-indigo-600"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600">Read article <ArrowUpRight size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="mt-10 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--card)] p-10 text-center"><h2 className="text-xl font-bold">No published articles yet.</h2><p className="mt-2 text-[var(--muted)]">Publish your first article from the admin blog manager when the database is configured.</p></section>
      )}
    </main>
  );
}
