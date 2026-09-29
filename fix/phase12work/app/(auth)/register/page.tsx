import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create an account" };

export default function RegisterPage() {
  return <AuthShell title="Create your account" description="Join ToolNest to save your favorite tools and keep your work organized."><RegisterForm /></AuthShell>;
}
