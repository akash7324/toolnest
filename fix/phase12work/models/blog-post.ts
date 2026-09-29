import mongoose, { Schema, type InferSchemaType } from "mongoose";

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 5, maxlength: 160 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    excerpt: { type: String, required: true, trim: true, minlength: 20, maxlength: 320 },
    content: { type: String, required: true, minlength: 20 },
    category: { type: String, required: true, trim: true, maxlength: 60, index: true },
    tags: { type: [String], default: [] },
    featuredImage: { type: String, default: "", trim: true },
    seoTitle: { type: String, default: "", trim: true, maxlength: 70 },
    seoDescription: { type: String, default: "", trim: true, maxlength: 170 },
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null, index: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true },
);

blogPostSchema.index({ published: 1, publishedAt: -1 });
blogPostSchema.index({ tags: 1, published: 1 });

export type BlogPostDocument = InferSchemaType<typeof blogPostSchema> & { _id: mongoose.Types.ObjectId };

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);
export default BlogPost;
