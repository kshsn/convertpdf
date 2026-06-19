import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PDF to Word",
  description:
    "Convert PDF to editable Word (DOCX) online for free. Keep text, tables, and layout. No signup, no watermark, fast conversion.",
  path: "pdf-to-word",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
