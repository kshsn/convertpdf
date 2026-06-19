import type { MetadataRoute } from "next";
import { ALL_TOOL_SLUGS } from "@/lib/tools";
import { SITE_URL } from "@/lib/seo";
import { locales, defaultLocale, localizedPath } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Home + every tool exist in all 8 locales. Emit one entry per localized URL,
  // each carrying the full hreflang alternates map so crawlers see every
  // language version (plus x-default → English).
  const localizablePaths = ["", ...ALL_TOOL_SLUGS];

  for (const path of localizablePaths) {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[l] = `${SITE_URL}${localizedPath(l, path)}`;
    }
    languages["x-default"] = `${SITE_URL}${localizedPath(defaultLocale, path)}`;

    for (const l of locales) {
      entries.push({
        url: `${SITE_URL}${localizedPath(l, path)}`,
        lastModified: now,
        changeFrequency: path === "" ? "monthly" : "weekly",
        priority: path === "" ? 1 : 0.9,
        alternates: { languages },
      });
    }
  }

  // English-only pages (not translated).
  for (const p of ["pricing", "about", "privacy", "terms"]) {
    entries.push({
      url: `${SITE_URL}/${p}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
