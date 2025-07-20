import { siteConfig } from '@/config/site';

/**
 * Service schemas for each CAC business category
 * Helps search engines understand specific services offered
 */

export const constructionServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Construction Services",
  "description": "Comprehensive construction solutions including ready-built and traditional construction",
  "provider": {
    "@type": "Organization",
    "name": "CAC - مركز الريادة والاستشارات",
    "url": siteConfig.url
  },
  "areaServed": {
    "@type": "Country", 
    "name": "Mauritania"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Construction Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ready Construction",
          "description": "Pre-engineered buildings, modular construction systems, quick assembly solutions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Regular Construction",
          "description": "Residential buildings, commercial complexes, infrastructure projects"
        }
      }
    ]
  }
};

export const renewableEnergyServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Renewable Energy Solutions",
  "description": "Solar panel installation, wind energy systems, and sustainable power solutions",
  "provider": {
    "@type": "Organization",
    "name": "CAC - مركز الريادة والاستشارات",
    "url": siteConfig.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Mauritania"
  },
  "serviceType": "Energy Consulting"
};

export const agricultureServiceSchema = {
  "@context": "https://schema.org", 
  "@type": "Service",
  "name": "Agricultural Development Services",
  "description": "Agricultural consulting, irrigation systems, crop optimization, and modern farming techniques",
  "provider": {
    "@type": "Organization",
    "name": "CAC - مركز الريادة والاستشارات",
    "url": siteConfig.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Mauritania"
  },
  "serviceType": "Agricultural Consulting"
};

export const entrepreneurshipServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service", 
  "name": "Entrepreneurship Center Services",
  "description": "Startup incubation, business plan development, entrepreneurship training, and investment facilitation",
  "provider": {
    "@type": "Organization",
    "name": "CAC - مركز الريادة والاستشارات",
    "url": siteConfig.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Mauritania" 
  },
  "serviceType": "Business Consulting"
};

export const animalDevelopmentServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Animal Development Services", 
  "description": "Livestock management consulting, animal nutrition programs, veterinary support services",
  "provider": {
    "@type": "Organization",
    "name": "CAC - مركز الريادة والاستشارات",
    "url": siteConfig.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Mauritania"
  },
  "serviceType": "Agricultural Consulting"
};

export const conferenceServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Conference and Event Services",
  "description": "Conference facility rental, event planning and management, corporate meetings, training workshops",
  "provider": {
    "@type": "Organization", 
    "name": "CAC - مركز الريادة والاستشارات",
    "url": siteConfig.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Mauritania"
  },
  "serviceType": "Event Planning"
};

export const charitableServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Charitable Interventions and Community Development",
  "description": "Community development projects, educational initiatives, healthcare support programs",
  "provider": {
    "@type": "Organization",
    "name": "CAC - مركز الريادة والاستشارات", 
    "url": siteConfig.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Mauritania"
  },
  "serviceType": "Community Service"
};