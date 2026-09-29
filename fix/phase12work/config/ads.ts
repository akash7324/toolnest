export type AdPlacement = "top" | "tool" | "in-article" | "rectangle" | "footer";

export const adConfig: Record<AdPlacement, { label: string; slot: string }> = {
  top: { label: "Top banner", slot: "" },
  tool: { label: "Tool page ad", slot: "" },
  "in-article": { label: "In-article ad", slot: "" },
  rectangle: { label: "Rectangle ad", slot: "" },
  footer: { label: "Footer ad", slot: "" },
};

export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
export const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
