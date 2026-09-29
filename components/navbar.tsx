"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "All Tools", href: "/tools" },
  { label: "Categories", href: "/categories" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ToolNest home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-xs font-black tracking-tight text-white shadow-sm shadow-indigo-600/20">
            TN
          </span>
          <span className="text-lg font-extrabold tracking-tight">ToolNest</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/tools"
            aria-label="Search and browse tools"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] transition hover:border-indigo-300 hover:text-indigo-600 sm:inline-flex"
          >
            <Search size={18} />
          </Link>
          <Link href="/login" className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)] sm:inline-flex">Log in</Link>
          <Link href="/register" className="hidden rounded-xl bg-indigo-600 px-3 py-2 text-sm font-bold text-white hover:bg-indigo-700 sm:inline-flex">Sign up</Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-indigo-600">Log in</Link>
            <Link href="/register" onClick={() => setOpen(false)} className="rounded-xl bg-indigo-600 px-3 py-3 text-sm font-bold text-white">Create account</Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
