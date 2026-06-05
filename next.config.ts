import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Silences the "multiple lockfiles" workspace root warning.
    // process.cwd() resolves to the project root when running npm commands.
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
