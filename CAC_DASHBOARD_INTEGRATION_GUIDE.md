# CAC Dashboard Integration Guide

*🔗 Complete guide for integrating CAC Frontend with CAC Dashboard seamlessly*

## Overview

This guide ensures the **CAC Frontend** (public website) works seamlessly with the **CAC Dashboard** (admin panel) by sharing types, data structures, and functionality.

## Project Relationship

```
CAC Dashboard (../cac-dashboard/)
├── Admin interface
├── Content management
├── Firebase operations
├── Data structure definitions
└── Business logic
            ↓
        Firebase
            ↓
CAC Frontend (this project)
├── Public website
├── Content display
├── Shared types/interfaces
└── Compatible data consumption
```

## Shared Data Structures

### 1. Construction Types

Copy these types from the dashboard to ensure compatibility:

```typescript
// src/types/construction.ts
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
  category: string;
  images: {
    name: string;
    url: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConstructionProductDisplay {
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
  images: {
    name: string;
    url: string;
  }[];
  id?: string;
  category?: string;
}

// Construction categories (must match dashboard)
export const CONSTRUCTION_CATEGORIES = [
  { value: "ready-construction", label: "البناء الجاهز" },
  { value: "regular-construction", label: "البناء العادي" },
] as const;

export type ConstructionCategory = (typeof CONSTRUCTION_CATEGORIES)[number]["value"];
```

### 2. Gallery Types

```typescript
// src/types/gallery.ts
export interface GalleryItem {
  id: string;
  url: string;
  type: "image" | "video";
  file?: File;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
  size?: number;
  name?: string;
}

export interface GalleryCategory {
  key: string;
  label: string;
  description?: string;
}

export interface GalleryStats {
  totalItems: number;
  imageCount: number;
  videoCount: number;
}

// Gallery categories (must match dashboard)
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    key: "ready-construction",
    label: "البناء الجاهز",
    description: "مشاريع البناء الجاهز والمسبق الصنع",
  },
  {
    key: "regular-construction",
    label: "البناء العادي",
    description: "مشاريع البناء التقليدي والإنشاءات",
  },
  {
    key: "renewable-energy",
    label: "الطاقة المتجددة",
    description: "حلول الطاقة المتجددة والمستدامة",
  },
  {
    key: "agriculture",
    label: "الزراعة",
    description: "الزراعة والإنتاج النباتي",
  },
  {
    key: "animal-development",
    label: "التنمية الحيوانيّة",
    description: "التنمية الحيوانية والإنتاج الحيواني",
  },
  {
    key: "entrepreneurship-center",
    label: "مركز الريادة لتبادل المعلومات و الخبرات",
    description: "مركز الريادة وتبادل المعلومات والخبرات",
  },
  {
    key: "conference-hall",
    label: "قاعة للمؤتمرات و الملتقيات و الندوات العلمية و الثقافية",
    description: "قاعة المؤتمرات والملتقيات والندوات العلمية والثقافية",
  },
  {
    key: "charitable-interventions",
    label: "التدخلات الخيرية ( المجلس العلمي )",
    description: "جانب التدخلات الخيرية والمجلس العلمي",
  },
] as const;

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/mov",
  "video/avi",
];
```

### 3. Presentation Types

```typescript
// src/types/presentation.ts
export interface PresentationItem {
  id: string;
  url: string;
  type: "image" | "video";
  file?: File;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
  size?: number;
  name?: string;
}

export interface PresentationCategory {
  key: string;
  label: string;
  description?: string;
}

export interface PresentationStats {
  totalItems: number;
  imageCount: number;
  videoCount: number;
}

// Presentation categories (same as gallery)
export const PRESENTATION_CATEGORIES: PresentationCategory[] = [
  {
    key: "ready-construction",
    label: "البناء الجاهز",
    description: "مشاريع البناء الجاهز والمسبق الصنع",
  },
  {
    key: "regular-construction",
    label: "البناء العادي",
    description: "مشاريع البناء التقليدي والإنشاءات",
  },
  {
    key: "renewable-energy",
    label: "الطاقة المتجددة",
    description: "حلول الطاقة المتجددة والمستدامة",
  },
  {
    key: "agriculture",
    label: "الزراعة",
    description: "الزراعة والإنتاج النباتي",
  },
  {
    key: "animal-development",
    label: "التنمية الحيوانيّة",
    description: "التنمية الحيوانية والإنتاج الحيواني",
  },
  {
    key: "entrepreneurship-center",
    label: "مركز الريادة لتبادل المعلومات و الخبرات",
    description: "مركز الريادة وتبادل المعلومات والخبرات",
  },
  {
    key: "conference-hall",
    label: "قاعة للمؤتمرات و الملتقيات و الندوات العلمية و الثقافية",
    description: "قاعة المؤتمرات والملتقيات والندوات العلمية والثقافية",
  },
  {
    key: "charitable-interventions",
    label: "التدخلات الخيرية ( المجلس العلمي )",
    description: "جانب التدخلات الخيرية والمجلس العلمي",
  },
] as const;
```

