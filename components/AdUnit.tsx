"use client";

import { useEffect } from "react";

interface AdUnitProps {
  /** The ad slot ID from your AdSense dashboard. */
  slot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// A responsive AdSense display unit. Falls back to a labelled placeholder when
// no publisher ID is configured (e.g. before AdSense approval), so the layout
// never shows a broken/empty box.
export default function AdUnit({ slot, className }: AdUnitProps) {
  const pub = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const enabled = pub && !pub.includes("XXXX");

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not ready yet — ignore.
    }
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        className={`bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm ${className ?? ""}`}
      >
        Advertisement
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={pub}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
