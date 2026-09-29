"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { FormField } from "./form-field";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField name="email" type="email" label="Email" placeholder="you@example.com" autoComplete="email" required />
      <div className="space-y-2">
        <FormField name="password" type="password" label="Password" placeholder="Your password" autoComplete="current-password" required />
        <div className="text-right"><Link href="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:underline">Forgot password?</Link></div>
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">{error}</p>}
      <button disabled={loading} className="h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button>
      <p className="text-center text-sm text-[var(--muted)]">New to ToolNest? <Link href="/register" className="font-semibold text-indigo-600 hover:underline">Create an account</Link></p>
    </form>
  );
}
