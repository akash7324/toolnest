import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getPublishedPostBySlug } from "@/lib/blog/data";
import { AdInArticle } from "@/components/ads/ad-in-article";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, url: `${siteConfig.url}/blog/${post.slug}`, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, datePublished: post.publishedAt, dateModified: post.createdAt, mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`, image: post.featuredImage || undefined, author: { "@type": "Organization", name: siteConfig.name } };
  const breadcrumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` }] };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <nav className="flex flex-wrap items-center gap-1 text-sm text-[var(--muted)]"><Link href="/">Home</Link><ChevronRight size={15} /><Link href="/blog">Blog</Link><ChevronRight size={15} /><span>{post.title}</span></nav>
      <article className="mt-8">
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[var(--muted)]"><span className="rounded-full bg-indigo-500/10 px-3 py-1 text-indigo-600">{post.category}</span>{post.publishedAt && <span className="inline-flex items-center gap-1"><CalendarDays size={15} />{new Date(post.publishedAt).toLocaleDateString("en-IN")}</span>}</div>
        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-xl leading-8 text-[var(--muted)]">{post.excerpt}</p>
        {post.featuredImage && <div className="mt-8 h-64 rounded-3xl bg-cover bg-center sm:h-80" style={{ backgroundImage: `url("${post.featuredImage}")` }} aria-label="Featured image" />}
        <div className="mt-10 space-y-5 text-base leading-8 text-[var(--foreground)] sm:text-lg">{paragraphs.map((paragraph, index) => <p key={`${post.id}-${index}`}>{paragraph}</p>)}</div>
        <AdInArticle />
        {post.tags.length > 0 && <div className="mt-10 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--muted)]">#{tag}</span>)}</div>}
      </article>
    </main>
  );
}
