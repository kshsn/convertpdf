import type { Metadata } from "next";

export const SITE_URL = "https://convertpdf.proailabs.net";
export const SITE_NAME = "ConvertPDF";

interface PageSeo {
  title: string;
  description: string;
  /** Path without leading slash, e.g. "merge-pdf" */
  path: string;
}

// Build a consistent Metadata object (canonical + Open Graph + Twitter) for a page.
export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  const url = `${SITE_URL}/${path}`;
  const fullTitle = `${title} — Free Online | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
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
