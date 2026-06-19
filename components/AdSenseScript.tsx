import Script from "next/script";

// Loads the Google AdSense library once, site-wide. Renders nothing unless
// NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is set (e.g. "ca-pub-1234567890123456").
export default function AdSenseScript() {
  const pub = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!pub || pub.includes("XXXX")) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pub}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
