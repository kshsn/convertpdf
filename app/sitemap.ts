import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const toolPaths = TOOLS.map((t) => t.slug);
  // protect-pdf has a page but isn't in the TOOLS grid; include it explicitly.
  const allToolPaths = [...toolPaths, "protect-pdf"];

  const staticPaths = ["", "pricing", "about", "privacy", "terms"];

  return [
    ...staticPaths.map((p) => ({
      url: p ? `${SITE_URL}/${p}` : SITE_URL,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.5,
    })),
    ...allToolPaths.map((p) => ({
      url: `${SITE_URL}/${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
