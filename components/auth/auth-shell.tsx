import type { ReactNode } from "react";
import Link from "next/link";

export function AuthShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[var(--background)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600">ToolNest</Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8">{children}</div>
      </div>
    </main>
  );
}
