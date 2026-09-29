"use client";

import { useEffect } from "react";

export function UsageTracker({ toolSlug }: { toolSlug: string }) {
  useEffect(() => {
    void fetch("/api/user/usage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ toolSlug, event: "opened" }) });
  }, [toolSlug]);
  return null;
}
