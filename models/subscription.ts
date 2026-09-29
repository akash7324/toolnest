import mongoose, { Schema, type InferSchemaType } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    plan: { type: String, enum: ["free", "pro"], default: "free", index: true },
    status: { type: String, enum: ["active", "inactive", "past_due", "cancelled"], default: "active", index: true },
    provider: { type: String, default: "none", maxlength: 40 },
    providerSubscriptionId: { type: String, default: "", maxlength: 160 },
    currentPeriodEnd: { type: Date, default: null },
  },
  { timestamps: true },
);

subscriptionSchema.index({ userId: 1, status: 1 });
export type SubscriptionDocument = InferSchemaType<typeof subscriptionSchema> & { _id: mongoose.Types.ObjectId };
const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
