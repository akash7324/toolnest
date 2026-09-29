import mongoose, { Schema, type InferSchemaType } from "mongoose";

const toolSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    category: { type: String, required: true, trim: true, maxlength: 60, index: true },
    description: { type: String, required: true, trim: true, maxlength: 240 },
    icon: { type: String, default: "Wrench", trim: true, maxlength: 60 },
    popular: { type: Boolean, default: false, index: true },
    enabled: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

toolSchema.index({ category: 1, enabled: 1, sortOrder: 1 });
export type ToolDocument = InferSchemaType<typeof toolSchema> & { _id: mongoose.Types.ObjectId };
const Tool = mongoose.models.Tool || mongoose.model("Tool", toolSchema);
export default Tool;
