"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Image, Video } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MediaFilters Component for GroupeMBIRim
 *
 * Provides filtering controls for media items
 * Features:
 * - Type-based filtering (all, image, video)
 * - Item count display
 * - Clean UI with icons
 */

interface MediaFiltersProps {
  totalItems: number;
  imageCount: number;
  videoCount: number;
  typeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
  disabled?: boolean;
}

export const MediaFilters: React.FC<MediaFiltersProps> = ({
  totalItems,
  imageCount,
  videoCount,
  typeFilter,
  onFilterChange,
  className,
  disabled = false,
}) => {
  const t = useTranslations("Gallery");

  // Helper function to get singular/plural form
  const getItemText = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : plural;
  };

  return (
    <div
      className={cn(
        "flex gap-4 items-center justify-center md:justify-start",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-600" />
        <label className="text-sm font-medium text-gray-700">
          {t("filters.filterByType")}
        </label>
      </div>

      <Select
        value={typeFilter}
        onValueChange={onFilterChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-48 bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500">
          <SelectValue placeholder={t("filters.allTypes")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm"
                  role="img"
                  aria-label="All types"
                ></div>
                {t("filters.allTypes")} ({totalItems})
              </div>
            </SelectItem>

            <SelectItem value="image" className="cursor-pointer">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="w-4 h-4 text-green-600" />
                {t("filters.imagesOnly")} ({imageCount})
              </div>
            </SelectItem>

            <SelectItem value="video" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-red-600" />
                {t("filters.videosOnly")} ({videoCount})
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
