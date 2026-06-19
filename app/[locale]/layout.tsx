import { notFound } from "next/navigation";
import { locales, defaultLocale, isLocale, isRtl } from "@/lib/i18n/config";

// Only the generated (non-default) locales are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  // English stays at the root, so it is never prefixed under /[locale].
  return locales
    .filter((l) => l !== defaultLocale)
    .map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  // The root layout owns <html lang="en">; we set the correct language and
  // direction on the localized content wrapper (RTL for Arabic).
  return (
    <div lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"}>
      {children}
    </div>
  );
}
