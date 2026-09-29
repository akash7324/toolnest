import { redirect } from "next/navigation"; import { auth } from "@/auth"; import { AdminShell } from "@/components/admin/admin-shell"; import { BlogManager } from "@/components/blog/blog-manager";
export const dynamic = "force-dynamic"; export const metadata = { title: "Blog Manager" };
export default async function BlogManagerPage(){const s=await auth();if(!s?.user?.id)redirect("/login");if(s.user.role!=="admin")redirect("/dashboard");return <AdminShell title="Blog Manager" description="Create, edit, publish and remove ToolNest articles." current="/admin/blog"><BlogManager/></AdminShell>}
