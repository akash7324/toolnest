import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { createResetToken } from "@/lib/auth/tokens";
import { rateLimit } from "@/lib/security/rate-limit";
import { Resend } from "resend";

const schema = z.object({ email: z.string().trim().email() });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`forgot:${ip}`, 5, 15 * 60 * 1000);
  const generic = { message: "If an account exists for that email, password reset instructions have been prepared." };

  if (!limit.allowed) return NextResponse.json(generic, { status: 200, headers: { "Retry-After": String(limit.retryAfter) } });

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json(generic, { status: 200 });

    await connectToDatabase();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase() }).select("+resetPasswordTokenHash +resetPasswordExpiresAt");

    if (!user || !user.isActive) return NextResponse.json(generic, { status: 200 });

    const { rawToken, tokenHash } = createResetToken();
    user.resetPasswordTokenHash = tokenHash;
    user.resetPasswordExpiresAt = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error: emailError } = await resend.emails.send({
        from: "ToolNest <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset your ToolNest password",
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px"><h2>Reset your ToolNest password</h2><p>We received a request to reset your ToolNest password.</p><p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#4f46e5;color:white;text-decoration:none;border-radius:8px">Reset Password</a></p><p>This link expires in 30 minutes.</p><p>If you did not request this, you can safely ignore this email.</p></div>`
      });
      if (emailError) throw new Error(emailError.message);
    }

    if (process.env.NODE_ENV !== "production") {
      console.info(`[ToolNest development] Password reset URL: ${resetUrl}`);
    }

    // Future production email delivery belongs here. No paid email provider is required for this phase.
    return NextResponse.json(generic, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(generic, { status: 200 });
  }
}
