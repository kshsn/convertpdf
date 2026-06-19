"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  localeNames,
  localizedPath,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/lib/i18n/config";

/**
 * Language picker that links to the current page in every locale. It derives
 * the locale-independent path from the URL, so it works on both the English
 * root tree and the /[locale] tree without extra props.
 */
export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  let current: Locale = defaultLocale;
  let rest = segments;
  if (segments.length && isLocale(segments[0])) {
    current = segments[0];
    rest = segments.slice(1);
  }
  const basePath = rest.join("/");

  return (
    <details className="relative group">
      <summary className="flex items-center gap-1 cursor-pointer list-none hover:text-red-600 transition-colors">
        <span aria-hidden>🌐</span>
        <span>{localeNames[current]}</span>
      </summary>
      <ul className="absolute right-0 mt-2 w-44 max-h-72 overflow-auto bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={localizedPath(l, basePath)}
              hrefLang={l}
              className={`block px-4 py-2 text-sm hover:bg-gray-50 ${
                l === current ? "font-bold text-red-600" : "text-gray-700"
              }`}
            >
              {localeNames[l]}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
