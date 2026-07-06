"use client";

import { useEffect } from "react";

// The root layout renders <html lang="en"> and can't be made per-locale without
// forcing the whole site to render dynamically. For localized routes we correct
// the document's lang/dir on the client (Googlebot renders JS, so it sees these).
export default function LocaleHtmlAttrs({
  locale,
  dir,
}: {
  locale: string;
  dir: "rtl" | "ltr";
}) {
  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.lang;
    const prevDir = html.dir;
    html.lang = locale;
    html.dir = dir;
    return () => {
      // Restore when navigating away (e.g. back to an English root page).
      html.lang = prevLang || "en";
      html.dir = prevDir || "ltr";
    };
  }, [locale, dir]);

  return null;
}
