import mongoose, { Schema, type InferSchemaType } from "mongoose";

const siteSettingsSchema = new Schema(
  {
    key: { type: String, unique: true, default: "global", index: true },
    siteName: { type: String, default: "ToolNest", trim: true, maxlength: 100 },
    tagline: { type: String, default: "All Your Essential Tools. In One Place.", trim: true, maxlength: 180 },
    supportEmail: { type: String, default: "", trim: true, maxlength: 160 },
    maintenanceMode: { type: Boolean, default: false },
    adsEnabled: { type: Boolean, default: false },
    adsensePublisherId: { type: String, default: "", trim: true, maxlength: 120 },
    footerText: { type: String, default: "Free online tools for everyday tasks.", trim: true, maxlength: 240 },
  },
  { timestamps: true },
);

export type SiteSettingsDocument = InferSchemaType<typeof siteSettingsSchema> & { _id: mongoose.Types.ObjectId };
const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);
export default SiteSettings;
