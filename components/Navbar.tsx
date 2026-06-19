"use client";

import Link from "next/link";
import { localizedPath, isRtl } from "@/lib/i18n/config";
import { chrome } from "@/lib/i18n/chrome";
import { useCurrentLocale } from "@/lib/i18n/useCurrentLocale";
import LanguageSwitcher from "./LanguageSwitcher";

// Pricing/Go Pro point at the English root pages — those pages are not
// translated, so we keep a single canonical version rather than 404 under a
// locale prefix.
export default function Navbar() {
  const locale = useCurrentLocale();
  const t = chrome[locale].nav;

  return (
    <nav
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href={localizedPath(locale)}
          className="text-xl font-bold text-red-600"
        >
          ConvertPDF
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link
            href={localizedPath(locale)}
            className="hover:text-red-600 transition-colors"
          >
            {t.tools}
          </Link>
          <Link
            href="/pricing"
            className="hover:text-red-600 transition-colors"
          >
            {t.pricing}
          </Link>
          <LanguageSwitcher />
          <Link
            href="/pricing"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors"
          >
            {t.goPro}
          </Link>
        </div>
      </div>
    </nav>
  );
}
