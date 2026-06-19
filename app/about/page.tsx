export const metadata = {
  title: "About ConvertPDF — Free Online PDF Tools",
  description: "Learn about ConvertPDF — fast, free, and private PDF tools.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About ConvertPDF
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          ConvertPDF is a free online PDF toolkit that lets you merge, split,
          compress, rotate, and convert PDF files — no sign-up required.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {[
            {
              icon: "⚡",
              title: "Fast",
              desc: "Files are processed in seconds on our dedicated server.",
            },
            {
              icon: "🔒",
              title: "Private",
              desc: "Your files are deleted immediately after you download them.",
            },
            {
              icon: "💸",
              title: "Free",
              desc: "All core tools are 100% free with no hidden limits.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">{icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          We believe working with PDFs should be simple and free. ConvertPDF was
          built to give everyone — students, freelancers, and businesses — a
          reliable alternative to expensive desktop software.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">Contact</h2>
        <p className="text-gray-600">
          Have feedback or questions?{" "}
          <a
            href="mailto:kshsna@gmail.com"
            className="text-red-600 hover:underline"
          >
            kshsna@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
