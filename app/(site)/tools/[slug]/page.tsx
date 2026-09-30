import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { calculators, getCalculator } from "@/lib/calculators/data";
import { getMediaTool, mediaTools } from "@/lib/media/data";
import { getTextTool, textTools } from "@/lib/text-tools/data";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { MediaToolShell } from "@/components/media/media-tool-shell";
import { TextToolShell } from "@/components/text-tools/text-tool-shell";
import { UsageTracker } from "@/components/dashboard/usage-tracker";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdInArticle } from "@/components/ads/ad-in-article";

export function generateStaticParams() {
  return [...calculators, ...textTools, ...mediaTools].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (calculator) return { title: `${calculator.name} | ToolNest`, description: calculator.description, alternates: { canonical: `/tools/${calculator.slug}` } };
  const media = getMediaTool(slug);
  const text = getTextTool(slug);
  if (text) return { title: `${text.name} | ToolNest`, description: text.description, alternates: { canonical: `/tools/${text.slug}` } };
  if (media) return { title: `${media.name} | ToolNest`, description: media.description, alternates: { canonical: `/tools/${media.slug}` } };
  return { title: "Tool not found | ToolNest" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  const media = getMediaTool(slug);
  const text = getTextTool(slug);

  if (!calculator && !media && !text) notFound();

  const tool = calculator || media || text!;
  const isCalculator = Boolean(calculator);
  const session = await auth();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {session?.user?.id && <UsageTracker toolSlug={slug} />}

      <nav className="text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tools" className="hover:text-indigo-600">Tools</Link>
        <span className="mx-2">/</span>
        <span>{tool.name}</span>
      </nav>

      <header className="mt-8">
        <p className="text-sm font-bold text-indigo-600">{tool.category}</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{tool.name}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{tool.description}</p>
      </header>

      <AdSlot placement="tool" />

      <section className="mt-8">
        {isCalculator ? (
          <CalculatorShell calculator={calculator!} />
        ) : text ? (
          <TextToolShell tool={text} />
        ) : (
          <MediaToolShell slug={slug} />
        )}
      </section>

      <AdInArticle />

      <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-xl font-bold">How to use</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-[var(--muted)]">
          <li>Select the required file or enter the requested values.</li>
          <li>Run the tool and review the result.</li>
          <li>Download the output when ready.</li>
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-xl font-bold">Privacy</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          Image and PDF processing in this phase is performed in your browser.
          ToolNest does not need to upload these files to its server.
        </p>
      </section>
    </main>
  );
}
