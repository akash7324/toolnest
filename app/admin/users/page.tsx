import { redirect } from "next/navigation"; import { auth } from "@/auth"; import { AdminShell } from "@/components/admin/admin-shell"; import { UsersManager } from "@/components/admin/users-manager";
export const dynamic="force-dynamic"; export const metadata={title:"Users"};
export default async function UsersPage(){const s=await auth();if(!s?.user?.id)redirect("/login");if(s.user.role!=="admin")redirect("/dashboard");return <AdminShell title="Users" description="Review accounts and manage role and active status." current="/admin/users"><UsersManager/></AdminShell>}
