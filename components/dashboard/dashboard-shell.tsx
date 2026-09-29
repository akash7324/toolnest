import type { ReactNode } from "react";
import { DashboardNav } from "./dashboard-nav";

export function DashboardShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside><DashboardNav /></aside>
        <section>
          <div className="mb-7"><p className="text-sm font-semibold text-indigo-600">My ToolNest</p><h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-[var(--muted)]">{description}</p></div>
          {children}
        </section>
      </div>
    </main>
  );
}
