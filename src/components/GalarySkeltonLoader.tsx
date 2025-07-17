import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FilmIcon, ImageIcon } from "lucide-react";

/**
 * Enhanced media item skeleton loader
 * - Shows a visual placeholder for both image and video content
 * - Mimics the aspect ratio and visual style of actual media items
 * - Displays loading indicators to inform users about ongoing data fetching
 */
export function SkeletonLoader({ count = 8 }: { count?: number }) {
  // Generate array for the skeleton grid with specified count
  const skeletonItems = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto px-4 my-6">
      {skeletonItems.map((index) => {
        // Alternate between image and video skeletons for visual variety
        const isVideoSkeleton = index % 3 === 0;
        
        return (
          <div 
            key={index} 
            className="relative w-full h-72 rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow duration-300 animate-pulse"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
              {/* Placeholder icon for media type */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                {isVideoSkeleton ? (
                  <FilmIcon className="h-20 w-20 text-gray-400" />
                ) : (
                  <ImageIcon className="h-20 w-20 text-gray-400" />
                )}
              </div>
            </div>
            
            {/* Loading indicator at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/60 to-transparent p-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600" />
                <Skeleton className="h-2 w-1/2 bg-gray-300 dark:bg-gray-600" />
              </div>
            </div>
            
            {/* Loading shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-effect" />
          </div>
        );
      })}
    </div>
  );
}
