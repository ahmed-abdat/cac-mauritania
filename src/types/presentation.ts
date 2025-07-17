export interface Presentation {
  id: string;
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  category: 'ready-construction' | 'regular-construction' | 'renewable-energy' | 'agriculture' | 'animal-development' | 'entrepreneurship-center' | 'conference-hall' | 'charitable-interventions';
  slug: string;
  media: MediaItem[];
  features?: string[];
  services?: string[];
  benefits?: string[];
  isActive: boolean;
  sortOrder: number;
  metadata?: {
    keywords?: string[];
    tags?: string[];
    location?: string;
    duration?: string;
    targetAudience?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaItem {
  url: string;
  id: string;
  name: string;
  type: 'image' | 'video';
  size?: number;
  width?: number;
  height?: number;
  duration?: number; // for videos
  caption?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  alt?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  isPublic: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PresentationCategory {
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
  icon?: string;
  color?: string;
  image?: string;
  presentationCount: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PresentationFilter {
  category?: string;
  isActive?: boolean;
  hasMedia?: boolean;
  tags?: string[];
  location?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export type PresentationCategorySlug = 
  | 'ready-construction'
  | 'regular-construction'
  | 'renewable-energy'
  | 'agriculture'
  | 'animal-development'
  | 'entrepreneurship-center'
  | 'conference-hall'
  | 'charitable-interventions';

export interface PresentationStats {
  totalPresentations: number;
  totalMedia: number;
  categoryCounts: {
    [categorySlug: string]: number;
  };
  recentlyUpdated: Presentation[];
  featuredPresentations: Presentation[];
}