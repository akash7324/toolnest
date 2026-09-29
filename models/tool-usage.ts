import mongoose, { Schema, type InferSchemaType } from "mongoose";

const toolUsageSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    toolSlug: { type: String, required: true, trim: true, maxlength: 120, index: true },
    event: { type: String, enum: ["opened", "completed"], required: true, index: true },
  },
  { timestamps: true },
);

toolUsageSchema.index({ userId: 1, createdAt: -1 });
toolUsageSchema.index({ userId: 1, toolSlug: 1, createdAt: -1 });

export type ToolUsageDocument = InferSchemaType<typeof toolUsageSchema> & { _id: mongoose.Types.ObjectId };

const ToolUsage = mongoose.models.ToolUsage || mongoose.model("ToolUsage", toolUsageSchema);
export default ToolUsage;
