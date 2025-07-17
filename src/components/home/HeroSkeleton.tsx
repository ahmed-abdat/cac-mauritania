"use client";

import { Skeleton } from "@/components/ui/skeleton";

function HeroSkeleton() {
  return (
    <section className="flex w-full flex-col md:flex-row items-center h-[120dvh] md:h-[65dvh] lg:h-[80dvh]">
      {/* Left side (Hero image skeleton) */}
      <div className="w-full h-full overflow-hidden relative md:w-1/2">
        <Skeleton className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-8">
          <div className="max-w-xl">
            {/* Title skeleton */}
            <Skeleton className="h-10 w-3/4 mb-4" />
            
            {/* Description skeleton */}
            <Skeleton className="h-20 w-full mb-4" />
            
            {/* Button skeleton */}
            <Skeleton className="h-10 w-32 mb-2" />
          </div>
        </div>
      </div>
      
      {/* Right side (Carousel skeleton) */}
      <div className="w-full h-full mx-auto md:w-1/2 bg-[#273543] overflow-hidden">
        <div className="flex flex-col items-center justify-center h-full p-4">
          {/* Carousel item skeletons */}
          <Skeleton className="h-8 w-1/2 mb-4" />
          <div className="w-full h-[50%] relative">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          
          {/* Navigation dots skeleton */}
          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-2 w-2 rounded-full" />
            ))}
          </div>
          
          {/* Controls skeleton */}
          <div className="flex justify-between w-full mt-4 px-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSkeleton;
