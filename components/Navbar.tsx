import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-red-600">
          ConvertPDF
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Tools
          </Link>
          <Link
            href="/pricing"
            className="hover:text-red-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/pricing"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors"
          >
            Go Pro
          </Link>
        </div>
      </div>
    </nav>
  );
}
