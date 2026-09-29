import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/blog-post";

export type BlogPostData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
};

function serialize(post: BlogPostData & Record<string, unknown>): BlogPostData {
  return {
    id: String(post.id ?? post._id),
    title: String(post.title),
    slug: String(post.slug),
    excerpt: String(post.excerpt),
    content: String(post.content),
    category: String(post.category),
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    featuredImage: String(post.featuredImage ?? ""),
    seoTitle: String(post.seoTitle ?? ""),
    seoDescription: String(post.seoDescription ?? ""),
    published: Boolean(post.published),
    publishedAt: post.publishedAt ? new Date(String(post.publishedAt)).toISOString() : null,
    createdAt: new Date(String(post.createdAt)).toISOString(),
  };
}

export async function getPublishedPosts(limit = 20): Promise<BlogPostData[]> {
  await connectToDatabase();
  const posts = await BlogPost.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).limit(limit).lean();
  return posts.map((post) => serialize(post as unknown as BlogPostData & Record<string, unknown>));
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostData | null> {
  await connectToDatabase();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  return post ? serialize(post as unknown as BlogPostData & Record<string, unknown>) : null;
}

export async function getAllPosts(): Promise<BlogPostData[]> {
  await connectToDatabase();
  const posts = await BlogPost.find({}).sort({ createdAt: -1 }).lean();
  return posts.map((post) => serialize(post as unknown as BlogPostData & Record<string, unknown>));
}
