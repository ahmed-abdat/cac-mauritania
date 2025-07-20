import { siteConfig } from '@/config/site';

/**
 * LocalBusiness Schema for CAC
 * Optimizes local SEO for Mauritania searches
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CAC - مركز الريادة والاستشارات",
  "alternateName": [
    "CAC",
    "Center for Entrepreneurship and Consulting"
  ],
  "image": [
    `${siteConfig.url}/logo.jpg`,
    `${siteConfig.url}/about.webp`,
    `${siteConfig.url}/og-image.jpeg`
  ],
  "url": siteConfig.url,
  "description": siteConfig.description,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nouakchott",
    "addressLocality": "Nouakchott", 
    "addressRegion": "Nouakchott",
    "postalCode": "",
    "addressCountry": "MR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.0735,
    "longitude": -15.9582
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Mauritania"
    },
    {
      "@type": "City", 
      "name": "Nouakchott"
    }
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "Mauritania"
  },
  "priceRange": "$$",
  "currenciesAccepted": "MRU",
  "paymentAccepted": ["Cash", "Bank Transfer"],
  "openingHours": "Mo-Fr 08:00-17:00",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Arabic", "French", "English"],
    "areaServed": "MR"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "CAC Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ready Construction",
          "description": "Prefabricated construction solutions"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Regular Construction",
          "description": "Traditional construction services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Renewable Energy",
          "description": "Solar and sustainable energy solutions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Agriculture Consulting", 
          "description": "Agricultural development and consulting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Animal Development",
          "description": "Livestock and animal husbandry consulting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Entrepreneurship Center",
          "description": "Business incubation and consulting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Conference Hall",
          "description": "Event hosting and conference services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Charitable Interventions",
          "description": "Social responsibility and community development"
        }
      }
    ]
  }
};