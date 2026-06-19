import type { Metadata } from "next";
import {
  type Locale,
  defaultLocale,
  locales,
  localizedPath,
} from "@/lib/i18n/config";

export const SITE_URL = "https://proailabs.net";
export const SITE_NAME = "ConvertPDF";

/** Absolute URL for a locale-independent path, e.g. absolute("merge-pdf"). */
export function absoluteUrl(path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `${SITE_URL}/${clean}` : SITE_URL;
}

/**
 * Canonical + hreflang alternates for a page. Every page (English root and
 * localized) cross-references all 8 locales plus x-default, so crawlers can
 * discover the localized variants. `path` is locale-independent ("" = home).
 */
export function localeAlternates(
  locale: Locale,
  path = "",
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}${localizedPath(l, path)}`;
  }
  languages["x-default"] = `${SITE_URL}${localizedPath(defaultLocale, path)}`;
  return {
    canonical: `${SITE_URL}${localizedPath(locale, path)}`,
    languages,
  };
}

interface PageSeo {
  title: string;
  description: string;
  /** Path without leading slash, e.g. "merge-pdf" */
  path: string;
}

// Build a consistent Metadata object (canonical + hreflang + Open Graph +
// Twitter) for an English-at-root page.
export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} — Free Online | ${SITE_NAME}`;
  return {
    // `absolute` bypasses the root layout's `%s | ConvertPDF` title template,
    // which would otherwise append the brand name a second time since
    // `fullTitle` already ends in "| ConvertPDF".
    title: { absolute: fullTitle },
    description,
    alternates: localeAlternates(defaultLocale, path),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
