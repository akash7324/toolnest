import { NextResponse } from "next/server";
import { requireAdminResponse } from "@/lib/admin/route";
import { connectToDatabase } from "@/lib/mongodb";
import SiteSettings from "@/models/site-settings";
import { settingsSchema } from "@/lib/admin/validation";
const defaults = { key: "global", siteName: "ToolNest", tagline: "All Your Essential Tools. In One Place.", supportEmail: "", maintenanceMode: false, adsEnabled: false, adsensePublisherId: "", footerText: "Free online tools for everyday tasks." };
export async function GET() { const { response } = await requireAdminResponse(); if (response) return response; await connectToDatabase(); const settings = await SiteSettings.findOneAndUpdate({ key: "global" }, { $setOnInsert: defaults }, { new: true, upsert: true }).lean(); return NextResponse.json(settings); }
export async function PATCH(request: Request) { const { response } = await requireAdminResponse(); if (response) return response; const parsed = settingsSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Invalid settings." }, { status: 400 }); await connectToDatabase(); const settings = await SiteSettings.findOneAndUpdate({ key: "global" }, { $set: parsed.data, $setOnInsert: defaults }, { new: true, upsert: true, runValidators: true }).lean(); return NextResponse.json(settings); }
