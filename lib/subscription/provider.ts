/**
 * Payment-provider boundary.
 *
 * Razorpay is intentionally not called from this module yet. When billing is
 * enabled, implement these methods in a provider adapter and keep secrets on
 * the server only.
 */
export type BillingInterval = "monthly" | "yearly";

export type CheckoutRequest = {
  userId: string;
  planId: "pro";
  interval: BillingInterval;
};

export type CheckoutResult = {
  provider: "razorpay";
  providerSubscriptionId: string;
  checkoutUrl?: string;
};

export interface SubscriptionProvider {
  createSubscription(request: CheckoutRequest): Promise<CheckoutResult>;
  cancelSubscription(providerSubscriptionId: string): Promise<void>;
}

export function getSubscriptionProvider(): SubscriptionProvider | null {
  // Future Razorpay adapter will be returned here after credentials and
  // webhook verification are configured. Returning null prevents accidental
  // live billing in the ₹0 development phase.
  return null;
}
