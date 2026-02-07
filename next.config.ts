import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add empty turbopack config for Next.js 16 compatibility
  turbopack: {},
  // Stub optional peer deps from @standard-community/standard-json
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      effect: false,
      sury: false,
      "@valibot/to-json-schema": false,
    };
    return config;
  },
};

export default nextConfig;
