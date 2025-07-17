import {getRequestConfig} from 'next-intl/server';
import {locales} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as string)) {
    locale = 'ar'; // Default locale
  }
 
  return {
    locale,
    // Load messages for the current locale
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});