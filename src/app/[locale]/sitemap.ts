import { MetadataRoute } from 'next'
import { getMarketPlaceProducts, getHealthProducts } from '../action'
import { Timestamp } from 'firebase/firestore'
import type { Product } from '@/types/product'
import { siteConfig } from '@/config/site'
import type { Locale } from '@/i18n/routing'

interface SitemapParams {
  params: {
    locale: Locale
  }
}

/**
 * Generate a locale-specific sitemap for improved SEO
 * Each locale gets its own complete sitemap with all routes
 */
export default async function sitemap(
  { params }: SitemapParams
): Promise<MetadataRoute.Sitemap> {
  const { locale } = params
  
  // Fetch all marketplace products
  const { products: marketplaceProducts } = await getMarketPlaceProducts("marketplace", false)
  
  // Fetch health products (for each category)
  const { products: healthProductsSante } = await getHealthProducts("sante", false)
  const { products: healthProductsSecurity } = await getHealthProducts("security", false)
  const { products: healthProductsBiroutice } = await getHealthProducts("biroutice", false)
  
  // Combine all health products
  const healthProducts = [
    ...healthProductsSante,
    ...healthProductsSecurity,
    ...healthProductsBiroutice
  ]
  
  // Helper function to convert Timestamp to ISO string
  const formatTimestamp = (timestamp: any): string => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toISOString()
    } else if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
      return new Date((timestamp as { seconds: number }).seconds * 1000).toISOString()
    }
    return new Date().toISOString()
  }

  // Generate product URLs
  const productUrls: MetadataRoute.Sitemap = []
  
  // Add marketplace products
  for (const product of marketplaceProducts) {
    productUrls.push({
      url: `${siteConfig.url}/${locale}/marketplace/${product.id}`,
      lastModified: formatTimestamp(product.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }
  
  // Add health products
  for (const product of healthProducts) {
    // Extract category from the product
    const category = product.category || 'sante'
    
    productUrls.push({
      url: `${siteConfig.url}/${locale}/health/${product.id}?category=${category}`,
      lastModified: formatTimestamp(product.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  // Base routes for this locale
  const routes: MetadataRoute.Sitemap = [
    {
      url: locale === 'ar' ? siteConfig.url : `${siteConfig.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/${locale}/marketplace`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/${locale}/health`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }
  ]

  // Combine all routes
  return [
    ...routes,
    ...productUrls,
  ]
}