"use client";

import { Image } from "@/components/ui/image";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Carousele } from "@/components/Carousel";
import { presentations } from "@/constats/presentation";
import { getGalaryMedia } from "@/app/action";
import { SkeletonLoader } from "@/components/GalarySkeltonLoader"; // Import the SkeletonLoader
import { useInView } from "react-intersection-observer";

interface GalleryClientProps {
  slug: string;
  title: string;
}

interface MediaItem {
  url: string;
  id: string;
  type: string;
}

const GalleryClient: React.FC<GalleryClientProps> = ({
  slug,
  title,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
    null
  );
  const [medias, setMedias] = useState<MediaItem[]>([]);
  const [displayedMedias, setDisplayedMedias] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isFetching, setIsFetching] = useState(false); // State to track if more media is being fetched
  const [lastMediaIndex, setLastMediaIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Create a memoized version of media with guaranteed unique keys
  const uniqueMedias = useMemo(() => {
    return medias.map((media, index) => ({
      ...media,
      // Create a compound key using both the original id and index
      uniqueId: `${media.id}_${index}`,
    }));
  }, [medias]);

  // Create a memoized version of displayed media with unique keys
  const uniqueDisplayedMedias = useMemo(() => {
    return displayedMedias.map((media, index) => ({
      ...media,
      uniqueId: `${media.id}_${index + lastMediaIndex - displayedMedias.length}`,
    }));
  }, [displayedMedias, lastMediaIndex]);

  // Use a ref to store references to all video elements in the gallery
  const galleryVideoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  // Intersection Observer to trigger lazy loading
  const { ref, inView } = useInView();

  // Function to handle media click in the gallery
  const handleMediaClick = (index: number) => {
    setSelectedMediaIndex(index);
    setIsFullScreen(true);

    // Pause all videos in the gallery when a media item is clicked
    galleryVideoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  const handleExitFullScreen = () => {
    setIsFullScreen(false);
    setSelectedMediaIndex(null);
    console.log("exit full screen");
  };

  // Function to fetch and display more media
  const fetchMoreMedias = useCallback(() => {
    if (isFetching) return; // Prevent fetching if already fetching

    setIsFetching(true);

    // Simulate network delay for better UX when testing locally
    setTimeout(() => {
      // Fetch the next set of media
      const newLastMediaIndex = lastMediaIndex + 10;
      const newMedias = medias.slice(lastMediaIndex, newLastMediaIndex);
      setDisplayedMedias((prevMedias) => [...prevMedias, ...newMedias]);
      setLastMediaIndex(newLastMediaIndex);

      setIsFetching(false);
    }, 800); // Short delay to make loading visible
  }, [isFetching, lastMediaIndex, medias]);

  useEffect(() => {
    const fetchGalaryMedia = async () => {
      console.log(presentations[slug], slug);

      try {
        const mediaData: MediaItem[] = await getGalaryMedia(slug);
        console.log(mediaData);

        if (!mediaData || mediaData.length === 0) {
          setError("No media found for this gallery");
          setLoading(false);
          return;
        }

        setMedias(mediaData);
        // Only load first batch to improve initial page load
        setDisplayedMedias(mediaData.slice(0, 10)); 
        setLastMediaIndex(10); // Update the last media index
      } catch (error) {
        console.error("Error fetching gallery media:", error);
        setError("Error loading gallery media. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false once media is fetched
      }
    };

    fetchGalaryMedia();
  }, [slug]);

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFullScreen]);

  // Use effect to lazy load more media when the bottom of the page is reached
  useEffect(() => {
    if (inView && lastMediaIndex < medias.length) {
      fetchMoreMedias();
    }
  }, [inView, lastMediaIndex, medias.length, fetchMoreMedias]);

  return (
    <div className="bg-gray-50">
      <section className="py-6 md:py-10 mx-auto ">
        <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>
        {loading ? (
          <SkeletonLoader /> // Display SkeletonLoader when loading
        ) : error ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">{error}</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto px-4 my-6">
            {uniqueDisplayedMedias.map((media, index) => (
              <div
                key={media.uniqueId}
                className="relative w-full h-72 cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleMediaClick(index)}
              >
                {media.type === "image" ? (
                  <Image
                    src={media.url}
                    alt={`${slug} ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={media.url}
                    controls
                    className="rounded-lg w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    ref={(el) => {
                      galleryVideoRefs.current[index] = el;
                    }}
                    onPlay={() => handleMediaClick(index)}
                    preload="metadata"
                  />
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Display skeleton loaders when fetching more media */}
        {isFetching && <SkeletonLoader count={4} />}
        
        {/* Loading trigger element */}
        <div 
          ref={ref} 
          className="w-full h-12 flex items-center justify-center"
        >
          {!isFetching && lastMediaIndex < medias.length && (
            <p className="text-gray-500 text-sm animate-pulse">Scroll for more...</p>
          )}
        </div>
      </section>

      {isFullScreen && selectedMediaIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button
            className="absolute top-4 right-4 text-white text-4xl cursor-pointer z-50"
            onClick={handleExitFullScreen}
          >
            &times;
          </button>
          <Carousele
            mediaItems={uniqueMedias}
            selectedMedia={uniqueMedias[selectedMediaIndex].url}
            pauseGalleryVideos={() => {
              // Pause gallery videos when entering the carousel
              galleryVideoRefs.current.forEach((video) => {
                if (video) {
                  video.pause();
                }
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryClient;
