import mongoose, { Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true },
    isActive: { type: Boolean, default: true, index: true },
    resetPasswordTokenHash: { type: String, select: false, default: null },
    resetPasswordExpiresAt: { type: Date, select: false, default: null },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
