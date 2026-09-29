import { PLANS, type PlanId } from "@/config/plans";

export function getPlanLimits(planId: PlanId) {
  return PLANS[planId].limits;
}

export function canUseBulkProcessing(planId: PlanId) {
  return PLANS[planId].limits.bulkProcessing;
}

export function canSaveResults(planId: PlanId) {
  return PLANS[planId].limits.savedResults;
}

export function getHistoryLimit(planId: PlanId) {
  return PLANS[planId].limits.historyItems;
}
