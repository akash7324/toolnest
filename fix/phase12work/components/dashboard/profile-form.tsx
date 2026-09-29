"use client";

import { useState } from "react";

export function ProfileForm({ initialName, email }: { initialName: string; email: string }) {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true); setStatus("");
    const response = await fetch("/api/user/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
    const data = await response.json();
    setStatus(response.ok ? "Profile updated successfully." : data.error ?? "Could not update profile.");
    setSaving(false);
  }

  return <form onSubmit={submit} className="max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8">
    <label className="block"><span className="mb-2 block text-sm font-semibold">Name</span><input value={name} onChange={(event) => setName(event.target.value)} minLength={2} maxLength={80} required className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-indigo-500" /></label>
    <label className="mt-5 block"><span className="mb-2 block text-sm font-semibold">Email</span><input value={email} readOnly className="w-full rounded-xl border border-[var(--border)] bg-black/5 px-4 py-3 text-[var(--muted)] dark:bg-white/5" /></label>
    <div className="mt-6 flex items-center gap-4"><button disabled={saving} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save changes"}</button>{status && <p className="text-sm text-[var(--muted)]" role="status">{status}</p>}</div>
  </form>;
}
