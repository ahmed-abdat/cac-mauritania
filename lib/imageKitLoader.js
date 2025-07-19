"use client";

const IK_ID = process.env.NEXT_PUBLIC_IMAGEKIT_ID;
const DEFAULT_QUALITY = 80;
const DEFAULT_FORMAT = "webp";

/**
 * Optimized ImageKit loader focusing on loading speed
 * - Automatically selects optimal format and quality
 * - Applies proper caching for faster repeat views
 * - Progressive rendering for large images
 * - Handles Firebase Storage URLs
 *
 * @param {Object} params - Image parameters
 * @param {string} params.src - Image source URL
 * @param {number} params.width - Desired image width
 * @param {number} params.quality - Image quality (1-100)
 * @returns {string} - Optimized image URL
 */
export default function imageKitLoader({
  src,
  width,
  quality = DEFAULT_QUALITY,
}) {
  // Don't transform SVG files, just add width param to satisfy Next.js
  if (src.endsWith(".svg")) {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  }

  // For local images from public directory
  if (src.startsWith("/")) {
    // Use relative path to avoid hardcoded port issues
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  }

  // Calculate optimal quality based on image dimensions
  const optimizedQuality = getOptimalQuality(width, quality);

  // Performance optimization flags
  const performanceFlags = [
    // Use WebP format for better compression
    `f-${DEFAULT_FORMAT}`,
    // Enable progressive loading for large images
    width > 800 ? "pr-true" : "",
    // Enable fixed quality optimization
    `q-${optimizedQuality}`,
    // Enable browser caching (1 week)
    "ik-cache=604800",
  ]
    .filter(Boolean)
    .join(",");

  // For existing ImageKit URLs, add optimized transformation parameters
  if (src.includes("ik.imagekit.io")) {
    const url = new URL(src);
    url.searchParams.set(
      "tr",
      `w-${width},q-${optimizedQuality},f-${DEFAULT_FORMAT}`
    );

    // Add caching params
    url.searchParams.append("ik-cache", "604800");

    return url.toString();
  }
  
  // Handle Firebase Storage URLs
  if (src.includes("firebasestorage.googleapis.com")) {
    const encoded = src.split("/o/")[1].split("?")[0];     // meillers-produits%2F...
    return `https://ik.imagekit.io/${IK_ID}/${encoded}?alt=media&tr=w-${width},${performanceFlags}`;
    //            └── ImageKit will pass everything after the first ? to Firebase
  }

  // Handle R2 Storage URLs (production custom domain - priority)
  if (src.includes("cacmauritanie.mr")) {
    const filePath = src.replace(/https:\/\/(cdn\.)?cacmauritanie\.mr\//, "");
    return `https://ik.imagekit.io/${IK_ID}/${filePath}?tr=w-${width},${performanceFlags}`;
  }

  // Handle R2 Storage URLs (dev URL - fallback only)
  if (src.includes("pub-b49a9ad764784bc5b4b1d434f1159bf5.r2.dev")) {
    const filePath = src.replace("https://pub-b49a9ad764784bc5b4b1d434f1159bf5.r2.dev/", "");
    return `https://ik.imagekit.io/${IK_ID}/${filePath}?tr=w-${width},${performanceFlags}`;
  }
  
  // For all other cases, construct optimized ImageKit URL
  return `https://ik.imagekit.io/${IK_ID}/${src}?tr=w-${width},${performanceFlags}`;
}

/**
 * Calculate the optimal quality setting based on image dimensions
 * Smaller images can use lower quality settings without visible quality loss
 *
 * @param {number} width - Requested image width
 * @param {number} baseQuality - Base quality setting from props
 * @returns {number} Optimized quality value
 */
function getOptimalQuality(width, baseQuality) {
  // Very large images - keep quality high but cap at base quality
  if (width > 1200) return Math.min(baseQuality, 85);

  // Large images - good balance of quality and compression
  if (width > 800) return Math.min(baseQuality, 80);

  // Medium images - slightly reduced quality
  if (width > 400) return Math.min(baseQuality, 75);

  // Small images and thumbnails - lowest quality still looks good
  return Math.min(baseQuality, 70);
}
