"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { FormField } from "./form-field";

export function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    if (form.get("password") !== form.get("confirmPassword")) { setError("Passwords do not match."); setLoading(false); return; }
    const response = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password: form.get("password") }) });
    const data = await response.json();
    if (!response.ok) setError(data.message ?? "Unable to reset password."); else setMessage(data.message);
    setLoading(false);
  }

  if (!token) return <div className="space-y-4 text-center"><p className="text-sm text-red-600">This reset link is missing its token.</p><Link href="/forgot-password" className="font-semibold text-indigo-600">Request a new link</Link></div>;

  return <form onSubmit={submit} className="space-y-5">
    <FormField name="password" type="password" label="New password" placeholder="At least 8 characters" minLength={8} required />
    <FormField name="confirmPassword" type="password" label="Confirm new password" placeholder="Repeat your password" minLength={8} required />
    {error && <p role="alert" className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">{error}</p>}
    {message && <p role="status" className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">{message} <Link href="/login" className="font-semibold underline">Sign in</Link></p>}
    <button disabled={loading} className="h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white disabled:opacity-60">{loading ? "Updating…" : "Update password"}</button>
  </form>;
}
