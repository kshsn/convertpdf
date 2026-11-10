import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Load these from node_modules at runtime instead of bundling them into the
  // route. archiver uses dynamic requires that break when webpack bundles it.
  serverExternalPackages: ["archiver", "pdf-lib"],
  // Send www.proailabs.net to the canonical apex so there is a single site.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.proailabs.net" }],
        destination: "https://proailabs.net/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
