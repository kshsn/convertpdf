import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Merge PDF",
  description:
    "Combine multiple PDF files into one document online for free. Reorder pages, no signup, no watermark. Fast and secure.",
  path: "merge-pdf",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
