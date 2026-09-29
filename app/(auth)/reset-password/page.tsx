import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return <AuthShell title="Choose a new password" description="Use your secure reset link to update your ToolNest password."><Suspense fallback={<div className="text-center text-sm text-[var(--muted)]">Loading…</div>}><ResetPasswordForm /></Suspense></AuthShell>;
}
