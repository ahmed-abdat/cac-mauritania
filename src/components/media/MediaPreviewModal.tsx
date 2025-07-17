"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

/**
 * Media Preview Modal Component for GroupeMBIRim
 *
 * Features:
 * - Full-screen image and video preview
 * - Image zoom (0.5x to 5x) with pan/drag functionality
 * - Keyboard navigation (arrows, space, +/-, ESC, M)
 * - Video playback controls
 * - Responsive design with RTL support
 * - Progress indicators
 */

interface MediaItem {
  url: string;
  id: string;
  type: string;
  uniqueId?: string;
}

interface MediaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}) => {
  const t = useTranslations("Gallery");

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentItem = items[currentIndex];

  const navigatePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  const navigateNext = useCallback(() => {
    const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          navigatePrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          navigateNext();
          break;
        case " ":
          e.preventDefault();
          if (currentItem?.type === "video" && videoRef.current) {
            togglePlayPause();
          }
          break;
        case "m":
        case "M":
          e.preventDefault();
          if (currentItem?.type === "video") {
            toggleMute();
          }
          break;
        case "+":
        case "=":
          e.preventDefault();
          zoomIn();
          break;
        case "-":
          e.preventDefault();
          zoomOut();
          break;
        case "0":
          e.preventDefault();
          resetZoom();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    currentItem,
    onClose,
    navigatePrevious,
    navigateNext,
    togglePlayPause,
  ]);

  // Reset state when item changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsPlaying(false);
    setIsDragging(false);
  }, [currentIndex]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!modalRef.current) return;

    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Image pan and zoom handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (currentItem?.type !== "image" || zoom === 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || currentItem?.type !== "image") return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Video event handlers
  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={modalRef}
        className="max-w-none w-screen h-screen p-0 bg-black/95 border-0"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Accessibility */}
        <DialogTitle className="sr-only">Media Preview</DialogTitle>
        <DialogDescription className="sr-only">
          {`Previewing ${
            currentItem.type === "image" ? "image" : "video"
          }. Use arrow keys to navigate.`}
        </DialogDescription>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-4">
            <div className="bg-black/60 text-white px-3 py-1 rounded-md text-sm font-medium border border-white/30 backdrop-blur-sm shadow-lg">
              {currentItem.type === "image"
                ? t("mediaPreview.image")
                : t("mediaPreview.video")}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentItem.type === "image" && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/30 hover:text-white backdrop-blur-sm border border-white/20 transition-all duration-200"
                  onClick={zoomOut}
                  disabled={zoom <= 0.5}
                  title={t("mediaPreview.zoomOut")}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-white text-sm min-w-[4rem] text-center font-medium bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/30 hover:text-white backdrop-blur-sm border border-white/20 transition-all duration-200"
                  onClick={zoomIn}
                  disabled={zoom >= 5}
                  title={t("mediaPreview.zoomIn")}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/30 hover:text-white backdrop-blur-sm border border-white/20 transition-all duration-200"
                  onClick={resetZoom}
                  title={t("mediaPreview.resetZoom")}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </>
            )}

            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/30 hover:text-white backdrop-blur-sm border border-white/20 transition-all duration-200"
              onClick={toggleFullscreen}
              title={t("mediaPreview.toggleFullscreen")}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-red-500/80 hover:text-white backdrop-blur-sm border border-white/20 transition-all duration-200"
              onClick={onClose}
              title={t("mediaPreview.close")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <Button
              variant="secondary"
              onClick={navigatePrevious}
              title={t("mediaPreview.previous")}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-[60] h-14 w-14 rounded-full bg-white/80 text-black shadow-lg backdrop-blur-sm hover:bg-white hover:scale-105 flex items-center justify-center"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>

            <Button
              variant="secondary"
              onClick={navigateNext}
              title={t("mediaPreview.next")}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-[60] h-14 w-14 rounded-full bg-white/80 text-black shadow-lg backdrop-blur-sm hover:bg-white hover:scale-105 flex items-center justify-center"
            >
              <ChevronRight className="h-7 w-7" />
            </Button>
          </>
        )}

        {/* Main Content */}
        <div className="flex items-center justify-center w-full h-full relative">
          <div className="flex items-center justify-center w-full h-full p-16">
            {currentItem.type === "image" ? (
              <div
                ref={imageRef}
                className={cn(
                  "relative max-w-full max-h-full transition-transform duration-200",
                  isDragging
                    ? "cursor-grabbing"
                    : zoom > 1
                    ? "cursor-grab"
                    : "cursor-default"
                )}
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${
                    pan.y / zoom
                  }px)`,
                }}
                onMouseDown={handleMouseDown}
              >
                <Image
                  src={currentItem.url}
                  alt="Preview"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "80vh",
                  }}
                  draggable={false}
                />
              </div>
            ) : (
              <div className="relative">
                <video
                  ref={videoRef}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "80vh",
                  }}
                  src={currentItem.url}
                  controls
                  muted={isMuted}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                />

                {/* Custom Video Controls Overlay (positioned a bit higher to avoid overlap) */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30 shadow-lg">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/30 hover:text-white transition-all duration-200"
                    onClick={togglePlayPause}
                    title={t("mediaPreview.playPause")}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/30 hover:text-white transition-all duration-200"
                    onClick={toggleMute}
                    title={t("mediaPreview.muteUnmute")}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Indicator - Only show for images when multiple items */}
        {items.length > 1 && currentItem.type === "image" && (
          <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-white/40 shadow-lg">
              {currentIndex + 1} {t("mediaPreview.of")} {items.length}
            </div>
          </div>
        )}

        {/* Footer with keyboard shortcuts */}
        <div className="absolute bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="text-center">
            <p className="text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 shadow-lg inline-block">
              {t("mediaPreview.keyboardInstructions")}
              {currentItem.type === "image" && " • +/- to zoom • 0 to reset"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
