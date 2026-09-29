import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/blog-post";
import { requireAdmin } from "@/lib/blog/auth";
import { blogUpdateSchema } from "@/lib/blog/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const parsed = blogUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid post data", details: parsed.error.flatten() }, { status: 400 });

  try {
    await connectToDatabase();
    if (parsed.data.slug) {
      const conflict = await BlogPost.findOne({ slug: parsed.data.slug, _id: { $ne: id } }).select("_id").lean();
      if (conflict) return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }
    const current = await BlogPost.findById(id).select("published publishedAt");
    if (!current) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const nextPublished = parsed.data.published ?? current.published;
    const update = {
      ...parsed.data,
      publishedAt: nextPublished ? current.publishedAt ?? new Date() : null,
    };
    await BlogPost.findByIdAndUpdate(id, update, { runValidators: true });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to update the post." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await connectToDatabase();
    const deleted = await BlogPost.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete the post." }, { status: 500 });
  }
}
