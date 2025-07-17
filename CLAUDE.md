# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual business website for CAC (Center for Entrepreneurship and Consulting) built with Next.js 15, supporting English, French, and Arabic with RTL support. The site features consulting services, construction projects, and entrepreneurship solutions.

## CAC Transformation Status

🚧 **MIGRATION IN PROGRESS**: This codebase is being transformed from MBI Group to CAC (Center for Entrepreneurship and Consulting).

### CAC Integration Guides

Refer to these comprehensive guides for CAC-specific implementation:

- **CAC_DASHBOARD_INTEGRATION_GUIDE.md** - Integration with CAC admin dashboard
- **CAC_FRONTEND_CLEANUP_GUIDE.md** - Complete cleanup from MBI to CAC
- **CAC_FRONTEND_DEVELOPMENT_GUIDE.md** - CAC-specific development guidelines

### CAC Business Categories

1. **البناء الجاهز** (Ready Construction)
2. **البناء العادي** (Regular Construction)
3. **الطاقة المتجددة** (Renewable Energy)
4. **الزراعة** (Agriculture)
5. **التنمية الحيوانيّة** (Animal Development)
6. **مركز الريادة** (Entrepreneurship Center)
7. **قاعة المؤتمرات** (Conference Hall)
8. **التدخلات الخيرية** (Charitable Interventions)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn UI + Radix UI
- **Internationalization**: next-intl with locales ["en", "fr", "ar"] (default: "ar")
- **Database**: Firebase Firestore
- **Storage**: AWS S3 + R2 Storage with ImageKit optimization
- **Email**: Nodemailer with Gmail SMTP
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Development**: Stagewise toolbar for React development (dev only)

## Architecture

### Project Structure

```
src/
├── app/[locale]/           # Internationalized routes with Next.js App Router
├── components/             # Reusable components
│   ├── ui/                # Shadcn UI components
│   ├── home/              # Homepage sections
│   ├── header/            # Navigation components
│   ├── media/             # Gallery/media components
│   └── magicui/           # Magic UI animation components
├── config/                # Configuration files (Firebase, site config)
├── constats/              # Constants and static data
├── hooks/                 # Custom React hooks
├── i18n/                  # Internationalization setup
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions and email templates
```

### Key Components

- **Layout**: `src/app/[locale]/layout.tsx` - Main layout with i18n support and RTL handling
- **Header**: `src/components/header/` - Navigation with mobile responsiveness and locale switching
- **Contact Form**: `src/components/ContactForm.tsx` - Multilingual contact form with server actions
- **Email System**: `src/utils/templates/emailTemplate.ts` - Professional email templates with brand styling
- **Media Gallery**: `src/components/media/` - Image/video gallery with filtering and modal preview
- **Image Optimization**: `lib/imageKitLoader.js` - Custom ImageKit loader with WebP support
- **Storage Utils**: `src/utils/r2-client.ts` and `src/utils/storage-utils.ts` - R2 storage integration

## Internationalization

- **Locales**: English (en), French (fr), Arabic (ar)
- **RTL Support**: Full RTL layout for Arabic
- **Directory Structure**: `src/app/[locale]/` for route localization
- **Translation Files**: Located in `messages/` directory
- **Usage**: Always use `useTranslations()` hook - never hardcode text

### Arabic Support

- RTL layout with `dir="rtl"` attribute
- Arabic fonts: Tajawal and custom Arabic fonts
- Proper text alignment and spacing adjustments

## Styling System

### Brand Colors

```typescript
// Tailwind config colors
primary: {
  blue: '#533df6',      // Main brand color
  lightBlue: '#3925d2', // Secondary brand color
  darkBlue: '#2615ac'   // Accent color
}
```

### Component Conventions

- Use Shadcn UI components as base (configured in `components.json`)
- Extend with Tailwind classes using `cn()` utility from `src/lib/utils.ts`
- Mobile-first responsive design
- Consistent spacing and typography
- Magic UI components for advanced animations (`src/components/magicui/`)

## Storage & Media System

### Image Optimization

- **ImageKit Integration**: Custom loader at `lib/imageKitLoader.js`
- **WebP Support**: Automatic format conversion for better compression
- **Progressive Loading**: For images > 800px width
- **Multi-source Support**: Firebase Storage, R2 Storage, local files
- **Quality Optimization**: Adaptive quality based on image dimensions

### Storage Architecture

- **R2 Storage**: Primary storage with custom domain (cacmauritanie.mr)
- **Firebase Storage**: Legacy support for existing media
- **ImageKit**: CDN and optimization layer
- **Configuration**: `src/config/storage-folders.ts` defines folder structure


## Email System

### Email Templates

- Location: `src/utils/templates/emailTemplate.ts`
- Professional design with brand colors
- Responsive layout with proper fallbacks
- Logo attachment with CID reference
- French language default with proper date formatting

## Performance Optimizations

- Minimize `use client` directives - prefer Server Components
- Use `Suspense` boundaries for loading states
- Dynamic imports for heavy components
- Optimized images with Next.js Image component
- Lazy loading for non-critical content

## Development Guidelines

### TypeScript

- Strict TypeScript mode enabled
- Prefer interfaces over types
- Avoid enums - use maps instead
- Proper typing for all props and data structures

### Component Structure

