import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/routing";

export default createIntlMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  // localePrefix: "as-needed"
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|ar|en)/:path*"]
};

