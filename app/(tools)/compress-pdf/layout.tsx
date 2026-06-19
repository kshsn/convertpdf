import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compress PDF",
  description:
    "Compress PDF files online for free to reduce file size without losing quality. Shrink large PDFs in seconds. No signup, no watermark.",
  path: "compress-pdf",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
