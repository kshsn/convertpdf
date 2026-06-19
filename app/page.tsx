import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/config";
import { localeAlternates } from "@/lib/seo";

// Cross-reference all localized homes (canonical stays the root URL).
export const metadata: Metadata = {
  alternates: localeAlternates(defaultLocale, ""),
};

export default async function Home() {
  const dict = await getDictionary(defaultLocale);
  return <HomeContent locale={defaultLocale} dict={dict} />;
}
