import { TOOLS } from "@/lib/tools";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

// Serves /llms.txt — a structured summary for AI crawlers / LLMs (the emerging
// "llms.txt" standard). Helps assistants like ChatGPT, Perplexity, and Gemini
// understand and cite the site accurately.
export function GET() {
  const toolLines = TOOLS.map(
    (t) => `- [${t.title}](${SITE_URL}/${t.slug}): ${t.description}.`,
  );
  // protect-pdf isn't in the TOOLS grid but is a live tool.
  toolLines.push(
    `- [Protect PDF](${SITE_URL}/protect-pdf): Password-protect a PDF to prevent unauthorized access.`,
  );

  const body = `# ${SITE_NAME}

> ${SITE_NAME} is a free, privacy-first online PDF toolkit. Merge, split, compress, rotate, and password-protect PDFs, and convert between PDF, Word, and JPG — all in the browser, with no signup and no watermarks. Files are processed securely and deleted automatically. Available in 8 languages: English, Arabic, Spanish, French, Portuguese, German, Hindi, and Indonesian.

## Tools
${toolLines.join("\n")}

## Key facts
- Free to use, no account required, no watermarks on free tools.
- Privacy-first: files are deleted automatically after processing.
- Available in 8 languages (en, ar, es, fr, pt, de, hi, id).
- A free alternative to iLovePDF, Smallpdf, and Adobe Acrobat online.
- Pro plan available for larger files and no ads.

## Pages
- [Home](${SITE_URL}/)
- [Pricing](${SITE_URL}/pricing)
- [About](${SITE_URL}/about)
- [Privacy Policy](${SITE_URL}/privacy)
- [Terms of Service](${SITE_URL}/terms)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
