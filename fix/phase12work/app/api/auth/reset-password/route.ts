import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { hashPassword } from "@/lib/auth/password";
import { hashResetToken } from "@/lib/auth/tokens";
import { rateLimit } from "@/lib/security/rate-limit";

const schema = z.object({
  token: z.string().min(32),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`reset:${ip}`, 10, 15 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ message: "Too many reset attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ message: "Invalid reset request." }, { status: 400 });

    await connectToDatabase();
    const tokenHash = hashResetToken(parsed.data.token);
    const user = await User.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpiresAt: { $gt: new Date() },
    }).select("+passwordHash +resetPasswordTokenHash +resetPasswordExpiresAt");

    if (!user) return NextResponse.json({ message: "This reset link is invalid or has expired." }, { status: 400 });

    user.passwordHash = await hashPassword(parsed.data.password);
    user.resetPasswordTokenHash = null;
    user.resetPasswordExpiresAt = null;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "Unable to reset your password right now." }, { status: 500 });
  }
}