## Firebase Integration

### 1. Firebase Configuration

Ensure the frontend uses the same Firebase configuration as the dashboard:

```typescript
// src/config/firebase.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, app, db, storage };
```

### 2. Data Fetching Functions

Create functions that match the dashboard's data structure:

```typescript
// src/lib/firebase-operations.ts
import { db } from "@/config/firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { ConstructionProduct, GalleryItem, PresentationItem } from "@/types";

// Construction products (matches dashboard structure)
export async function getConstructionProducts(
  category: string
): Promise<ConstructionProduct[]> {
  try {
    const collectionRef = collection(
      db,
      `construction-projects/${category}/categoryProduct`
    );
    const querySnapshot = await getDocs(
      query(collectionRef, orderBy("createdAt", "desc"))
    );
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ConstructionProduct[];
  } catch (error) {
    console.error("Error fetching construction products:", error);
    return [];
  }
}

// Gallery items (matches dashboard structure)
export async function getGalleryItems(
  category: string
): Promise<GalleryItem[]> {
  try {
    const docRef = doc(db, "galarys", category);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data()?.media || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

// Presentation items (matches dashboard structure)
export async function getPresentationItems(
  category: string
): Promise<PresentationItem[]> {
  try {
    const docRef = doc(db, "presentations", category);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data()?.media || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching presentation items:", error);
    return [];
  }
}

// Get all categories with item counts
export async function getAllCategories() {
  const categories = [];
  
  for (const category of GALLERY_CATEGORIES) {
    const galleryItems = await getGalleryItems(category.key);
    const presentationItems = await getPresentationItems(category.key);
    const constructionItems = await getConstructionProducts(category.key);
    
    categories.push({
      ...category,
      galleryCount: galleryItems.length,
      presentationCount: presentationItems.length,
      constructionCount: constructionItems.length,
      totalItems: galleryItems.length + presentationItems.length + constructionItems.length,
    });
  }
  
  return categories;
}
```

## ImageKit Integration

### 1. ImageKit Loader

Copy the same ImageKit loader from the dashboard:

```javascript
// lib/imageKitLoader.js
"use client";

const IK_ID = process.env.NEXT_PUBLIC_IMAGEKIT_ID;
const DEFAULT_QUALITY = 80;
const DEFAULT_FORMAT = "webp";

export default function imageKitLoader({
  src,
  width,
  quality = DEFAULT_QUALITY,
}) {
  // Don't transform SVG files
  if (src.endsWith(".svg")) {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  }

  // For local images
  if (src.startsWith("/")) {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  }

  // Calculate optimal quality
  const optimizedQuality = getOptimalQuality(width, quality);

  // Performance optimization flags
  const performanceFlags = [
    `f-${DEFAULT_FORMAT}`,
    width > 800 ? "pr-true" : "",
    `q-${optimizedQuality}`,
    "ik-cache=604800",
  ]
    .filter(Boolean)
    .join(",");

  // Handle R2 Storage URLs
  if (src.includes("cacmauritanie.mr") || src.includes("r2.dev")) {
    let imagePath = src;
    
    if (src.includes("cacmauritanie.mr")) {
      imagePath = src.replace("https://cacmauritanie.mr/", "");
    } else if (src.includes("r2.dev")) {
      imagePath = src.split("r2.dev/")[1];
    }
    
    return `https://ik.imagekit.io/${IK_ID}/${imagePath}`;
  }

  // Handle Firebase Storage URLs
  if (src.includes("firebasestorage.googleapis.com")) {
    const encoded = src.split("/o/")[1].split("?")[0];
    return `https://ik.imagekit.io/${IK_ID}/${encoded}?alt=media&tr=w-${width},${performanceFlags}`;
  }

  // Default ImageKit URL
  return `https://ik.imagekit.io/${IK_ID}/tr:w-${width},${performanceFlags}/${src}`;
}

