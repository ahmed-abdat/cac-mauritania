import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images configuration
  images: {
    loader: "custom",
    loaderFile: "./lib/imageKitLoader.js",
    remotePatterns: [
      // All optimised files come from ImageKit
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
      // Firebase storage URLs
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      // R2 Storage URLs (production custom domain)
      {
        protocol: "https",
        hostname: "cacmauritanie.mr",
        pathname: "/**",
      },
      // R2 Storage URLs (dev URL - fallback only)
      {
        protocol: "https",
        hostname: "pub-b49a9ad764784bc5b4b1d434f1159bf5.r2.dev",
        pathname: "/**",
      },
    ],
    domains: ["localhost"],
  },

  // Use experimental for server actions instead of serverActions directly
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increased for file uploads
    },
  },

  // Ensure assetPrefix is correctly set for dev environment
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
};

export default withNextIntl(nextConfig);
