import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Rotate PDF",
  description:
    "Rotate PDF pages online for free. Turn pages 90, 180, or 270 degrees to fix orientation. No signup, no watermark, instant download.",
  path: "rotate-pdf",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
