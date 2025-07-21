import { siteConfig } from '@/config/site';
import { CONTACT_INFO } from '@/constats/contact-info';

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
    `${siteConfig.url}/logo.webp`,
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
    "latitude": 18.1190586090088,
    "longitude": -16.0007514953613
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
  "openingHours": "Mo-Sa 08:00-18:00",
  "telephone": CONTACT_INFO.PRIMARY_PHONE_FULL,
  "email": CONTACT_INFO.EMAIL,
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "telephone": CONTACT_INFO.PRIMARY_PHONE_FULL,
    "email": CONTACT_INFO.EMAIL,
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