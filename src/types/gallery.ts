export interface GalleryItem {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  category: 'ready-construction' | 'regular-construction' | 'renewable-energy' | 'agriculture' | 'animal-development' | 'entrepreneurship-center' | 'conference-hall' | 'charitable-interventions';
  title?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  description?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  tags?: string[];
  size?: number;
  width?: number;
  height?: number;
  duration?: number; // for videos
  isPublic: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryFilter {
  category?: string;
  type?: 'image' | 'video';
  isPublic?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface GalleryCategory {
  id: string;
  name: {
    en: string;
    fr: string;
    ar: string;
  };
  slug: string;
  description?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  image?: string;
  color?: string;
  icon?: string;
  itemCount: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryUpload {
  file: File;
  category: string;
  title?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  description?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  tags?: string[];
  isPublic?: boolean;
  isFeatured?: boolean;
}

export interface GalleryStats {
  totalItems: number;
  totalImages: number;
  totalVideos: number;
  categoryCounts: {
    [categorySlug: string]: number;
  };
  recentUploads: GalleryItem[];
  featuredItems: GalleryItem[];
}

export type GallaryCategorySlug = 
  | 'ready-construction'
  | 'regular-construction'
  | 'renewable-energy'
  | 'agriculture'
  | 'animal-development'
  | 'entrepreneurship-center'
  | 'conference-hall'
  | 'charitable-interventions';

export interface MediaDisplayProps {
  item: GalleryItem;
  showDetails?: boolean;
  onImageClick?: (item: GalleryItem) => void;
}

export interface MediaGalleryProps {
  items: GalleryItem[];
  category?: string;
  title?: string;
  showFilter?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
}