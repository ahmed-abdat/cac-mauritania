export interface ConstructionProduct {
  id: string;
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  description?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  category: 'ready-construction' | 'regular-construction';
  images: {
    name: string;
    url: string;
    id: string;
  }[];
  specifications?: {
    area?: string;
    rooms?: number;
    bathrooms?: number;
    features?: string[];
  };
  price?: {
    amount: number;
    currency: string;
  };
  status: 'available' | 'sold' | 'under-construction';
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConstructionService {
  id: string;
  name: {
    en: string;
    fr: string;
    ar: string;
  };
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  category: 'ready-construction' | 'regular-construction';
  features: string[];
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConstructionProject {
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
  category: 'ready-construction' | 'regular-construction';
  images: {
    name: string;
    url: string;
    id: string;
  }[];
  status: 'planning' | 'in-progress' | 'completed';
  startDate: Date;
  endDate?: Date;
  location: string;
  client?: string;
  specifications: {
    area: string;
    floors: number;
    rooms: number;
    bathrooms: number;
    features: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export type ConstructionCategory = 'ready-construction' | 'regular-construction';

export interface ConstructionFilter {
  category?: ConstructionCategory;
  status?: 'available' | 'sold' | 'under-construction';
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  rooms?: number;
  bathrooms?: number;
}