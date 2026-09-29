"use client";

import Script from "next/script";
import { adsenseClient, adsenseEnabled } from "@/config/ads";

export function AdSenseScript() {
  if (!adsenseEnabled || !adsenseClient) return null;
  return (
    <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClient)}`}
    />
  );
}
