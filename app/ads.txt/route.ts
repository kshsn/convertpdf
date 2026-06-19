// Serves /ads.txt for AdSense. Generated from the publisher ID so it stays in
// sync. AdSense requires the publisher number (the part after "pub-").
export function GET() {
  const pub = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "";
  const number = pub.replace(/^ca-pub-/, "");

  const body = number
    ? `google.com, pub-${number}, DIRECT, f08c47fec0942fa0\n`
    : "# AdSense publisher ID not configured yet.\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
