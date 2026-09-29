import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/blog-post";
import { requireAdmin } from "@/lib/blog/auth";
import { blogPostSchema } from "@/lib/blog/validation";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const posts = await BlogPost.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = blogPostSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid post data", details: parsed.error.flatten() }, { status: 400 });

  try {
    await connectToDatabase();
    const existing = await BlogPost.findOne({ slug: parsed.data.slug }).select("_id").lean();
    if (existing) return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });

    const post = await BlogPost.create({
      ...parsed.data,
      authorId: session.user.id,
      publishedAt: parsed.data.published ? new Date() : null,
    });
    return NextResponse.json({ id: post._id.toString() }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create the post." }, { status: 500 });
  }
}