function getOptimalQuality(width, baseQuality) {
  if (width > 1200) return Math.min(baseQuality, 85);
  if (width > 800) return Math.min(baseQuality, 80);
  if (width > 400) return Math.min(baseQuality, 75);
  return Math.min(baseQuality, 70);
}
```

### 2. Next.js Image Configuration

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/imageKitLoader.js',
    domains: [
      'ik.imagekit.io',
      'firebasestorage.googleapis.com',
      'cacmauritanie.mr',
    ],
  },
};

export default nextConfig;
```

## Component Integration

### 1. Product Display Component

```typescript
// src/components/products/ProductDisplay.tsx
import { ConstructionProduct } from "@/types/construction";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ProductDisplayProps {
  product: ConstructionProduct;
  locale: string;
}

export function ProductDisplay({ product, locale }: ProductDisplayProps) {
  const t = useTranslations("Product");
  
  // Get localized content
  const title = product.title[locale as keyof typeof product.title] || product.title.ar;
  const description = product.description?.[locale as keyof typeof product.description] || product.description?.ar;
  
  return (
    <div className="product-display">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={image.url}
              alt={image.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {product.category}
        </span>
      </div>
    </div>
  );
}
```

### 2. Gallery Display Component

```typescript
// src/components/gallery/GalleryDisplay.tsx
import { GalleryItem } from "@/types/gallery";
import Image from "next/image";
import { useState } from "react";

interface GalleryDisplayProps {
  items: GalleryItem[];
  category: string;
}

export function GalleryDisplay({ items, category }: GalleryDisplayProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  return (
    <div className="gallery-display">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSelectedItem(item)}
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={item.name || "Gallery item"}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-full object-cover rounded-lg"
                muted
                preload="metadata"
              />
            )}
            
            {/* Type indicator */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {item.type}
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal for selected item */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedItem(null)}
        >
          <div className="max-w-4xl max-h-4xl p-4">
            {selectedItem.type === "image" ? (
              <Image
                src={selectedItem.url}
                alt={selectedItem.name || "Gallery item"}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={selectedItem.url}
                controls
                className="max-w-full max-h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

### 3. Category Navigation

```typescript
// src/components/navigation/CategoryNav.tsx
import { GALLERY_CATEGORIES } from "@/types/gallery";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface CategoryNavProps {
  locale: string;
  currentCategory?: string;
}

export function CategoryNav({ locale, currentCategory }: CategoryNavProps) {
  const t = useTranslations("Categories");
  
  return (
    <nav className="category-nav">
      <ul className="flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((category) => (
          <li key={category.key}>
            <Link
              href={`/${locale}/category/${category.key}`}
              className={`
                inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  currentCategory === category.key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

## Page Integration

### 1. Dynamic Category Page

```typescript
// src/app/[locale]/category/[slug]/page.tsx
import { getConstructionProducts, getGalleryItems, getPresentationItems } from "@/lib/firebase-operations";
import { ProductDisplay } from "@/components/products/ProductDisplay";
import { GalleryDisplay } from "@/components/gallery/GalleryDisplay";
import { GALLERY_CATEGORIES } from "@/types/gallery";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, slug } = params;
  
  // Validate category
  const category = GALLERY_CATEGORIES.find(cat => cat.key === slug);
  if (!category) {
    notFound();
  }
  
  // Fetch data from all sources
  const [constructionProducts, galleryItems, presentationItems] = await Promise.all([
    getConstructionProducts(slug),
    getGalleryItems(slug),
    getPresentationItems(slug),
  ]);
  
  return (
    <div className="category-page">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.label}</h1>
        <p className="text-gray-600">{category.description}</p>
      </header>
      
      {/* Construction Products */}
      {constructionProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">المنتجات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constructionProducts.map((product) => (
              <ProductDisplay
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* Gallery */}
      {galleryItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">المعرض</h2>
          <GalleryDisplay items={galleryItems} category={slug} />
        </section>
      )}
      
      {/* Presentations */}
      {presentationItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">العروض التقديمية</h2>
          <GalleryDisplay items={presentationItems} category={slug} />
        </section>
      )}
    </div>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  return GALLERY_CATEGORIES.map((category) => ({
    slug: category.key,
  }));
}
```

### 2. Homepage Integration

```typescript
// src/app/[locale]/page.tsx
import { getAllCategories } from "@/lib/firebase-operations";
import { CategoryNav } from "@/components/navigation/CategoryNav";
import Link from "next/link";

