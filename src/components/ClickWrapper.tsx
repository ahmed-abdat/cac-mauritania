"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface ClickWrapperProps {
  url: string;
  locale: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  title?: string;
  translationKey?: string;
}

export default function ClickWrapper({
  url,
  locale,
  className,
  children,
  ariaLabel,
  title,
  translationKey,
}: ClickWrapperProps) {
  const path = usePathname();
  const a11y = useTranslations("Accessibility");

  // Get link destination based on current path and locale
  const link = path.includes(locale)
    ? `${path.slice(0, 3)}${url}`
    : `${locale}${url}`;

  // Determine if this is a specific page type for common translations
  const isHomePage = url === "/" || url.endsWith("/home");
  const isAboutPage = url === "/about" || url.endsWith("/about");
  const isContactPage = url === "/contact" || url.endsWith("/contact");
  const isPhoneLink = url.startsWith("tel:");

  // Get the appropriate accessibility label based on link type
  const getAccessibilityLabel = () => {
    // First priority: explicitly provided label
    if (ariaLabel) return ariaLabel;
    
    // Second priority: translation key if provided
    if (translationKey) return a11y(translationKey);
    
    // Third priority: common page types
    if (isHomePage) return a11y("homeLink");
    if (isAboutPage) return a11y("aboutLink");
    if (isContactPage) return a11y("contactLink");
    if (isPhoneLink) return a11y("callLink");
    
    // Fallback: generic label
    return `${a11y("learnMorePrefix")} ${url.replace(/^\//, '')}`;
  };

  // Get the appropriate title based on link type
  const getTitle = () => {
    // First priority: explicitly provided title
    if (title) return title;
    
    // Second priority: common page types
    if (isHomePage) return a11y("homeTitle");
    if (isAboutPage) return a11y("aboutTitle");
    if (isContactPage) return a11y("contactTitle");
    if (isPhoneLink) return a11y("callTitle");
    
    // Fallback: generic title
    return `${url.replace(/^\//, '')} page`;
  };

  return (
    <Link 
      href={link} 
      passHref 
      className={` ${className}`}
      aria-label={getAccessibilityLabel()}
      title={getTitle()}
    >
      {children}
    </Link>
  );
}
