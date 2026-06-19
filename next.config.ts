import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Load these from node_modules at runtime instead of bundling them into the
  // route. archiver uses dynamic requires that break when webpack bundles it.
  serverExternalPackages: ["archiver", "pdf-lib"],
};

export default nextConfig;
