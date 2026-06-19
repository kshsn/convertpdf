import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Split PDF",
  description:
    "Split a PDF into separate files online for free. Extract specific pages or split every page into its own PDF. No signup, no watermark.",
  path: "split-pdf",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
