import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Keep tracing scoped to this application when the repository is checked out
  // below a directory that contains an unrelated package-lock.json.
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/fonts/outfit/:path*.woff2",
        headers: [
          { key: "Content-Type", value: "font/woff2" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
