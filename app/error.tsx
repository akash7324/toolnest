"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("ToolNest route error", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold text-slate-500">Something went wrong</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">We could not load this page.</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Please try again. If the problem continues, come back later.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={() => reset()} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">Try again</button>
        <Link href="/" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold dark:border-slate-700">Go home</Link>
      </div>
    </main>
  );
}
