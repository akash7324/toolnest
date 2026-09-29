import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return <DashboardShell title="Profile" description="Update the basic information connected to your ToolNest account."><ProfileForm initialName={session.user.name ?? ""} email={session.user.email ?? ""} /></DashboardShell>;
}
