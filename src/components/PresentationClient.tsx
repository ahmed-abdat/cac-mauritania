"use client";

import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MediaPreviewModal } from "@/components/media";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Play, Eye, Grid3X3, ChevronRight, ChevronLeft } from "lucide-react";

// Define the MediaItem type
interface MediaItem {
  url: string;
  id: string;
  type: string;
  uniqueId?: string;
}

export default function PresentaionClient({
  slug,
  locale,
  images,
  title,
  description,
  CTA,
}: {
  slug: string;
  locale?: string;
  images: MediaItem[] | [];
  title: string;
  description: string;
  CTA: string;
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  // Check if locale is RTL (Arabic)
  const isRTL = locale === "ar";

  // Handle clicking on a media item to open preview
  const handleMediaClick = (index: number) => {
    setCurrentPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  // Close preview modal
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  // Navigate in preview modal
  const handleNavigatePreview = (index: number) => {
    setCurrentPreviewIndex(index);
  };

  if (images.length === 0)
    return (
      <section className="mx-auto py-6 lg:py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">{title}</h1>
          <Card className="p-8">
            <CardContent className="space-y-4">
              <Grid3X3 className="h-16 w-16 mx-auto text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-700">
                No media found
              </h2>
              <p className="text-gray-500">
                This section doesn&apos;t have any images or videos yet.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );

  return (
    <section className="mx-auto py-6 lg:py-8 px-4">
      {/* Enhanced Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
      </div>

      {/* Enhanced Two-Column Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Enhanced Content Section */}
          <div className="order-1 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Enhanced Action Button */}
            <div className="pt-6">
              <Link href={`/${locale}/${slug}/galary`} className="block">
                <Button
                  variant="default"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Grid3X3 className="h-5 w-5 mr-2" />
                  {CTA}
                  {isRTL ? (
                    <ChevronLeft className="h-5 w-5 ml-2" />
                  ) : (
                    <ChevronRight className="h-5 w-5 ml-2" />
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced Carousel Section */}
          <div className="order-2">
            <Carousel
              className="w-full"
              opts={{
                direction: isRTL ? "rtl" : "ltr",
                align: "center",
              }}
              // dir={isRTL ? "rtl" : "ltr"}
            >
              <CarouselContent className="-ml-4">
                {images.map((item, index) => (
                  <CarouselItem key={item.id} className="pl-4">
                    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
                      <Image
                        src={item.url}
                        alt={`${title} ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onClick={() => handleMediaClick(index)}
                      />

                      {/* Media Type Indicator */}
                      <div
                        className={`absolute top-3 ${
                          isRTL ? "right-3" : "left-3"
                        } z-10`}
                      >
                        <Badge
                          variant={
                            item.type === "video" ? "default" : "secondary"
                          }
                          className="shadow-lg backdrop-blur-sm bg-white/90"
                        >
                          {item.type === "video" && (
                            <Play className="h-3 w-3 mr-1" />
                          )}
                          {item.type === "image" ? "Image" : "Video"}
                        </Badge>
                      </div>

                      {/* Click to View Overlay */}
                      <div
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={() => handleMediaClick(index)}
                      >
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="h-6 w-6 text-gray-800" />
                        </div>
                      </div>

                      {/* Item Counter */}
                      <div
                        className={`absolute bottom-3 ${
                          isRTL ? "left-3" : "right-3"
                        } z-10`}
                      >
                        <Badge
                          variant="outline"
                          className="bg-white/90 backdrop-blur-sm text-xs"
                        >
                          {index + 1} / {images.length}
                        </Badge>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Carousel navigation arrows */}
              {images.length > 1 && (
                <>
                  {isRTL ? (
                    <>
                      <CarouselNext className="left-2 right-auto bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0 rotate-180" />
                      <CarouselPrevious className="right-2 left-auto bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0 rotate-180" />
                    </>
                  ) : (
                    <>
                      <CarouselPrevious className="left-2 right-auto bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
                      <CarouselNext className="right-2 left-auto bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
                    </>
                  )}
                </>
              )}
            </Carousel>
          </div>
        </div>
      </div>

      {/* Enhanced Media Preview Modal */}
      <MediaPreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        items={images}
        currentIndex={currentPreviewIndex}
        onNavigate={handleNavigatePreview}
      />
    </section>
  );
}
