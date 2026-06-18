import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Free Online PDF Tools
        </h1>
        <p className="text-xl text-red-100 max-w-xl mx-auto">
          Merge, split, compress, and convert PDF files — 100% free, no signup
          required.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          All PDF Tools
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200 hover:border-red-400 hover:shadow-md transition-all group"
            >
              <span className="text-4xl">{tool.icon}</span>
              <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-red-600">
                {tool.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">
            Why ConvertPDF?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔒",
                title: "Private & Secure",
                desc: "Files are deleted automatically after 1 hour.",
              },
              {
                icon: "⚡",
                title: "Fast Processing",
                desc: "Most files processed in under 5 seconds.",
              },
              {
                icon: "💯",
                title: "100% Free",
                desc: "No hidden fees, no signup, no watermarks.",
              },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-3">
                <span className="text-4xl">{f.icon}</span>
                <h3 className="font-bold text-gray-800">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
