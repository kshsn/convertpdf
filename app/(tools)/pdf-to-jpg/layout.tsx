import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PDF to JPG",
  description:
    "Convert PDF pages to high-quality JPG images online for free. Download all pages as a ZIP. No signup, no watermark, fast conversion.",
  path: "pdf-to-jpg",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
