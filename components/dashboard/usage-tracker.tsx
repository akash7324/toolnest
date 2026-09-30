"use client";

import { useEffect, useRef } from "react";

export function UsageTracker({ toolSlug }: { toolSlug: string }) {
  useEffect(() => {
    void fetch("/api/user/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolSlug, event: "opened" }),
    });
  }, [toolSlug]);

  return null;
}

export function CompletedTracker({
  toolSlug,
  enabled,
}: {
  toolSlug: string;
  enabled: boolean;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!enabled || tracked.current) return;

    tracked.current = true;

    void fetch("/api/user/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolSlug, event: "completed" }),
    }).catch(() => {
      tracked.current = false;
    });
  }, [toolSlug, enabled]);

  return null;
}
