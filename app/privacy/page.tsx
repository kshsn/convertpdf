export const metadata = {
  title: "Privacy Policy — ConvertPDF",
  description: "How ConvertPDF handles your files and personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <h1>Privacy Policy</h1>
        <p className="text-gray-500">Last updated: June 2025</p>

        <h2>1. Files You Upload</h2>
        <p>
          Files uploaded to ConvertPDF are processed in memory on our servers
          and are automatically deleted immediately after your download is
          complete. We do not store, read, or share your files with third
          parties.
        </p>

        <h2>2. Data We Collect</h2>
        <p>
          For free users we collect no personal information. If you create an
          account (Pro plan), we collect your email address and payment
          information. Payments are handled by Paddle — we never see your card
          details.
        </p>

        <h2>3. Cookies &amp; Analytics</h2>
        <p>
          We use Google Analytics to understand how visitors use the site (page
          views, countries, devices). This data is aggregated and anonymous. We
          also use Google AdSense to display ads, which may set cookies on your
          device.
        </p>

        <h2>4. Third-Party Services</h2>
        <ul>
          <li>Google Analytics — usage analytics</li>
          <li>Google AdSense — advertising</li>
          <li>Paddle — payment processing (Pro plan)</li>
        </ul>

        <h2>5. Your Rights</h2>
        <p>
          You may request deletion of your account and associated data at any
          time by emailing us at{" "}
          <a href="mailto:kshsna@gmail.com">kshsna@gmail.com</a>.
        </p>

        <h2>6. Changes</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on
          this page with an updated date.
        </p>
      </div>
    </main>
  );
}
