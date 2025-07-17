import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  // Use the default locale (ar) for the sitemap URL
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/ar/sitemap.xml`,
    host: siteConfig.url,
  }
}
