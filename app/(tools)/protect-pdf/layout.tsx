import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Protect PDF",
  description:
    "Password protect a PDF online for free. Encrypt your PDF with a password to prevent unauthorized access. No signup, no watermark.",
  path: "protect-pdf",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
