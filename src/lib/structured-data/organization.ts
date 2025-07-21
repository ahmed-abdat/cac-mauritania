import { siteConfig } from '@/config/site';

/**
 * Organization Schema for CAC
 * Provides search engines with comprehensive company information
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CAC - مركز الريادة والاستشارات",
  "alternateName": [
    "CAC",
    "Center for Entrepreneurship and Consulting",
    "Centre d'entrepreneuriat et de conseil"
  ],
  "url": siteConfig.url,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteConfig.url}/logo.webp`,
    "width": 200,
    "height": 200
  },
  "image": {
    "@type": "ImageObject", 
    "url": `${siteConfig.url}/og-image.jpeg`,
    "width": 1200,
    "height": 630
  },
  "description": siteConfig.description,
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MR",
    "addressLocality": "Nouakchott",
    "addressRegion": "Nouakchott"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Arabic", "French", "English"]
  },
  "areaServed": {
    "@type": "Country",
    "name": "Mauritania"
  },
  "knowsAbout": [
    "Construction",
    "Renewable Energy", 
    "Agriculture",
    "Entrepreneurship",
    "Business Consulting",
    "Conference Services",
    "Animal Development",
    "Charitable Work"
  ],
  "serviceType": [
    "Ready Construction",
    "Regular Construction", 
    "Renewable Energy Solutions",
    "Agricultural Consulting",
    "Animal Development",
    "Entrepreneurship Center",
    "Conference Hall Services",
    "Charitable Interventions"
  ]
};

/**
 * Website Schema for CAC
 * Helps search engines understand the website structure
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "alternateName": "CAC Mauritania",
  "url": siteConfig.url,
  "description": siteConfig.description,
  "publisher": {
    "@type": "Organization",
    "name": "CAC - مركز الريادة والاستشارات",
    "url": siteConfig.url
  },
  "inLanguage": ["ar", "en", "fr"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};