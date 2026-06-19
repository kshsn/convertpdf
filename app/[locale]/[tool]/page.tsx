import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPage from "@/components/tools/ToolPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { ALL_TOOL_SLUGS } from "@/lib/tools";
import { localeAlternates } from "@/lib/seo";

export const dynamicParams = false;

// Runs once per parent locale (from the [locale] layout) → all locale × tool
// combinations are statically generated.
export function generateStaticParams() {
  return ALL_TOOL_SLUGS.map((tool) => ({ tool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}): Promise<Metadata> {
  const { locale, tool } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const content = dict.tools[tool];
  if (!content) return {};
  return {
    title: content.title,
    description: content.tagline,
    alternates: localeAlternates(locale, tool),
  };
}

export default async function LocaleToolPage({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}) {
  const { locale, tool } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  const dict = await getDictionary(locale);
  const content = dict.tools[tool];
  if (!content) notFound();
  return <ToolPage slug={tool} content={content} common={dict.common} />;
}
