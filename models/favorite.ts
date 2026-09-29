import mongoose, { Schema, type InferSchemaType } from "mongoose";

const favoriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    toolSlug: { type: String, required: true, trim: true, maxlength: 120 },
  },
  { timestamps: true },
);

favoriteSchema.index({ userId: 1, toolSlug: 1 }, { unique: true });

export type FavoriteDocument = InferSchemaType<typeof favoriteSchema> & { _id: mongoose.Types.ObjectId };

const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
export default Favorite;
