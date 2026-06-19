import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import AdSenseScript from "@/components/AdSenseScript";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ConvertPDF — Free Online PDF Tools",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Merge, split, compress, convert PDF files online for free. No signup required. Fast, secure, and private.",
  applicationName: SITE_NAME,
  keywords: [
    "pdf tools",
    "merge pdf",
    "split pdf",
    "compress pdf",
    "pdf to word",
    "word to pdf",
    "pdf to jpg",
    "free pdf converter",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "ConvertPDF — Free Online PDF Tools",
    description:
      "Merge, split, compress, convert PDF files online for free. No signup required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConvertPDF — Free Online PDF Tools",
    description: "Free online PDF tools. Merge, split, compress, and convert.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: "Free online PDF tools.",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
        <AdSenseScript />
      </body>
    </html>
  );
}
