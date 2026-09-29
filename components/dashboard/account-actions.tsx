"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold hover:border-red-300 hover:text-red-600">Sign out</button>;
}
