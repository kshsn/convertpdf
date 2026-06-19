"use client";

import Link from "next/link";
import { localizedPath } from "@/lib/i18n/config";
import { chrome } from "@/lib/i18n/chrome";
import { useCurrentLocale } from "@/lib/i18n/useCurrentLocale";

const PRIMARY_TOOLS = ["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-word"];
const MORE_TOOLS = ["word-to-pdf", "rotate-pdf", "pdf-to-jpg", "protect-pdf"];

export default function Footer() {
  const locale = useCurrentLocale();
  const t = chrome[locale].footer;

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="text-white font-bold text-base mb-3">ConvertPDF</p>
          <p className="text-gray-500 text-xs">{t.tagline}</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">{t.tools}</p>
          <ul className="space-y-2">
            {PRIMARY_TOOLS.map((slug) => (
              <li key={slug}>
                <Link
                  href={localizedPath(locale, slug)}
                  className="hover:text-white transition-colors capitalize"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">{t.more}</p>
          <ul className="space-y-2">
            {MORE_TOOLS.map((slug) => (
              <li key={slug}>
                <Link
                  href={localizedPath(locale, slug)}
                  className="hover:text-white transition-colors capitalize"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">{t.company}</p>
          <ul className="space-y-2">
            {[
              { label: t.about, path: "about" },
              { label: t.pricing, path: "pricing" },
              { label: t.privacy, path: "privacy" },
              { label: t.terms, path: "terms" },
            ].map((l) => (
              <li key={l.path}>
                <Link
                  href={localizedPath(locale, l.path)}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} ConvertPDF. All rights reserved.
      </div>
    </footer>
  );
}
