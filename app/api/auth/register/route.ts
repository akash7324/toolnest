import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { hashPassword } from "@/lib/auth/password";
import { rateLimit } from "@/lib/security/rate-limit";

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`register:${ip}`, 10, 60 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ message: "Too many registration attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Please enter valid registration details." }, { status: 400 });
    }

    await connectToDatabase();
    const email = parsed.data.email.toLowerCase();
    const existing = await User.findOne({ email }).lean();

    if (existing) {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(parsed.data.password);
    await User.create({ name: parsed.data.name, email, passwordHash });

    return NextResponse.json({ message: "Account created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Unable to create your account right now." }, { status: 500 });
  }
}
