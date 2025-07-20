import { MetadataRoute } from 'next'
import { getPresentationImages } from '../action'
import { siteConfig } from '@/config/site'
import type { Locale } from '@/i18n/routing'

interface SitemapParams {
  params: {
    locale: Locale
  }
}

/**
 * Generate a locale-specific sitemap for CAC services
 * Each locale gets its own complete sitemap with all active routes
 */
export default async function sitemap(
  { params }: SitemapParams
): Promise<MetadataRoute.Sitemap> {
  const { locale } = params
  
  // CAC Service Categories
  const cacServiceCategories = [
    'ready-construction',        // البناء الجاهز
    'regular-construction',      // البناء العادي  
    'renewable-energy',          // الطاقة المتجددة
    'agriculture',               // الزراعة
    'animal-development',        // التنمية الحيوانية
    'entrepreneurship-center',   // مركز الريادة
    'conference-hall',           // قاعة المؤتمرات
    'charitable-interventions'   // التدخلات الخيرية
  ]

  // Base routes for this locale with proper SEO priorities
  const routes: MetadataRoute.Sitemap = [
    // Homepage - Highest priority
    {
      url: locale === 'ar' ? siteConfig.url : `${siteConfig.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // About page - High priority
    {
      url: `${siteConfig.url}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Contact page - Very high priority for business
    {
      url: `${siteConfig.url}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }
  ]

  // Add CAC service category pages
  const serviceRoutes: MetadataRoute.Sitemap = cacServiceCategories.map(category => ({
    url: `${siteConfig.url}/${locale}/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Add gallery pages for each service category
  const galleryRoutes: MetadataRoute.Sitemap = cacServiceCategories.map(category => ({
    url: `${siteConfig.url}/${locale}/${category}/galary`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Combine all routes
  return [
    ...routes,
    ...serviceRoutes,
    ...galleryRoutes,
  ]
}