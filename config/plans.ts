export type PlanId = "free" | "pro";

export type PlanDefinition = {
  id: PlanId;
  name: string;
  monthlyPriceInr: number;
  yearlyPriceInr: number;
  features: string[];
  limits: {
    historyItems: number | null;
    advancedOperationsPerDay: number | null;
    bulkProcessing: boolean;
    ads: boolean;
    savedResults: boolean;
  };
};

export const PLANS: Record<PlanId, PlanDefinition> = {
  free: {
    id: "free",
    name: "Free",
    monthlyPriceInr: 0,
    yearlyPriceInr: 0,
    features: ["Basic tools", "Basic history", "Standard processing", "Advertisement-supported"],
    limits: {
      historyItems: 50,
      advancedOperationsPerDay: 20,
      bulkProcessing: false,
      ads: true,
      savedResults: false,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    monthlyPriceInr: 99,
    yearlyPriceInr: 799,
    features: ["No advertisements", "Higher usage limits", "Unlimited history", "Bulk processing", "Saved results"],
    limits: {
      historyItems: null,
      advancedOperationsPerDay: 500,
      bulkProcessing: true,
      ads: false,
      savedResults: true,
    },
  },
};

export const PLAN_ORDER: PlanId[] = ["free", "pro"];
