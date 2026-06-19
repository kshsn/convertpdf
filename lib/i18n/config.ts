// Internationalization config. 8 locales, English default.
export const locales = [
  "en",
  "ar",
  "es",
  "fr",
  "pt",
  "de",
  "hi",
  "id",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Right-to-left languages.
export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Human-readable names (shown in the language switcher, in each language).
export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  pt: "Português",
  de: "Deutsch",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
};
