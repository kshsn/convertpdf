import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="text-white font-bold text-base mb-3">ConvertPDF</p>
          <p className="text-gray-500 text-xs">
            Free online PDF tools. No signup required.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Tools</p>
          <ul className="space-y-2">
            {["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-word"].map(
              (slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="hover:text-white transition-colors capitalize"
                  >
                    {slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">More Tools</p>
          <ul className="space-y-2">
            {["word-to-pdf", "rotate-pdf", "pdf-to-jpg", "protect-pdf"].map(
              (slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="hover:text-white transition-colors capitalize"
                  >
                    {slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Company</p>
          <ul className="space-y-2">
            {[
              { label: "About", href: "/about" },
              { label: "Pricing", href: "/pricing" },
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} ConvertPDF. All rights reserved.
      </div>
    </footer>
  );
}
