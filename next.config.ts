import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      },
    ],
    // Next.js 16 blocks fetching images from private IPs (localhost) by default.
    // In development, bypass the optimizer so Directus images load directly.
    // In production, Directus will be on a public hostname so this flag is not needed.
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
