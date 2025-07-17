import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";

// Define the MediaItem type to include both images and videos
interface MediaItem {
  url: string;
  id: string;
  type: string;
  uniqueId?: string; // Add optional uniqueId field for guaranteed uniqueness
}

export function Carousele({
  mediaItems,
  selectedMedia,
  pauseGalleryVideos,
}: {
  mediaItems: MediaItem[];
  selectedMedia?: string | null;
  pauseGalleryVideos?: () => void;
}) {
  const selectedMediaIndex = mediaItems.findIndex(
    (media) => media.url === selectedMedia
  );

  // Use a ref to store references to all video elements in the carousel
  const carouselVideoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const [videoControls, setVideoControls] = React.useState<boolean[]>([]);

  // Function to handle playing a video in the carousel
  const handlePlay = (index: number) => {
    // Pause all other videos in the carousel
    carouselVideoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
      }
    });

    // Pause videos in the gallery when a carousel video plays
    if (pauseGalleryVideos) {
      pauseGalleryVideos();
    }
  };

  // Function to toggle video controls visibility
  const toggleVideoControls = (index: number) => {
    setVideoControls((prev) => {
      const newControls = [...prev];
      newControls[index] = !newControls[index];
      return newControls;
    });
  };

  React.useEffect(() => {
    // Initialize video controls state for each media item
    setVideoControls(mediaItems.map(() => false));
  }, [mediaItems]);

  return (
    <Carousel
      className="w-full h-full px-4"
      dir="ltr"
      opts={{
        startIndex: selectedMediaIndex || 0,
        align: "center",
      }}
    >
      <CarouselContent className="w-full h-full">
        {mediaItems.map((media, index) => (
          <CarouselItem
            key={media.uniqueId || `${media.id}_${index}`}
            className="w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full min-h-[90dvh] overflow-hidden">
              {media.type === "image" ? (
                <Image
                  src={media.url}
                  alt="Full screen image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 33vw"
                  className="object-contain"
                  priority={index === selectedMediaIndex}
                />
              ) : (
                <video
                  src={media.url}
                  controls={videoControls[index]}
                  autoPlay
                  className="w-full object-contain h-[80dvh] md:h-[85dvh] "
                  ref={(el) => {
                    carouselVideoRefs.current[index] = el;
                  }}
                  onPlay={() => handlePlay(index)}
                  onClick={() => toggleVideoControls(index)}
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 z-10 bg-white text-black" />
      <CarouselNext className="absolute right-0 z-10 bg-white text-black" />
    </Carousel>
  );
}
