import "server-only";
import type { Locale } from "./config";

export interface ToolContent {
  title: string;
  tagline: string;
  intro: string;
  faq: { q: string; a: string }[];
}

export interface Dictionary {
  nav: { tools: string; pricing: string; goPro: string };
  footer: {
    tagline: string;
    tools: string;
    company: string;
    about: string;
    privacy: string;
    terms: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    allTools: string;
    whyTitle: string;
  };
  common: {
    drop: string;
    dragHere: string;
    browse: string;
    processing: string;
    done: string;
    download: string;
    another: string;
    errorGeneric: string;
    advertisement: string;
    selected: string;
  };
  tools: Record<string, ToolContent>;
}

// Each locale's JSON is loaded on demand (server-side).
const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./locales/en.json"),
  ar: () => import("./locales/ar.json"),
  es: () => import("./locales/es.json"),
  fr: () => import("./locales/fr.json"),
  pt: () => import("./locales/pt.json"),
  de: () => import("./locales/de.json"),
  hi: () => import("./locales/hi.json"),
  id: () => import("./locales/id.json"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = loaders[locale] ?? loaders.en;
  return (await load()).default;
}
