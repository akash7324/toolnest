import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const exploreLinks = [
  ["All Tools", "/tools"],
  ["Categories", "/categories"],
  ["Calculators", "/categories/calculators"],
  ["Text Tools", "/categories/text-tools"],
  ["Blog", "/blog"],
];

const companyLinks = [
  ["About", "/#about"],
  ["Contact", "/contact"],
  ["Privacy", "/#privacy"],
  ["Terms", "/#terms"],
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2 font-extrabold tracking-tight" aria-label="ToolNest home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-[10px] font-black text-white">TN</span>
            ToolNest
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
            Free online tools for calculations, text, images, PDFs, productivity and everyday tasks — designed to be simple, fast and useful.
          </p>
          <Link href="/tools" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Explore tools <ArrowUpRight size={15} />
          </Link>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold">Explore</h2>
          <div className="space-y-2.5 text-sm text-[var(--muted)]">
            {exploreLinks.map(([label, href]) => (
              <Link key={href} className="block transition hover:text-[var(--foreground)]" href={href}>{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold">Company</h2>
          <div className="space-y-2.5 text-sm text-[var(--muted)]">
            {companyLinks.map(([label, href]) => (
              <Link key={href} className="block transition hover:text-[var(--foreground)]" href={href}>{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} ToolNest. Built for useful, simple tools.</p>
          <p>Free tools. No unnecessary complexity.</p>
        </div>
      </div>
    </footer>
  );
}
