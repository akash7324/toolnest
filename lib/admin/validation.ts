import { z } from "zod";

const slug = z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug.");

export const toolSchema = z.object({
  name: z.string().trim().min(2).max(100), slug, category: z.string().trim().min(2).max(60),
  description: z.string().trim().min(10).max(240), icon: z.string().trim().min(1).max(60),
  popular: z.boolean().default(false), enabled: z.boolean().default(true), sortOrder: z.number().int().min(0).max(100000).default(0),
});
export const categorySchema = z.object({
  name: z.string().trim().min(2).max(80), slug, description: z.string().trim().min(10).max(240),
  icon: z.string().trim().min(1).max(60), enabled: z.boolean().default(true), sortOrder: z.number().int().min(0).max(100000).default(0),
});
export const settingsSchema = z.object({
  siteName: z.string().trim().min(2).max(100), tagline: z.string().trim().min(2).max(180), supportEmail: z.string().trim().max(160),
  maintenanceMode: z.boolean(), adsEnabled: z.boolean(), adsensePublisherId: z.string().trim().max(120), footerText: z.string().trim().max(240),
});
