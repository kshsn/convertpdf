import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeContent from "@/components/HomeContent";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.home.heroTitle,
    description: dict.home.heroSubtitle,
    alternates: localeAlternates(locale, ""),
  };
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  const dict = await getDictionary(locale);
  return <HomeContent locale={locale} dict={dict} />;
}
