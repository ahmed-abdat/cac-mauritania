// Centralized contact information constants
// Update these values here to change contact info across the entire application

export const CONTACT_INFO = {
  // Phone numbers
  PRIMARY_PHONE: "42420760",
  SECONDARY_PHONE: "42420760",

  // Full phone numbers with country code
  PRIMARY_PHONE_FULL: "+22242420760",
  SECONDARY_PHONE_FULL: "+22242420760",

  // WhatsApp
  WHATSAPP_NUMBER: "22242420760",
  WHATSAPP_URL: "https://wa.me/22242420760?text=",

  // Email
  EMAIL: "cacanktt@gmail.com",

  // Location coordinates
  LOCATION_COORDINATES: "18.1190586090088,-16.0007514953613",
  GOOGLE_MAPS_URL:
    "https://www.google.com/maps?q=18.1190586090088,-16.0007514953613",

  // Business hours
  BUSINESS_HOURS: {
    en: "8am-6pm Monday to Saturday\n24/7 Call Service",
    fr: "8h-18h du lundi au samedi\nService d'appel 24h/24 7j/7",
    ar: "أوقات الدوام من الاثنين إلى السبت من الساعة 8 صباحاً إلى 18 مساءً\nخدمة الاتصال 24/24 7/7",
  },
} as const;
