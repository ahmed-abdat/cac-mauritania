import { useState, useEffect } from 'react';
import { Locale } from '@/i18n/routing';

/**
 * Format date consistently across SSR and client-side rendering
 * to prevent hydration mismatches
 */
export function formatDateSafe(
  date: Date, 
  locale: Locale, 
  isClient: boolean = true, 
  format: 'full' | 'short' = 'full'
): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'numeric',
    day: format === 'full' ? 'numeric' : undefined,
    numberingSystem: 'latn' // Force Latin numerals to prevent hydration mismatch
  };

  if (!isClient) {
    // Use English locale on server to ensure consistency
    return date.toLocaleDateString('en', options);
  }

  // Use proper locale on client with Latin numerals
  return date.toLocaleDateString(locale, options);
}

/**
 * Hook for safe date formatting that handles hydration
 */
export function useSafeDateFormatter() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isClient,
    formatDate: (date: Date, locale: Locale, format: 'full' | 'short' = 'full') => 
      formatDateSafe(date, locale, isClient, format)
  };
}