interface PageProps {
  params: { locale: string };
}

export default async function Homepage({ params }: PageProps) {
  const { locale } = params;
  const categories = await getAllCategories();
  
  return (
    <div className="homepage">
      <section className="hero mb-12">
        <h1 className="text-4xl font-bold mb-4 text-center">
          مركز الريادة والاستشارات
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
          نقدم أفضل الحلول في البناء والإنشاءات والطاقة المتجددة والزراعة
        </p>
      </section>
      
      <section className="categories">
        <h2 className="text-2xl font-semibold mb-6">خدماتنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={`/${locale}/category/${category.key}`}
              className="category-card block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{category.label}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>المنتجات: {category.constructionCount}</span>
                <span>المعرض: {category.galleryCount}</span>
                <span>العروض: {category.presentationCount}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
```

## Environment Variables

Ensure the frontend has the same environment variables as the dashboard:

```bash
# .env.local
# Firebase Configuration (same as dashboard)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyA__b-ZYeaxGSiATd7EJrPwtiky4U3P_Eo"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="cac-mauritania.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="cac-mauritania"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="cac-mauritania.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1052004394543"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1052004394543:web:19f763fe3bfb021ad708da"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-DYM12X3FQD"

# ImageKit Configuration (same as dashboard)
NEXT_PUBLIC_IMAGEKIT_ID=uqf7kvhke
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/uqf7kvhke
IMAGEKIT_PUBLIC_KEY=public_cD52UpAJ0KrDKv5ye1WuSZ3cscQ=
IMAGEKIT_PRIVATE_KEY=private_AFjDfMqgDuEINQ3nNCXYHXyrtJ4=

# Email Configuration (frontend-specific)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PUBLIC_URL=http://localhost:3000
```

## Package.json Updates

Add any missing dependencies that are in the dashboard:

```json
{
  "dependencies": {
    "firebase": "^10.8.0",
    "@aws-sdk/client-s3": "^3.846.0",
    "react-dropzone": "^14.2.3",
    "react-hook-form": "^7.52.1",
    "zod": "^3.23.8",
    "sonner": "^1.5.0"
  }
}
```

## Testing Integration

Create tests to ensure the integration works:

```typescript
// __tests__/integration.test.ts
import { getConstructionProducts, getGalleryItems } from "@/lib/firebase-operations";
import { GALLERY_CATEGORIES } from "@/types/gallery";

describe("Dashboard Integration", () => {
  test("should fetch construction products", async () => {
    const products = await getConstructionProducts("ready-construction");
    expect(Array.isArray(products)).toBe(true);
  });
  
  test("should fetch gallery items", async () => {
    const items = await getGalleryItems("ready-construction");
    expect(Array.isArray(items)).toBe(true);
  });
  
  test("should have matching categories", () => {
    expect(GALLERY_CATEGORIES).toBeDefined();
    expect(GALLERY_CATEGORIES.length).toBeGreaterThan(0);
  });
});
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Firebase project matches dashboard
- [ ] ImageKit configuration matches dashboard
- [ ] Types and interfaces synchronized
- [ ] Data fetching functions tested
- [ ] Image optimization working
- [ ] Category navigation functional
- [ ] All pages load correctly
- [ ] Mobile responsiveness verified
- [ ] SEO metadata configured

## Maintenance

### Keeping in Sync

1. **When dashboard types change**: Update frontend types
2. **When categories are added**: Update frontend category constants
3. **When Firebase structure changes**: Update frontend data functions
4. **When ImageKit config changes**: Update frontend loader

### Regular Updates

- Review dashboard changes monthly
- Test integration after dashboard updates
- Update shared types when needed
- Monitor Firebase usage across both projects

---

This integration guide ensures your CAC Frontend works seamlessly with your CAC Dashboard, sharing the same data structures, Firebase configuration, and business logic while providing a great public-facing experience.