import mongoose, { Schema, type InferSchemaType } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    subject: { type: String, required: true, trim: true, maxlength: 180 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ["new", "read", "archived"], default: "new", index: true },
  },
  { timestamps: true },
);

contactMessageSchema.index({ status: 1, createdAt: -1 });
export type ContactMessageDocument = InferSchemaType<typeof contactMessageSchema> & { _id: mongoose.Types.ObjectId };
const ContactMessage = mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactMessageSchema);
export default ContactMessage;
