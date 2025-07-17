"use client";

import React, { useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Eye, ZoomIn, Calendar, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

/**
 * Media Carousel Component for GroupeMBIRim
 *
 * A responsive, accessible carousel for displaying media items with enhanced features:
 * - Image and video support
 * - Preview on hover/click
 * - RTL support
 * - Keyboard navigation
 * - Loading states
 */

export interface MediaItem {
  url: string;
  id: string;
  type: string;
  uniqueId?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  location?: string;
}

interface MediaCarouselProps {
  items: MediaItem[];
  onItemClick?: (item: MediaItem, index: number) => void;
  loading?: boolean;
  className?: string;
  itemClassName?: string;
  showMetadata?: boolean;
  showControls?: boolean;
  autoPlay?: boolean;
  locale?: string;
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  items,
  onItemClick,
  loading = false,
  className,
  itemClassName,
  showMetadata = true,
  showControls = true,
  autoPlay = false,
  locale = "en",
}) => {
  const t = useTranslations("Gallery");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const isRTL = locale === "ar";

  const handleItemClick = (item: MediaItem, index: number) => {
    onItemClick?.(item, index);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-200 animate-pulse" />
                    {showMetadata && (
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className={cn("w-full py-12 text-center", className)}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("states.noMediaFound")}
          </h3>
          <p className="text-gray-600">{t("states.noMediaDescription")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <Carousel
        ref={carouselRef}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card
                className={cn(
                  "overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg",
                  itemClassName
                )}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item, index)}
              >
                <CardContent className="p-0">
                  {/* Media Container */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={item.url}
                      alt={item.title || `Media item ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Media Type Badge */}
                    <div
                      className={cn(
                        "absolute top-3 z-10",
                        isRTL ? "right-3" : "left-3"
                      )}
                    >
                      <Badge
                        variant={
                          item.type === "video" ? "default" : "secondary"
                        }
                        className="bg-black/70 text-white border-0 backdrop-blur-sm"
                      >
                        {item.type === "video" && (
                          <Play className="w-3 h-3 mr-1" />
                        )}
                        {item.type === "image"
                          ? t("mediaPreview.image")
                          : t("mediaPreview.video")}
                      </Badge>
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
                        hoveredItem === item.id && "opacity-100"
                      )}
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="bg-white/90 text-black hover:bg-white transform scale-90 group-hover:scale-100 transition-transform duration-300"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        {t("mediaPreview.image")}
                      </Button>
                    </div>

                    {/* Loading indicator for videos */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metadata Section */}
                  {showMetadata &&
                    (item.title ||
                      item.description ||
                      item.createdAt ||
                      item.location) && (
                      <div className="p-4 space-y-2">
                        {item.title && (
                          <h3 className="font-semibold text-gray-900 line-clamp-1">
                            {item.title}
                          </h3>
                        )}

                        {item.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          {item.createdAt && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(item.createdAt)}
                            </div>
                          )}

                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="line-clamp-1">
                                {item.location}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        {showControls && items.length > 1 && (
          <>
            <CarouselPrevious
              className={cn(
                "bg-white/90 border-0 shadow-lg backdrop-blur-sm hover:bg-white",
                isRTL ? "right-2" : "left-2"
              )}
            />
            <CarouselNext
              className={cn(
                "bg-white/90 border-0 shadow-lg backdrop-blur-sm hover:bg-white",
                isRTL ? "left-2" : "right-2"
              )}
            />
          </>
        )}
      </Carousel>

      {/* Items Counter */}
      {items.length > 0 && (
        <div className="flex items-center justify-center mt-4">
          <Badge variant="outline" className="text-sm">
            {items.length}{" "}
            {items.length === 1 ? t("statistics.item") : t("statistics.items")}
          </Badge>
        </div>
      )}
    </div>
  );
};
