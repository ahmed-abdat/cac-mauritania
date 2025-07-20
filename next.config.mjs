import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enhanced images configuration for better performance
  images: {
    loader: "custom",
    loaderFile: "./lib/imageKitLoader.js",
    formats: ['image/avif', 'image/webp'], // Modern image formats
    minimumCacheTTL: 60, // Cache images for 60 seconds
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
      // R2 Storage URLs (CDN subdomain)
      {
        protocol: "https",
        hostname: "cdn.cacmauritanie.mr",
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

  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Enhanced experimental features for Next.js 15
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increased for file uploads
    },
    optimizePackageImports: [
      '@/components',
      '@/lib',
      '@/utils',
      'lucide-react',
      'framer-motion'
    ],
// Removed webVitalsAttribution - no analytics needed
    optimizeServerReact: true, // Optimize React on server
  },

  // External packages for server components (moved from experimental)
  serverExternalPackages: ['sharp'],

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src'),
    };

    return config;
  },

  // Security headers for better performance and SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // Cache static assets
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Ensure assetPrefix is correctly set for dev environment
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
};

export default withNextIntl(nextConfig);
