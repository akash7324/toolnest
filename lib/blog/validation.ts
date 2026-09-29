import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().trim().min(5).max(160),
  slug: z.string().trim().min(3).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  excerpt: z.string().trim().min(20).max(320),
  content: z.string().trim().min(20),
  category: z.string().trim().min(2).max(60),
  tags: z.array(z.string().trim().min(1).max(40)).max(15).default([]),
  featuredImage: z.union([z.literal(""), z.string().url().max(1000)]).default(""),
  seoTitle: z.string().trim().max(70).default(""),
  seoDescription: z.string().trim().max(170).default(""),
  published: z.boolean().default(false),
});

export const blogUpdateSchema = blogPostSchema.partial();
