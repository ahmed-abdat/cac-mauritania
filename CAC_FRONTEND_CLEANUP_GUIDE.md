# CAC Frontend Cleanup & Migration Guide

*🧹 Complete guide to transform MBI frontend to CAC frontend matching dashboard requirements*

## Overview

This guide transforms the current **MBI frontend** into a **CAC frontend** that matches the CAC dashboard structure and business requirements.

## Current State Analysis

### 🔍 **MBI Routes to Remove**
Based on the structure, these routes need to be removed:

```
❌ Remove these MBI-specific routes:
├── src/app/[locale]/health/                # Old health products
├── src/app/[locale]/marketplace/           # Old marketplace
├── src/app/[locale]/[slug]/galary/        # Old gallery structure
└── Components referencing MBI branding
```

### 🎯 **CAC Routes to Create**
Replace with CAC-specific routes:

```
✅ Create these CAC routes:
├── src/app/[locale]/construction/          # Construction products
├── src/app/[locale]/gallery/               # Media gallery
├── src/app/[locale]/services/              # Service presentations
├── src/app/[locale]/categories/[slug]/     # Category-based navigation
└── Updated homepage for CAC
```

## Step-by-Step Cleanup Process

### Phase 1: Remove MBI Content

#### 1. Remove Old Routes
```bash
# Remove MBI-specific routes
rm -rf src/app/[locale]/health/
rm -rf src/app/[locale]/marketplace/
rm -rf src/app/[locale]/[slug]/galary/
```

#### 2. Remove Old Components
```bash
# Remove MBI-specific components
rm -f src/components/HealthClient.tsx
rm -f src/components/MarketPlaceProduct.tsx
rm -f src/components/MeillersProducts.tsx  # If MBI-specific
```

#### 3. Remove Old Constants
```typescript
// src/constats/nav-links.ts - Remove MBI links
// Remove these old navigation links:
const OLD_MBI_LINKS = [
  { href: "/health", label: "Health Products" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/meilleurs-produits", label: "Best Products" },
];
```

### Phase 2: Update Configuration

#### 1. Update Site Configuration
```typescript
// src/config/site.ts
export const siteConfig = {
  name: "CAC - مركز الريادة والاستشارات",
  description: {
    en: "CAC - Center for Entrepreneurship and Consulting",
    fr: "CAC - Centre d'entrepreneuriat et de conseil",
    ar: "مركز الريادة والاستشارات - الحلول المبتكرة للأعمال"
  },
  url: "https://cac-mauritania.com",
  ogImage: "/cac-og-image.jpg",
  links: {
    twitter: "https://twitter.com/cac_mauritania",
    github: "https://github.com/cac-mauritania",
  },
  keywords: {
    en: ["CAC", "entrepreneurship", "consulting", "construction", "mauritania"],
    fr: ["CAC", "entrepreneuriat", "conseil", "construction", "mauritanie"],
    ar: ["مركز الريادة", "الاستشارات", "البناء", "موريتانيا"]
  }
};
```

#### 2. Update Navigation Links
```typescript
// src/constats/nav-links.ts
export const navLinks = [
  {
    href: "/",
    label: {
      en: "Home",
      fr: "Accueil", 
      ar: "الرئيسية"
    }
  },
  {
    href: "/construction",
    label: {
      en: "Construction",
      fr: "Construction",
      ar: "البناء والإنشاءات"
    }
  },
  {
    href: "/gallery",
    label: {
      en: "Gallery",
      fr: "Galerie",
      ar: "المعرض"
    }
  },
  {
    href: "/services",
    label: {
      en: "Services",
      fr: "Services",
      ar: "الخدمات"
    }
  },
  {
    href: "/about",
    label: {
      en: "About",
      fr: "À propos",
      ar: "عن الشركة"
    }
  },
  {
    href: "/contact",
    label: {
      en: "Contact",
      fr: "Contact",
      ar: "اتصل بنا"
    }
  }
];
```

