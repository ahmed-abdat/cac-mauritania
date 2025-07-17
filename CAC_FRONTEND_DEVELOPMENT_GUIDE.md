# CAC Frontend Development Guide

*🌐 Comprehensive guide for the CAC multilingual business website frontend*

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Implementation](#architecture--implementation)
3. [Quick Development Guide](#quick-development-guide)
4. [Internationalization (i18n)](#internationalization-i18n)
5. [Component System](#component-system)
6. [Best Practices](#best-practices)
7. [Integration with Admin Dashboard](#integration-with-admin-dashboard)

---

## Project Overview

### 🎯 **Project Purpose**
**CAC Customer-Facing Website** - A multilingual business website showcasing CAC's services, products, and company information.

### 🔗 **Relationship to Admin Dashboard**
- **Frontend**: Customer-facing website (this project)
- **Backend**: Admin dashboard (`../cac-dashboard/`) for content management
- **Data Flow**: Admin dashboard manages content → Frontend displays content

### 📊 **Current Status**
- ✅ **Fully functional** multilingual website
- ✅ **Next.js 15** with App Router
- ✅ **3 languages**: English, French, Arabic (RTL)
- ✅ **Modern UI/UX** with animations
- ✅ **Email system** with professional templates
- ✅ **Advanced media gallery** with filtering

### 🛠 **Tech Stack**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn UI + Radix UI
- **Internationalization**: next-intl with locales ["en", "fr", "ar"]
- **Database**: Firebase Firestore (same as admin dashboard)
- **Email**: Nodemailer with Gmail SMTP
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod validation

---

## Architecture & Implementation

### 🏗 **Project Structure**

```
src/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── [slug]/           # Dynamic product/service pages
│   │   │   └── galary/       # Gallery pages
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── health/           # Health/Construction products
│   │   ├── marketplace/      # Marketplace products
│   │   └── layout.tsx        # Locale-specific layout
│   ├── api/                  # API routes
│   ├── font/                 # Custom fonts
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # Shadcn UI components
│   ├── home/                 # Homepage sections
│   ├── header/               # Navigation components
│   ├── media/                # Advanced gallery components
│   ├── magicui/              # Magic UI animations
│   └── products/             # Product components
├── config/                   # Configuration files
├── constats/                 # Constants and static data
├── hooks/                    # Custom React hooks
├── i18n/                     # Internationalization setup
├── types/                    # TypeScript definitions
└── utils/                    # Utilities and templates
```

### 🔄 **Data Flow Architecture**

```
Admin Dashboard → Firebase → Frontend Website
     ↓               ↓            ↓
  Content Mgmt   Data Storage  Public Display
   (Arabic)      (Firestore)   (Multi-lang)
```

### 🌐 **Internationalization Architecture**

```typescript
// Route structure
/en/about          // English
/fr/about          // French  
/ar/about          // Arabic (RTL)

// Translation files
messages/
├── en.json        // English translations
├── fr.json        // French translations
└── ar.json        // Arabic translations
```

### 📱 **Page Types**

#### **Static Pages**
- **Homepage** (`/[locale]/page.tsx`) - Company overview
- **About** (`/[locale]/about/page.tsx`) - Company information
- **Contact** (`/[locale]/contact/page.tsx`) - Contact form

#### **Dynamic Pages**
- **Product Pages** (`/[locale]/[slug]/page.tsx`) - Product details
- **Gallery Pages** (`/[locale]/[slug]/galary/page.tsx`) - Product galleries
- **Health Products** (`/[locale]/health/[productId]/page.tsx`) - Construction products
- **Marketplace** (`/[locale]/marketplace/[productId]/page.tsx`) - Marketplace items

---

## Quick Development Guide

### 🚀 **Development Setup**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### 🎨 **Adding New Pages**

#### **1. Static Page**
```typescript
// src/app/[locale]/new-page/page.tsx
import { useTranslations } from 'next-intl';

export default function NewPage() {
  const t = useTranslations('NewPage');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

#### **2. Dynamic Page**
```typescript
// src/app/[locale]/[slug]/new-section/page.tsx
interface Props {
  params: { locale: string; slug: string };
}

export default function NewSection({ params }: Props) {
  const { locale, slug } = params;
  
  return (
    <div>
      <h1>New Section for {slug}</h1>
      {/* Dynamic content */}
    </div>
  );
}
```

### 🔧 **Modifying Existing Components**

#### **A. Homepage Sections**
```typescript
// src/components/home/
├── Hero.tsx              # Main hero section
├── Features.tsx          # Features showcase
├── OurProducts.tsx       # Products section
├── TrustedCompanies.tsx  # Company logos
└── MeillersProducts.tsx  # Best products
```

#### **B. Navigation**
```typescript
// src/components/header/
├── header.tsx           # Main header
├── NavMenus.tsx         # Navigation menus
├── NavButton.tsx        # Navigation buttons
├── local-switcher.tsx   # Language switcher
└── mobile/
    └── MobileNav.tsx    # Mobile navigation
```

#### **C. Media Gallery**
```typescript
// src/components/media/
├── MediaGallery.tsx     # Main gallery
├── MediaPreviewModal.tsx # Modal with zoom
├── MediaCarousel.tsx    # Carousel component
└── MediaFilters.tsx     # Filtering options
```

### 🌍 **Adding New Languages**

#### **1. Update i18n Configuration**
```typescript
// src/i18n/routing.ts
export const locales = ['en', 'fr', 'ar', 'es'] as const; // Add 'es'
export const defaultLocale = 'en' as const;
```

#### **2. Create Translation File**
```json
// messages/es.json
{
  "Homepage": {
    "title": "Título en español",
    "description": "Descripción en español"
  }
}
```

#### **3. Add Flag Icon**
```typescript
// public/flags/es.svg
// Add Spanish flag SVG
```

### 🎯 **Customizing for CAC Business**

#### **A. Update Company Information**
```typescript
// src/config/site.ts
export const siteConfig = {
  name: "CAC - Center for Entrepreneurship and Consulting",
  description: "CAC business description",
  url: "https://cac-website.com",
  // Update all company details
};
```

#### **B. Update Business Categories**
```typescript
// src/constats/nav-links.ts
export const navLinks = [
  { href: "/ready-construction", label: "البناء الجاهز" },
  { href: "/regular-construction", label: "البناء العادي" },
  { href: "/renewable-energy", label: "الطاقة المتجددة" },
  // Add CAC-specific navigation
];
```

#### **C. Update Product Categories**
```typescript
// src/types/product.ts
export interface ProductCategory {
  id: string;
  name: {
    en: string;
    fr: string;
    ar: string;
  };
  slug: string;
}

// Update with CAC categories
export const CAC_CATEGORIES: ProductCategory[] = [
  {
    id: "ready-construction",
    name: {
      en: "Ready Construction",
      fr: "Construction Prête",
      ar: "البناء الجاهز"
    },
    slug: "ready-construction"
  },
  // Add other CAC categories
];
```

---

## Internationalization (i18n)

### 🌐 **Language Support**

#### **Supported Languages**
- **English** (en) - Default
- **French** (fr) - Secondary
- **Arabic** (ar) - RTL support

#### **RTL (Right-to-Left) Support**
```typescript
// Automatic RTL detection
const isRTL = locale === 'ar';

// Layout automatically applies dir="rtl"
<html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
```

### 📝 **Translation Patterns**

#### **Basic Translation**
```typescript
import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations('ComponentName');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

#### **Server Component Translation**
```typescript
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
  const t = await getTranslations('ComponentName');
  
  return <h1>{t('title')}</h1>;
}
```

#### **Dynamic Translation**
```typescript
// With variables
const t = useTranslations('Messages');
const message = t('welcome', { name: 'Ahmed' });

// With rich text
const richText = t.rich('description', {
  bold: (chunks) => <strong>{chunks}</strong>
});
```

### 🔗 **Localized Navigation**

#### **Link Component**
```typescript
import { Link } from '@/navigation';

// Automatically adds locale prefix
<Link href="/about">About</Link>
// Renders: /en/about, /fr/about, /ar/about
```

#### **Programmatic Navigation**
```typescript
import { useRouter } from '@/navigation';

const router = useRouter();
router.push('/contact'); // Respects current locale
```

---

## Component System

### 🎨 **UI Component Hierarchy**

```
Base Components (Shadcn UI)
├── Button, Input, Card, etc.
│
Business Components
├── Header, Footer, Navigation
│
Feature Components
├── MediaGallery, ProductListing
│
Page Components
├── Homepage, About, Contact
│
Layout Components
└── RootLayout, LocaleLayout
```

### 🧩 **Component Patterns**

#### **1. Server Components (Default)**
```typescript
// For static content and data fetching
export default async function ProductPage({ params }: Props) {
  const product = await fetchProduct(params.slug);
  
  return (
    <div>
      <h1>{product.title}</h1>
      <ProductDetails product={product} />
    </div>
  );
}
```

#### **2. Client Components**
```typescript
"use client";

// For interactivity
export function InteractiveComponent() {
  const [state, setState] = useState();
  
  return (
    <button onClick={() => setState(!state)}>
      {state ? 'Active' : 'Inactive'}
    </button>
  );
}
```

#### **3. Shared Components**
```typescript
// Reusable across pages
export function ProductCard({ product }: Props) {
  const t = useTranslations('Product');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t('description')}</p>
      </CardContent>
    </Card>
  );
}
```

### 🎭 **Animation Components**

#### **Magic UI Components**
```typescript
// src/components/magicui/
├── animated-gradient-text.tsx
├── box-reveal.tsx
├── meteors.tsx
├── shimmer-button.tsx
└── word-fade-in.tsx
```

#### **Usage Example**
```typescript
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';

<AnimatedGradientText>
  Welcome to CAC
</AnimatedGradientText>
```

---

## Best Practices

### 🏆 **Development Best Practices**

#### **1. TypeScript Usage**
```typescript
// ✅ GOOD - Strict typing
interface ProductProps {
  product: {
    id: string;
    title: string;
    description: string;
    images: string[];
  };
  locale: string;
}

// ❌ BAD - Avoid any
function Component(props: any) { ... }
```

#### **2. Internationalization**
```typescript
// ✅ GOOD - Always use translations
const t = useTranslations('HomePage');
return <h1>{t('title')}</h1>;

// ❌ BAD - Never hardcode text
return <h1>Welcome to CAC</h1>;
```

#### **3. Performance Optimization**
```typescript
// ✅ GOOD - Minimize "use client"
export default function ServerComponent() {
  // Server-rendered by default
}

// ✅ GOOD - Use dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

### 🔧 **Code Organization**

#### **1. File Naming**
```
✅ GOOD:
- PascalCase for components: ContactForm.tsx
- kebab-case for pages: about-us/page.tsx
- camelCase for utilities: formatDate.ts

❌ BAD:
- Mixed naming conventions
- Unclear file purposes
```

#### **2. Component Structure**
```typescript
// Standard component structure
export function Component({ prop1, prop2 }: Props) {
  // 1. Hooks and state
  const [state, setState] = useState();
  const t = useTranslations();
  
  // 2. Computed values
  const computedValue = useMemo(() => {
    return processData(state);
  }, [state]);
  
  // 3. Event handlers
  const handleClick = useCallback(() => {
    setState(!state);
  }, [state]);
  
  // 4. Early returns
  if (loading) return <Skeleton />;
  
  // 5. Main render
  return <div>{/* JSX */}</div>;
}
```

### 🎯 **SEO Best Practices**

#### **1. Metadata Generation**
```typescript
// src/app/[locale]/page.tsx
export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  
  return {
    title: 'CAC - Center for Entrepreneurship and Consulting',
    description: 'CAC business description',
    alternates: {
      languages: {
        en: '/en',
        fr: '/fr',
        ar: '/ar'
      }
    }
  };
}
```

#### **2. Structured Data**
```typescript
// Add JSON-LD for business
const businessData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CAC - Center for Entrepreneurship and Consulting",
  "url": "https://cac-website.com",
  "description": "CAC business description"
};
```

---

## Integration with Admin Dashboard

### 🔗 **Data Flow**

```
Admin Dashboard (../cac-dashboard/)
├── Content Management
├── Product Creation
├── Gallery Management
└── User Management
            ↓
        Firebase
            ↓
Frontend Website (this project)
├── Product Display
├── Gallery Display
├── Company Information
└── Contact Forms
```

### 📊 **Shared Resources**

#### **1. Firebase Configuration**
```typescript
// Both projects share Firebase config
// src/config/firebase.ts (same structure)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... same config as admin dashboard
};
```

#### **2. Data Models**
```typescript
// Shared product interface
interface Product {
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
  images: string[];
  category: string;
}
```

#### **3. Storage Integration**
```typescript
// Uses same R2 storage as admin dashboard
// lib/imageKitLoader.js (same implementation)
export default function imageKitLoader({
  src,
  width,
  quality = 80
}) {
  // Same ImageKit optimization
}
```

### 🔄 **Content Sync**

#### **Admin Dashboard → Frontend Flow**
1. **Admin** creates/updates content in dashboard
2. **Firebase** stores the data
3. **Frontend** fetches and displays content
4. **ImageKit** optimizes images for frontend

#### **Real-time Updates**
```typescript
// Optional: Real-time data sync
useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, 'products'),
    (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(products);
    }
  );
  
  return unsubscribe;
}, []);
```

---

## 🚀 **Quick Reference**

### **Development Commands**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run linting
```

