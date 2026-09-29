import mongoose, { Schema, type InferSchemaType } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    description: { type: String, required: true, trim: true, maxlength: 240 },
    icon: { type: String, default: "Folder", trim: true, maxlength: 60 },
    enabled: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type CategoryDocument = InferSchemaType<typeof categorySchema> & { _id: mongoose.Types.ObjectId };
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
