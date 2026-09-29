"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { FormField } from "./form-field";

export function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirmPassword") ?? "");
    if (password !== confirm) { setError("Passwords do not match."); setLoading(false); return; }

    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), email: form.get("email"), password }) });
    const data = await response.json();
    if (!response.ok) { setError(data.message ?? "Unable to create your account."); setLoading(false); return; }

    const result = await signIn("credentials", { email: form.get("email"), password, redirect: false });
    if (result?.error) { window.location.href = "/login"; return; }
    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField name="name" label="Full name" placeholder="Your name" autoComplete="name" required />
      <FormField name="email" type="email" label="Email" placeholder="you@example.com" autoComplete="email" required />
      <FormField name="password" type="password" label="Password" placeholder="At least 8 characters" autoComplete="new-password" minLength={8} required />
      <FormField name="confirmPassword" type="password" label="Confirm password" placeholder="Repeat your password" autoComplete="new-password" minLength={8} required />
      {error && <p role="alert" className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">{error}</p>}
      <button disabled={loading} className="h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating account…" : "Create account"}</button>
      <p className="text-center text-sm text-[var(--muted)]">Already have an account? <Link href="/login" className="font-semibold text-indigo-600 hover:underline">Sign in</Link></p>
    </form>
  );
}
