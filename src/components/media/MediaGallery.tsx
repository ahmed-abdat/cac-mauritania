"use client";

import MediaDisplay from "./MediaDisplay";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { presentations } from "@/constats/presentation";
import { getGalaryMedia } from "@/app/action";
import { SkeletonLoader } from "@/components/GalarySkeltonLoader";
import { MediaFilters } from "./MediaFilters";
import { MediaPreviewModal } from "./MediaPreviewModal";
import { useInView } from "react-intersection-observer";
import {
  RefreshCw,
  FolderOpen,
  Play,
  ImageIcon,
  AlertCircle,
  Grid3x3,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MediaGalleryProps {
  slug: string;
  title: string;
}

interface MediaItem {
  url: string;
  id: string;
  type: string;
  uniqueId?: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ slug, title }) => {
  const t = useTranslations("Gallery");

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
    null
  );
  const [medias, setMedias] = useState<MediaItem[]>([]);
  const [displayedMedias, setDisplayedMedias] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [lastMediaIndex, setLastMediaIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [retryCount, setRetryCount] = useState(0);

  // Intersection Observer for lazy loading
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Video refs for better video management
  const galleryVideoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  // Create memoized media with unique IDs
  const uniqueMedias = useMemo(() => {
    return medias.map((media, index) => ({
      ...media,
      uniqueId: `${media.id}_${index}`,
    }));
  }, [medias]);

  // Filter media based on type
  const filteredMedias = useMemo(() => {
    if (typeFilter === "all") return uniqueMedias;
    return uniqueMedias.filter((media) => media.type === typeFilter);
  }, [uniqueMedias, typeFilter]);

  // Create displayed media with pagination
  const uniqueDisplayedMedias = useMemo(() => {
    const filtered = filteredMedias.slice(0, lastMediaIndex);
    return filtered.map((media, index) => ({
      ...media,
      displayIndex: index,
    }));
  }, [filteredMedias, lastMediaIndex]);

  // Calculate statistics
  const mediaStats = useMemo(() => {
    const imageCount = uniqueMedias.filter((m) => m.type === "image").length;
    const videoCount = uniqueMedias.filter((m) => m.type === "video").length;
    return {
      total: uniqueMedias.length,
      images: imageCount,
      videos: videoCount,
    };
  }, [uniqueMedias]);

  // Handle media click with enhanced modal
  const handleMediaClick = useCallback(
    (index: number) => {
      const actualIndex = filteredMedias.findIndex(
        (media) => media.uniqueId === uniqueDisplayedMedias[index].uniqueId
      );
      setSelectedMediaIndex(actualIndex);
      setIsFullScreen(true);

      // Pause all gallery videos
      galleryVideoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    },
    [filteredMedias, uniqueDisplayedMedias]
  );

  const handleExitFullScreen = useCallback(() => {
    setIsFullScreen(false);
    setSelectedMediaIndex(null);
  }, []);

  const handleModalNavigate = useCallback((newIndex: number) => {
    setSelectedMediaIndex(newIndex);
  }, []);

  // Enhanced fetch function with retry logic
  const fetchGalaryMedia = useCallback(
    async (isRetry = false) => {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }

      try {
        const mediaData: MediaItem[] = await getGalaryMedia(slug);

        if (!mediaData || mediaData.length === 0) {
          setError(t("states.noMediaFound"));
          return;
        }

        setMedias(mediaData);
        setDisplayedMedias(mediaData.slice(0, 12)); // Show 12 initially
        setLastMediaIndex(12);
        setRetryCount(0);
      } catch (error) {
        console.error("Error fetching gallery media:", error);
        setError(t("states.errorDescription"));
      } finally {
        setLoading(false);
      }
    },
    [slug, t]
  );

  // Fetch more media with pagination
  const fetchMoreMedias = useCallback(() => {
    if (isFetching || lastMediaIndex >= filteredMedias.length) return;

    setIsFetching(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      const newLastIndex = Math.min(lastMediaIndex + 12, filteredMedias.length);
      setLastMediaIndex(newLastIndex);
      setIsFetching(false);
    }, 300);
  }, [isFetching, lastMediaIndex, filteredMedias.length]);

  // Handle retry
  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    fetchGalaryMedia(true);
  }, [fetchGalaryMedia]);

  // Initial fetch
  useEffect(() => {
    fetchGalaryMedia();
  }, [fetchGalaryMedia]);

  // Handle body overflow for modal
  useEffect(() => {
    document.body.style.overflow = isFullScreen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullScreen]);

  // Lazy loading effect
  useEffect(() => {
    if (inView && lastMediaIndex < filteredMedias.length && !isFetching) {
      fetchMoreMedias();
    }
  }, [
    inView,
    lastMediaIndex,
    filteredMedias.length,
    isFetching,
    fetchMoreMedias,
  ]);

  // Reset pagination when filter changes
  useEffect(() => {
    setLastMediaIndex(12);
  }, [typeFilter]);

  // Helper function to get singular/plural form
  const getItemText = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : plural;
  };

  // Generate statistics text with proper pluralization
  const getStatisticsText = () => {
    const itemsText = `${mediaStats.total} ${getItemText(
      mediaStats.total,
      t("statistics.item"),
      t("statistics.items")
    )}`;

    if (mediaStats.images > 0 && mediaStats.videos > 0) {
      return `${itemsText} • ${mediaStats.images} ${getItemText(
        mediaStats.images,
        t("statistics.image"),
        t("statistics.images")
      )} • ${mediaStats.videos} ${getItemText(
        mediaStats.videos,
        t("statistics.video"),
        t("statistics.videos")
      )}`;
    } else if (mediaStats.images > 0) {
      return `${itemsText} • ${mediaStats.images} ${getItemText(
        mediaStats.images,
        t("statistics.image"),
        t("statistics.images")
      )}`;
    } else if (mediaStats.videos > 0) {
      return `${itemsText} • ${mediaStats.videos} ${getItemText(
        mediaStats.videos,
        t("statistics.video"),
        t("statistics.videos")
      )}`;
    }

    return itemsText;
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <section className="py-6 md:py-10 mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            {title}
          </h1>
          <SkeletonLoader count={12} />
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <section className="py-6 md:py-10 mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            {title}
          </h1>
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("states.errorLoading")}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <Button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  {t("states.retrying")}
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t("states.tryAgain")}
                </>
              )}
            </Button>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Retry attempt: {retryCount}
              </p>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Empty state
  if (uniqueMedias.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <section className="py-6 md:py-10 mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            {title}
          </h1>
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FolderOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("states.noMediaFound")}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {t("states.noMediaDescription")}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-6 md:py-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
            <Grid3x3 className="h-5 w-5" />
            <span className="font-medium">{getStatisticsText()}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <MediaFilters
            totalItems={mediaStats.total}
            imageCount={mediaStats.images}
            videoCount={mediaStats.videos}
            typeFilter={typeFilter}
            onFilterChange={setTypeFilter}
            className="justify-center"
          />
        </div>

        {/* Media Grid */}
        {uniqueDisplayedMedias.length > 0 ? (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {uniqueDisplayedMedias.map((media, index) => (
                <div
                  key={media.uniqueId}
                  className="group relative w-full aspect-square cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                  onClick={() => handleMediaClick(index)}
                >
                  {/* Media Content */}
                  {media.type === "image" ? (
                    <MediaDisplay
                      src={media.url}
                      alt={`${slug} ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={index < 4} // Prioritize first 4 images
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      ref={(el) => {
                        galleryVideoRefs.current[index] = el;
                      }}
                      preload="metadata"
                      muted
                    />
                  )}

                  {/* Overlay with media type indicator */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      {media.type === "image" ? (
                        <Eye className="h-6 w-6 text-gray-700" />
                      ) : (
                        <Play className="h-6 w-6 text-gray-700" />
                      )}
                    </div>
                  </div>

                  {/* Media type badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {media.type === "image" ? (
                      <div className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {t("mediaPreview.image")}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        {t("mediaPreview.video")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>

            {/* Loading more indicator */}
            {isFetching && (
              <div className="mb-8">
                <SkeletonLoader count={4} />
              </div>
            )}

            {/* Load more trigger */}
            <div
              ref={ref}
              className="w-full h-20 flex items-center justify-center"
            >
              {!isFetching && lastMediaIndex < filteredMedias.length && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-gray-500 text-sm bg-white px-4 py-2 rounded-full shadow-sm">
                    <RefreshCw className="h-4 w-4 animate-pulse" />
                    {t("states.loadingMore")}
                  </div>
                </div>
              )}
              {lastMediaIndex >= filteredMedias.length &&
                filteredMedias.length > 12 && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-gray-500 text-sm bg-white px-4 py-2 rounded-full shadow-sm">
                      ✓ {t("states.allItemsLoaded")}
                    </div>
                  </div>
                )}
            </div>
          </>
        ) : (
          // Filtered empty state
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              {typeFilter === "image" ? (
                <ImageIcon className="h-12 w-12 text-gray-400" />
              ) : (
                <Play className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {typeFilter === "image"
                ? t("states.noImagesFound")
                : t("states.noVideosFound")}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-4">
              {t("states.filterEmptyDescription")}
            </p>
            <Button
              onClick={() => setTypeFilter("all")}
              variant="outline"
              className="border-gray-300 hover:border-gray-400"
            >
              {t("states.showAllItems")}
            </Button>
          </div>
        )}
      </section>

      {/* Enhanced Modal */}
      {isFullScreen && selectedMediaIndex !== null && (
        <MediaPreviewModal
          isOpen={isFullScreen}
          onClose={handleExitFullScreen}
          items={filteredMedias}
          currentIndex={selectedMediaIndex}
          onNavigate={handleModalNavigate}
        />
      )}
    </div>
  );
};

export default MediaGallery;
