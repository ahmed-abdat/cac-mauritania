/**
 * Site configuration containing global site settings
 * This centralized configuration makes it easy to update site-wide settings
 */

interface SiteConfig {
  name: string;
  url: string; // Base URL without trailing slash
  title: string;
  description: string;
  keywords: string[];
  authors: {
    name: string;
    url: string;
  }[];
  creator: string;
}

export const siteConfig: SiteConfig = {
  name: "CAC - مركز الريادة والاستشارات",
  url: "https://cacmauritanie.mr",
  title: "CAC - Center for Entrepreneurship and Consulting",
  description:
    "CAC is a leading consulting center specializing in entrepreneurship, construction, renewable energy, and business development in Mauritania.",
  keywords: [
    "CAC",
    "مركز الريادة",
    "الاستشارات",
    "Center for Entrepreneurship",
    "Consulting",
    "construction",
    "renewable energy",
    "Mauritania",
    "entrepreneurship",
    "business development",
    "agriculture",
    "animal development",
  ],
  authors: [
    {
      name: "CAC - مركز الريادة والاستشارات",
      url: "https://cacmauritanie.mr",
    },
  ],
  creator: "CAC - مركز الريادة والاستشارات",
};
