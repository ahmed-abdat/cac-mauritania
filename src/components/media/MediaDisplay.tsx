"use client";

import { useState } from 'react';
import Image from 'next/image';
import { r2UrlGenerator } from '@/utils/r2-client';
import { isR2StorageUrl, isFirebaseStorageUrl } from '@/utils/storage-utils';

interface MediaDisplayProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * MediaDisplay component for displaying images from R2 or Firebase storage
 * Handles both R2 URLs and legacy Firebase URLs
 */
export default function MediaDisplay({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  fill = false,
  placeholder,
  blurDataURL,
}: MediaDisplayProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle image load error
  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  // Handle image load success
  const handleLoad = () => {
    setLoading(false);
  };

  // Get optimized image source
  const getOptimizedSrc = () => {
    if (error) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwTDEwMCAxMDBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik03MCA3MEwxMzAgMTMwTTEzMCA3MEw3MCAxMzAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+'; // Fallback image - gray placeholder with X
    }
    
    // If it's already an R2 URL, use it as-is (ImageKit loader will handle optimization)
    if (isR2StorageUrl(src)) {
      return src;
    }
    
    // If it's a Firebase URL, use it as-is (ImageKit loader will handle optimization)
    if (isFirebaseStorageUrl(src)) {
      return src;
    }
    
    // For relative paths or other URLs, assume they're R2 keys
    if (src.startsWith('/') || (!src.startsWith('http'))) {
      return r2UrlGenerator.generatePublicUrl(src);
    }
    
    return src;
  };

  const optimizedSrc = getOptimizedSrc();

  if (fill) {
    return (
      <>
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={className || "object-cover"}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onError={handleError}
          onLoad={handleLoad}
          unoptimized={false}
        />
        {loading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        )}
      </>
    );
  }

  return (
    <div className={`relative ${className || ''}`}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="object-cover"
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onError={handleError}
        onLoad={handleLoad}
      />
      {loading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

/**
 * VideoDisplay component for displaying videos from R2 or Firebase storage
 */
interface VideoDisplayProps {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
}

export function VideoDisplay({
  src,
  poster,
  className,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  width,
  height,
}: VideoDisplayProps) {
  const [error, setError] = useState(false);

  const getOptimizedSrc = () => {
    if (error) {
      return '/videos/placeholder.mp4'; // Fallback video
    }
    
    // If it's already an R2 URL, use it as-is
    if (isR2StorageUrl(src)) {
      return src;
    }
    
    // If it's a Firebase URL, use it as-is
    if (isFirebaseStorageUrl(src)) {
      return src;
    }
    
    // For relative paths or other URLs, assume they're R2 keys
    if (src.startsWith('/') || (!src.startsWith('http'))) {
      return r2UrlGenerator.generatePublicUrl(src);
    }
    
    return src;
  };

  const getOptimizedPoster = () => {
    if (!poster) return undefined;
    
    // If it's already an R2 URL, use it as-is
    if (isR2StorageUrl(poster)) {
      return poster;
    }
    
    // If it's a Firebase URL, use it as-is
    if (isFirebaseStorageUrl(poster)) {
      return poster;
    }
    
    // For relative paths or other URLs, assume they're R2 keys
    if (poster.startsWith('/') || (!poster.startsWith('http'))) {
      return r2UrlGenerator.generatePublicUrl(poster);
    }
    
    return poster;
  };

  return (
    <video
      src={getOptimizedSrc()}
      poster={getOptimizedPoster()}
      className={className}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      width={width}
      height={height}
      onError={() => setError(true)}
    >
      Your browser does not support the video tag.
    </video>
  );
}

/**
 * MediaThumbnail component for displaying thumbnails
 */
interface MediaThumbnailProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function MediaThumbnail({
  src,
  alt,
  size = 150,
  className,
  onClick,
}: MediaThumbnailProps) {
  const [error, setError] = useState(false);

  const getThumbnailSrc = () => {
    if (error) {
      return '/images/placeholder-thumbnail.jpg';
    }
    
    // Try to use thumbnail version if available
    let thumbnailSrc = src;
    
    // If it's an R2 URL, try to get thumbnail version
    if (isR2StorageUrl(src)) {
      const key = r2UrlGenerator.extractKeyFromUrl(src);
      const thumbnailKey = key.replace(/\.[^/.]+$/, '_thumb.jpg');
      thumbnailSrc = r2UrlGenerator.generatePublicUrl(thumbnailKey);
    }
    
    return thumbnailSrc;
  };

  return (
    <div
      className={`relative cursor-pointer overflow-hidden rounded-lg ${className || ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Image
        src={getThumbnailSrc()}
        alt={alt}
        fill
        className="object-cover transition-transform hover:scale-105"
        onError={() => setError(true)}
        sizes={`${size}px`}
      />
    </div>
  );
}