```typescript
// 1. Imports (external first, then internal)
// 2. Types and interfaces
// 3. Main component
// 4. Subcomponents (if any)
// 5. Helper functions
// 6. Static data/constants
```

### Form Validation

- Use Zod schemas with `createFormSchema()` pattern
- Multilingual validation messages
- Server-side validation in server actions
- Proper error handling and user feedback

## Common Patterns

### Server Components (Default)

```typescript
// For data fetching and static rendering
export async function ProductListing() {
  const products = await fetchProducts();
  return <div>...</div>;
}
```

### Client Components

```typescript
"use client";
// Only for interactivity and browser APIs
export function InteractiveButton() {
  const [state, setState] = useState();
  return <button onClick={...}>...</button>;
}
```

### Internationalization

```typescript
import { useTranslations } from "next-intl";

export function Component() {
  const t = useTranslations("namespace");
  return <button>{t("buttonText")}</button>;
}
```

## Media & Gallery System

### Gallery Components

- **MediaGallery**: Main gallery component with filtering
- **MediaDisplay**: Individual media item display
- **MediaCarousel**: Swiper-based carousel for media
- **MediaFilters**: Category-based filtering system
- **MediaPreviewModal**: Modal for full-size media preview

### Media Processing

- **File Uploads**: Handled by admin dashboard (separate system)
- **Image Optimization**: Automatic via ImageKit loader
- **Format Support**: Images, videos, with proper fallbacks
- **Storage Organization**: Organized by categories/folders

## Testing

- No specific test framework configured
- Manual testing across all locales
- Email template testing in various clients
- Cross-browser compatibility testing
- Mobile responsiveness verification

## Server Actions & API

### Email Handling

- **Server Action**: `src/app/action.ts` - handles contact form submissions
- **Validation**: Zod schema validation with multilingual messages
- **Email Templates**: Professional responsive design
- **Error Handling**: Proper error messages and user feedback

### Image Processing

- **Server Size Limits**: 10MB for file uploads (configured in `next.config.mjs`)
- **Image Optimization**: Handled client-side via ImageKit loader
- **Multiple Sources**: Supports Firebase, R2, and local images

## Deployment

- Configured for Vercel deployment
- Environment variables required for email and storage functionality
- Static generation for optimal performance
- Proper SEO metadata and OpenGraph tags
- Custom domain support for R2 storage

## Security

- Server-side input validation
- Gmail App Passwords for email
- Sanitized user inputs
- No sensitive data exposure in client code

## Development Tools

### Stagewise Toolbar

- **Purpose**: React development assistance (development only)
- **Location**: Integrated in main layout
- **Configuration**: React plugin enabled
- **Visibility**: Only shows in development mode

### Font System

- **Arabic**: Tajawal + RB fonts for RTL support
- **Latin**: Roboto for English/French
- **Configuration**: `src/app/font/font.ts`
- **Dynamic Loading**: Font switching based on locale

## Important Notes

- **Default Locale**: Arabic ("ar") - site is primarily Arabic-focused
- **RTL Support**: Full RTL layout implementation for Arabic
- **Image Optimization**: Always use Next.js Image component with custom loader
- **Server Components**: Prefer server components over client components
- **Validation**: Always use Zod schemas for form validation
- **Internationalization**: Never hardcode text - always use translation hooks

## CAC-Specific Development

### Firebase Configuration

```bash
# CAC Firebase Environment Variables
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyA__b-ZYeaxGSiATd7EJrPwtiky4U3P_Eo"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="cac-mauritania.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="cac-mauritania"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="cac-mauritania.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1052004394543"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1052004394543:web:19f763fe3bfb021ad708da"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-DYM12X3FQD"
```

### CAC Data Structure

#### Construction Products
```typescript
interface ConstructionProduct {
  id: string;
  title: { en: string; fr: string; ar: string };
  description?: { en?: string; fr?: string; ar?: string };
  category: string;
  images: { name: string; url: string }[];
  createdAt?: Date;
  updatedAt?: Date;
}
```

#### Gallery Items
```typescript
interface GalleryItem {
  id: string;
  url: string;
  type: "image" | "video";
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
  size?: number;
  name?: string;
}
```

### CAC Routes Structure

```
src/app/[locale]/
├── construction/          # Construction services
├── gallery/              # Media gallery
├── services/             # Service presentations
├── categories/[slug]/    # Category-based pages
├── about/               # About CAC
└── contact/             # Contact form
```

## Important CAC Development Notes

- **Business Focus**: CAC is a consulting and entrepreneurship center, not a product marketplace
- **Data Source**: All content managed through CAC admin dashboard
- **Integration**: Must maintain compatibility with CAC dashboard data structures
- **Categories**: Use CAC's 8 business categories for all content organization
- **Firebase**: Must use CAC's Firebase project configuration
- **Branding**: All MBI references must be replaced with CAC branding

## Quick CAC Development Commands

```bash
# Start development with CAC configuration
npm run dev

# Build for CAC production
npm run build

# Test CAC routes
npm run lint
```

## CAC Migration Status

- ✅ **Technical Infrastructure**: Complete
- 🚧 **Content Migration**: In progress
- ❌ **MBI Content Removal**: Pending
- ❌ **CAC Branding**: Pending
- ❌ **Firebase Integration**: Pending

Always refer to the CAC integration guides for the most up-to-date information and implementation details.