### Phase 3: Create CAC-Specific Routes

#### 1. Construction Products Page
```typescript
// src/app/[locale]/construction/page.tsx
import { getConstructionProducts } from "@/lib/firebase-operations";
import { CONSTRUCTION_CATEGORIES } from "@/types/construction";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/filters/CategoryFilter";

interface PageProps {
  params: { locale: string };
  searchParams: { category?: string };
}

export default async function ConstructionPage({ 
  params, 
  searchParams 
}: PageProps) {
  const { locale } = params;
  const { category = "ready-construction" } = searchParams;
  
  const products = await getConstructionProducts(category);
  
  return (
    <div className="construction-page">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {locale === "ar" ? "البناء والإنشاءات" : "Construction"}
        </h1>
        <p className="text-gray-600">
          {locale === "ar" 
            ? "حلول البناء المبتكرة من مركز الريادة والاستشارات"
            : "Innovative construction solutions from CAC"
          }
        </p>
      </header>
      
      <CategoryFilter 
        categories={CONSTRUCTION_CATEGORIES}
        currentCategory={category}
        baseUrl={`/${locale}/construction`}
      />
      
      <ProductGrid products={products} locale={locale} />
    </div>
  );
}

export async function generateStaticParams() {
  return CONSTRUCTION_CATEGORIES.map((category) => ({
    category: category.value,
  }));
}
```

#### 2. Gallery Page
```typescript
// src/app/[locale]/gallery/page.tsx
import { getGalleryItems } from "@/lib/firebase-operations";
import { GALLERY_CATEGORIES } from "@/types/gallery";
import { MediaGrid } from "@/components/media/MediaGrid";
import { CategoryFilter } from "@/components/filters/CategoryFilter";

interface PageProps {
  params: { locale: string };
  searchParams: { category?: string };
}

export default async function GalleryPage({ 
  params, 
  searchParams 
}: PageProps) {
  const { locale } = params;
  const { category = "ready-construction" } = searchParams;
  
  const galleryItems = await getGalleryItems(category);
  
  return (
    <div className="gallery-page">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {locale === "ar" ? "المعرض" : "Gallery"}
        </h1>
        <p className="text-gray-600">
          {locale === "ar" 
            ? "مجموعة من أعمالنا وإنجازاتنا"
            : "Our work and achievements gallery"
          }
        </p>
      </header>
      
      <CategoryFilter 
        categories={GALLERY_CATEGORIES}
        currentCategory={category}
        baseUrl={`/${locale}/gallery`}
      />
      
      <MediaGrid items={galleryItems} locale={locale} />
    </div>
  );
}
```

#### 3. Services Page
```typescript
// src/app/[locale]/services/page.tsx
import { getPresentationItems } from "@/lib/firebase-operations";
import { PRESENTATION_CATEGORIES } from "@/types/presentation";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { CategoryFilter } from "@/components/filters/CategoryFilter";

interface PageProps {
  params: { locale: string };
  searchParams: { category?: string };
}

export default async function ServicesPage({ 
  params, 
  searchParams 
}: PageProps) {
  const { locale } = params;
  const { category = "ready-construction" } = searchParams;
  
  const presentations = await getPresentationItems(category);
  
  return (
    <div className="services-page">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {locale === "ar" ? "خدماتنا" : "Our Services"}
        </h1>
        <p className="text-gray-600">
          {locale === "ar" 
            ? "الخدمات التي نقدمها في مختلف المجالات"
            : "Services we provide across different sectors"
          }
        </p>
      </header>
      
      <CategoryFilter 
        categories={PRESENTATION_CATEGORIES}
        currentCategory={category}
        baseUrl={`/${locale}/services`}
      />
      
      <ServiceGrid items={presentations} locale={locale} />
    </div>
  );
}
```

