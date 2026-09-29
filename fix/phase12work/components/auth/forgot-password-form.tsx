"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { FormField } from "./form-field";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email") }) });
    const data = await response.json();
    setMessage(data.message ?? "If an account exists, reset instructions have been prepared.");
    setLoading(false);
  }

  return <form onSubmit={submit} className="space-y-5">
    <FormField name="email" type="email" label="Email" placeholder="you@example.com" autoComplete="email" required />
    {message && <p role="status" className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">{message}</p>}
    <button disabled={loading} className="h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white disabled:opacity-60">{loading ? "Preparing…" : "Send reset instructions"}</button>
    <p className="text-center text-sm text-[var(--muted)]"><Link href="/login" className="font-semibold text-indigo-600 hover:underline">Back to sign in</Link></p>
  </form>;
}
