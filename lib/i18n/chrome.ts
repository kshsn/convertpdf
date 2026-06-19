import type { Locale } from "./config";

// Client-safe nav/footer labels. Kept as a small standalone map (rather than
// importing the full server-only dictionaries) so the shared Navbar/Footer
// client components don't pull every locale's tool content into the bundle.
export interface ChromeStrings {
  nav: { tools: string; pricing: string; goPro: string };
  footer: {
    tagline: string;
    tools: string;
    more: string;
    company: string;
    about: string;
    pricing: string;
    privacy: string;
    terms: string;
  };
}

export const chrome: Record<Locale, ChromeStrings> = {
  en: {
    nav: { tools: "Tools", pricing: "Pricing", goPro: "Go Pro" },
    footer: {
      tagline: "Free online PDF tools. No signup required.",
      tools: "Tools",
      more: "More Tools",
      company: "Company",
      about: "About",
      pricing: "Pricing",
      privacy: "Privacy",
      terms: "Terms",
    },
  },
  ar: {
    nav: { tools: "الأدوات", pricing: "الأسعار", goPro: "الترقية للاحتراف" },
    footer: {
      tagline: "أدوات PDF مجانية عبر الإنترنت. لا حاجة للتسجيل.",
      tools: "الأدوات",
      more: "أدوات أخرى",
      company: "الشركة",
      about: "من نحن",
      pricing: "الأسعار",
      privacy: "الخصوصية",
      terms: "الشروط",
    },
  },
  es: {
    nav: { tools: "Herramientas", pricing: "Precios", goPro: "Hazte Pro" },
    footer: {
      tagline: "Herramientas PDF online gratuitas. Sin registro.",
      tools: "Herramientas",
      more: "Más herramientas",
      company: "Empresa",
      about: "Acerca de",
      pricing: "Precios",
      privacy: "Privacidad",
      terms: "Términos",
    },
  },
  fr: {
    nav: { tools: "Outils", pricing: "Tarifs", goPro: "Passer Pro" },
    footer: {
      tagline: "Outils PDF en ligne gratuits. Sans inscription.",
      tools: "Outils",
      more: "Plus d'outils",
      company: "Entreprise",
      about: "À propos",
      pricing: "Tarifs",
      privacy: "Confidentialité",
      terms: "Conditions",
    },
  },
  pt: {
    nav: { tools: "Ferramentas", pricing: "Preços", goPro: "Seja Pro" },
    footer: {
      tagline: "Ferramentas PDF online gratuitas. Sem cadastro.",
      tools: "Ferramentas",
      more: "Mais ferramentas",
      company: "Empresa",
      about: "Sobre",
      pricing: "Preços",
      privacy: "Privacidade",
      terms: "Termos",
    },
  },
  de: {
    nav: { tools: "Werkzeuge", pricing: "Preise", goPro: "Pro werden" },
    footer: {
      tagline: "Kostenlose Online-PDF-Tools. Ohne Anmeldung.",
      tools: "Werkzeuge",
      more: "Weitere Tools",
      company: "Unternehmen",
      about: "Über uns",
      pricing: "Preise",
      privacy: "Datenschutz",
      terms: "AGB",
    },
  },
  hi: {
    nav: { tools: "टूल", pricing: "मूल्य", goPro: "प्रो बनें" },
    footer: {
      tagline: "मुफ़्त ऑनलाइन PDF टूल। साइनअप की ज़रूरत नहीं।",
      tools: "टूल",
      more: "और टूल",
      company: "कंपनी",
      about: "हमारे बारे में",
      pricing: "मूल्य",
      privacy: "गोपनीयता",
      terms: "शर्तें",
    },
  },
  id: {
    nav: { tools: "Alat", pricing: "Harga", goPro: "Jadi Pro" },
    footer: {
      tagline: "Alat PDF online gratis. Tanpa pendaftaran.",
      tools: "Alat",
      more: "Alat Lainnya",
      company: "Perusahaan",
      about: "Tentang",
      pricing: "Harga",
      privacy: "Privasi",
      terms: "Ketentuan",
    },
  },
};
