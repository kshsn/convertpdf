import Script from "next/script";

// Google Analytics 4. Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set,
// so it is safe to ship before an ID exists.
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id || id.startsWith("G-XXXX")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
