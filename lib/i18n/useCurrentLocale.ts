"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "./config";

/** Current locale derived from the URL (first path segment, else default). */
export function useCurrentLocale(): Locale {
  const pathname = usePathname() || "/";
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}
