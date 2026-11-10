import { buildMetadata, absoluteUrl } from "@/lib/seo";

// English-only page: canonical only, no hreflang alternates.
export const metadata = {
  ...buildMetadata({
    title: "Contact Us",
    description:
      "Get in touch with the ConvertPDF team for support, feedback, billing questions or privacy requests.",
    path: "contact",
  }),
  alternates: { canonical: absoluteUrl("contact") },
};

const TOPICS = [
  {
    title: "Support",
    text: "A tool is not working or a file will not convert? Tell us which tool you used, the file size, and what happened. A screenshot of any error message helps.",
  },
  {
    title: "Billing and Pro plan",
    text: "Questions about a payment, your subscription or cancelling. Include the email you used to sign up.",
  },
  {
    title: "Privacy and data requests",
    text: "Questions about how files are handled, or a request related to your personal data.",
  },
  {
    title: "Feedback and ideas",
    text: "Missing a tool or a feature? We read every message and use it to decide what to build next.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          ConvertPDF is operated by ProAILabs. The quickest way to reach us is
          by email. We aim to reply within two business days.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-10">
          <p className="text-sm text-gray-500 mb-1">Email</p>
          <a
            href="mailto:kshsna@gmail.com"
            className="text-xl font-semibold text-red-600 hover:underline"
          >
            kshsna@gmail.com
          </a>
          <p className="text-sm text-gray-500 mt-3">
            Website: proailabs.net
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          What can we help with?
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {TOPICS.map((t) => (
            <div key={t.title} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-1">{t.title}</h3>
              <p className="text-sm text-gray-600">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
