import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return <AuthShell title="Welcome back" description="Sign in to save tools, view your history and manage your ToolNest account."><LoginForm /></AuthShell>;
}
