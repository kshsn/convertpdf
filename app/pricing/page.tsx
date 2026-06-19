import PricingPlans from "@/components/PricingPlans";

export const metadata = {
  title: "Pricing — ConvertPDF Pro & Business Plans",
  description:
    "Simple pricing for ConvertPDF. Start free, upgrade to Pro for larger files and no ads, or Business for API access. Cancel anytime.",
  alternates: { canonical: "https://convertpdf.proailabs.net/pricing" },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-500">
            Start free. Upgrade when you need bigger files and no ads. Cancel
            anytime.
          </p>
        </div>

        <PricingPlans />

        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes. You can cancel your subscription at any time and keep Pro features until the end of your billing period.",
              },
              {
                q: "What payment methods do you accept?",
                a: "Payments are securely processed by Paddle, which accepts all major credit cards, PayPal, and local payment methods.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes — refunds are handled according to Paddle's refund policy. Contact us within 14 days if you're not satisfied.",
              },
              {
                q: "Is there a free plan forever?",
                a: "Absolutely. All core PDF tools are free to use, with reasonable file-size limits and ads.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="border rounded-lg p-4">
                <summary className="font-medium cursor-pointer text-gray-800">
                  {q}
                </summary>
                <p className="mt-2 text-sm text-gray-600">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