### **Key Directories**
- `src/app/[locale]/` - Internationalized pages
- `src/components/` - Reusable components
- `messages/` - Translation files
- `public/` - Static assets

### **Environment Variables**
```bash
# Firebase (same as admin dashboard)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Email system
EMAIL_USER=
EMAIL_PASS=
PUBLIC_URL=
```

### **Common Tasks**
- **Add new page**: Create in `src/app/[locale]/`
- **Add translations**: Update `messages/*.json`
- **Add components**: Create in `src/components/`
- **Update navigation**: Edit `src/constats/nav-links.ts`

---

## 🎯 **Key Differences from Admin Dashboard**

| Feature | Admin Dashboard | Frontend Website |
|---------|----------------|------------------|
| **Purpose** | Content management | Content display |
| **Users** | Administrators | Public customers |
| **Language** | Primarily Arabic | Multi-language |
| **Framework** | Next.js 14 | Next.js 15 |
| **Architecture** | Feature-based | Page-based |
| **Authentication** | Required | Not required |
| **Data Flow** | Creates/manages data | Consumes data |

---

## 🔮 **Future Enhancements**

### **Planned Features**
1. **E-commerce Integration**: Shopping cart and checkout
2. **User Accounts**: Customer registration and login
3. **Search Functionality**: Product and content search
4. **Blog System**: News and updates
5. **Live Chat**: Customer support
6. **PWA Features**: Offline capability
7. **Analytics**: Usage tracking and insights

### **Technical Improvements**
1. **Performance**: Further optimization
2. **SEO**: Enhanced search optimization
3. **Accessibility**: WCAG compliance
4. **Testing**: Automated testing suite
5. **CI/CD**: Automated deployment

---

## 📝 **Conclusion**

This frontend website complements the admin dashboard by providing a professional, multilingual customer-facing experience. It leverages the same data managed by the admin dashboard while providing a completely different user experience optimized for public consumption.

**Key Strengths:**
- ✅ **Multilingual Support**: Professional i18n implementation
- ✅ **Modern UI/UX**: Beautiful, responsive design
- ✅ **Performance Optimized**: Fast loading and smooth interactions
- ✅ **SEO Ready**: Proper metadata and structured data
- ✅ **Integration Ready**: Seamless data flow from admin dashboard

---

*Last Updated: 2024-07-17*
*Status: Production Ready*
*Version: 1.0.0*