#### 4. Category Dynamic Pages
```typescript
// src/app/[locale]/categories/[slug]/page.tsx
import { 
  getConstructionProducts, 
  getGalleryItems, 
  getPresentationItems 
} from "@/lib/firebase-operations";
import { GALLERY_CATEGORIES } from "@/types/gallery";
import { CategoryPageContent } from "@/components/categories/CategoryPageContent";
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
  
  // Fetch all data for this category
  const [construction, gallery, presentations] = await Promise.all([
    getConstructionProducts(slug),
    getGalleryItems(slug),
    getPresentationItems(slug),
  ]);
  
  return (
    <CategoryPageContent
      category={category}
      construction={construction}
      gallery={gallery}
      presentations={presentations}
      locale={locale}
    />
  );
}

export async function generateStaticParams() {
  return GALLERY_CATEGORIES.map((category) => ({
    slug: category.key,
  }));
}
```

### Phase 4: Update Components

#### 1. Update Header Component
```typescript
// src/components/header/header.tsx
import { navLinks } from "@/constats/nav-links";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/cac-logo.png" 
              alt="CAC Logo" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl">CAC</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.label[locale as keyof typeof link.label]}
              </Link>
            ))}
          </div>
          
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
```

#### 2. Update Homepage
```typescript
// src/app/[locale]/page.tsx
import { getAllCategories } from "@/lib/firebase-operations";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ContactSection } from "@/components/home/ContactSection";

interface PageProps {
  params: { locale: string };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = params;
  const categories = await getAllCategories();
  
  return (
    <div className="homepage">
      <HeroSection locale={locale} />
      <ServicesSection categories={categories} locale={locale} />
      <StatsSection categories={categories} locale={locale} />
      <ContactSection locale={locale} />
    </div>
  );
}
```

#### 3. Create New Components

##### Category Filter Component
```typescript
// src/components/filters/CategoryFilter.tsx
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface CategoryFilterProps {
  categories: Array<{
    key: string;
    label: string;
    value?: string;
  }>;
  currentCategory: string;
  baseUrl: string;
}

export function CategoryFilter({ 
  categories, 
  currentCategory, 
  baseUrl 
}: CategoryFilterProps) {
  return (
    <div className="category-filter mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const categoryValue = category.value || category.key;
          const isActive = currentCategory === categoryValue;
          
          return (
            <Link
              key={categoryValue}
              href={`${baseUrl}?category=${categoryValue}`}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {category.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

##### Product Grid Component
```typescript
// src/components/products/ProductGrid.tsx
import { ConstructionProduct } from "@/types/construction";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: ConstructionProduct[];
  locale: string;
}

