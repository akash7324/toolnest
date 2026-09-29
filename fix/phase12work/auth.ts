import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { comparePassword } from "@/lib/auth/password";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        await connectToDatabase();
        const user = await User.findOne({ email: parsed.data.email.toLowerCase() }).select("+passwordHash");
        if (!user || !user.passwordHash || !user.isActive) return null;

        const valid = await comparePassword(parsed.data.password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as "user" | "admin") ?? "user";
      }
      return session;
    },
  },
});
