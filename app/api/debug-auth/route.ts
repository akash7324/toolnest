import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();

  return NextResponse.json({
    authenticated: !!session?.user?.id,
    user: session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          role: session.user.role,
        }
      : null,
  });
}
