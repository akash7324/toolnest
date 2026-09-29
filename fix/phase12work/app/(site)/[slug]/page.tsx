import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getCalculator } from "@/lib/calculators/data";
import { getMediaTool } from "@/lib/media/data";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { MediaToolShell } from "@/components/media/media-tool-shell";
import { FavoriteButton } from "@/components/dashboard/favorite-button";
import { UsageTracker } from "@/components/dashboard/usage-tracker";
import { AdSlot } from "@/components/ads/ad-slot";

const pages: Record<string, { title: string; text: string }> = {
  pricing: { title: "Pricing", text: "The Pro subscription concept is reserved for a future phase. No payment integration is active yet." },
  blog: { title: "Blog", text: "The content system will be added in a later phase." },
  about: { title: "About ToolNest", text: "ToolNest is a simple, useful home for everyday online utilities." },
  contact: { title: "Contact", text: "Contact forms and database-backed messages will be added in a later phase." },
  privacy: { title: "Privacy Policy", text: "The production privacy policy will be finalized before advertising integration is enabled." },
  terms: { title: "Terms & Conditions", text: "Production terms will be finalized before public monetization." },
};

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  const media = getMediaTool(slug);

  if (calculator || media) {
    const session = await auth();
    return <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link href="/tools" className="text-sm font-semibold text-indigo-600">← All tools</Link>
        {session?.user?.id ? <FavoriteButton toolSlug={slug} /> : <Link href={`/login?callbackUrl=/tools/${slug}`} className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold">Log in to save</Link>}
      </div>
      {session?.user?.id && <UsageTracker toolSlug={slug} />}
      <p className="text-sm font-semibold text-indigo-600">{calculator?.category ?? media?.category}</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">{calculator?.name ?? media?.name}</h1>
      <p className="mt-3 max-w-3xl text-[var(--muted)]">{calculator?.description ?? media?.description}</p>
      <AdSlot placement="tool" />
      <div className="mt-8">{calculator ? <CalculatorShell calculator={calculator} /> : media ? <MediaToolShell slug={slug} /> : null}</div>
    </main>;
  }

  const page = pages[slug];
  if (!page) notFound();
  return <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6"><div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-12"><p className="text-sm font-semibold text-indigo-600">ToolNest</p><h1 className="mt-2 text-4xl font-black">{page.title}</h1><p className="mt-5 leading-7 text-[var(--muted)]">{page.text}</p><Link href="/" className="mt-8 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">Back home</Link></div></main>;
}
