import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Word to PDF",
  description:
    "Convert Word documents (DOC, DOCX) to PDF online for free. Preserve formatting, fonts, and images. No signup, no watermark.",
  path: "word-to-pdf",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
