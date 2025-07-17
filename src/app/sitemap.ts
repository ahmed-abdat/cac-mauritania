import { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/routing'
import { siteConfig } from '@/config/site'

/**
 * Root sitemap that redirects to the default locale sitemap
 * This is a simple redirect sitemap that lists all locale-specific sitemaps
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Create sitemap index entries for each locale
  return locales.map(locale => ({
    url: `${siteConfig.url}/${locale}/sitemap.xml`,
    lastModified: new Date(),
  }))
}