export function ProductGrid({ products, locale }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {locale === "ar" ? "لا توجد منتجات في هذه الفئة" : "No products in this category"}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
        />
      ))}
    </div>
  );
}
```

### Phase 5: Update Translations

#### 1. Update English Translations
```json
// messages/en.json
{
  "Navigation": {
    "home": "Home",
    "construction": "Construction",
    "gallery": "Gallery",
    "services": "Services",
    "about": "About",
    "contact": "Contact"
  },
  "Homepage": {
    "title": "CAC - Center for Entrepreneurship and Consulting",
    "subtitle": "Innovative solutions for business growth",
    "description": "We provide comprehensive consulting services across construction, renewable energy, agriculture, and business development."
  },
  "Construction": {
    "title": "Construction & Infrastructure",
    "readyConstruction": "Ready Construction",
    "regularConstruction": "Regular Construction",
    "description": "Professional construction solutions"
  },
  "Gallery": {
    "title": "Our Work Gallery",
    "description": "Explore our projects and achievements"
  },
  "Services": {
    "title": "Our Services",
    "description": "Comprehensive consulting services"
  }
}
```

#### 2. Update Arabic Translations
```json
// messages/ar.json
{
  "Navigation": {
    "home": "الرئيسية",
    "construction": "البناء والإنشاءات",
    "gallery": "المعرض",
    "services": "الخدمات",
    "about": "عن الشركة",
    "contact": "اتصل بنا"
  },
  "Homepage": {
    "title": "مركز الريادة والاستشارات",
    "subtitle": "حلول مبتكرة لنمو الأعمال",
    "description": "نقدم خدمات استشارية شاملة في البناء والطاقة المتجددة والزراعة وتطوير الأعمال"
  },
  "Construction": {
    "title": "البناء والإنشاءات",
    "readyConstruction": "البناء الجاهز",
    "regularConstruction": "البناء العادي",
    "description": "حلول بناء احترافية"
  },
  "Gallery": {
    "title": "معرض أعمالنا",
    "description": "استكشف مشاريعنا وإنجازاتنا"
  },
  "Services": {
    "title": "خدماتنا",
    "description": "خدمات استشارية شاملة"
  }
}
```

### Phase 6: Update Assets

#### 1. Replace Logo and Images
```bash
# Replace MBI assets with CAC assets
# public/
├── cac-logo.png          # New CAC logo
├── cac-og-image.jpg      # New OG image
├── hero-cac.jpg          # New hero image
└── about-cac.jpg         # New about image
```

#### 2. Update Favicon
```bash
# Replace favicon with CAC branding
cp cac-favicon.ico public/favicon.ico
```

### Phase 7: Environment Variables

Update environment variables to match CAC dashboard:

```bash
# .env.local
# Firebase (same as CAC dashboard)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyA__b-ZYeaxGSiATd7EJrPwtiky4U3P_Eo"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="cac-mauritania.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="cac-mauritania"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="cac-mauritania.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1052004394543"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1052004394543:web:19f763fe3bfb021ad708da"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-DYM12X3FQD"

# ImageKit (same as CAC dashboard)
NEXT_PUBLIC_IMAGEKIT_ID=uqf7kvhke
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/uqf7kvhke

# Email (CAC-specific)
EMAIL_USER=info@cac-mauritania.com
EMAIL_PASS=your-app-password
PUBLIC_URL=https://cac-mauritania.com
```

## Implementation Script

Here's a bash script to automate the cleanup:

```bash
#!/bin/bash
# cac-cleanup.sh

echo "🧹 Starting CAC Frontend Cleanup..."

# Remove old MBI routes
echo "Removing old MBI routes..."
rm -rf src/app/[locale]/health/
rm -rf src/app/[locale]/marketplace/
rm -rf src/app/[locale]/[slug]/galary/

# Remove old MBI components
echo "Removing old MBI components..."
rm -f src/components/HealthClient.tsx
rm -f src/components/MarketPlaceProduct.tsx

# Create new CAC directories
echo "Creating new CAC directories..."
mkdir -p src/app/[locale]/construction/
mkdir -p src/app/[locale]/gallery/
mkdir -p src/app/[locale]/services/
mkdir -p src/app/[locale]/categories/[slug]/
mkdir -p src/components/products/
mkdir -p src/components/services/
mkdir -p src/components/filters/
mkdir -p src/components/categories/

echo "✅ Cleanup completed! Please implement the new components."
```

## Testing Checklist

After cleanup, test these areas:

- [ ] All new routes load correctly
- [ ] Navigation links work
- [ ] Firebase integration works
- [ ] ImageKit optimization works
- [ ] Translations display correctly
- [ ] Mobile responsiveness
- [ ] SEO metadata updated
- [ ] No broken links or components
- [ ] Category filtering works
- [ ] Gallery displays correctly

## Final Notes

This cleanup transforms your MBI frontend into a proper CAC frontend that:

✅ **Matches CAC dashboard structure**
✅ **Uses CAC business categories**
✅ **Integrates with CAC Firebase data**
✅ **Provides CAC-specific navigation**
✅ **Removes all MBI references**
✅ **Maintains multilingual support**
✅ **Keeps performance optimizations**

The cleaned frontend will work seamlessly with your CAC dashboard!