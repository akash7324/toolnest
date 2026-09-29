import type { MetadataRoute } from "next";
import { siteConfig, categories } from "@/config/site";
import { calculators } from "@/lib/calculators/data";
import { mediaTools } from "@/lib/media/data";
import { textTools } from "@/lib/text-tools/data";
import { getPublishedPosts } from "@/lib/blog/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = [
    { url: siteConfig.url, priority: 1 },
    { url: `${siteConfig.url}/tools`, priority: 0.9 },
    { url: `${siteConfig.url}/categories`, priority: 0.8 },
    { url: `${siteConfig.url}/pricing`, priority: 0.7 },
    { url: `${siteConfig.url}/about`, priority: 0.6 },
    { url: `${siteConfig.url}/contact`, priority: 0.6 },
    { url: `${siteConfig.url}/faq`, priority: 0.6 },
    { url: `${siteConfig.url}/privacy`, priority: 0.5 },
    { url: `${siteConfig.url}/terms`, priority: 0.5 },
    { url: `${siteConfig.url}/disclaimer`, priority: 0.5 },
  ];
  const tools = [...calculators, ...textTools, ...mediaTools];
  const posts = process.env.MONGODB_URI ? await getPublishedPosts(500) : [];
  const blog = [{ url: `${siteConfig.url}/blog`, priority: 0.8 }, ...posts.map((post) => ({ url: `${siteConfig.url}/blog/${post.slug}`, priority: 0.65, lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined }))];
  return [...base, ...blog, ...tools.map(t => ({ url: `${siteConfig.url}/tools/${t.slug}`, priority: 0.7 })), ...categories.map(c => ({ url: `${siteConfig.url}/categories/${c.slug}`, priority: 0.6 }))];
}
