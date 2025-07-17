"use client";

import React from "react";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { UrlObject } from "url";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  translateKey?: string;
  preserveQuery?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  namespace?: string; // Added for flexible translation namespace
}

/**
 * Enhanced Breadcrumb component with internationalization support
 * - Automatically adjusts direction based on locale (RTL support for Arabic)
 * - Supports translation keys for each breadcrumb item
 * - Adapts to different sections of the site with namespace parameter
 * - Maintains proper keyboard navigation and accessibility
 */
export default function CustomBreadcrumb({ 
  items, 
  className,
  namespace = "navigation" // Default namespace for translations
}: BreadcrumbProps) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();

  return (
    <BreadcrumbRoot className={cn("mb-4 sm:mb-8", className)}>
      <BreadcrumbList className={cn(
        "flex-wrap gap-2",
        isRTL ? "flex-row-reverse justify-end" : "flex-row"
      )}>
        {items.map((item, index) => {
          // For RTL languages like Arabic, we need to reverse the item order
          const actualIndex = isRTL ? items.length - 1 - index : index;
          const actualItem = items[actualIndex];
          
          // Preserve query parameters if specified
          let href: string | UrlObject | undefined = actualItem.href;
          if (href && actualItem.preserveQuery && searchParams) {
            // Convert searchParams to query object
            const query: Record<string, string> = {};
            searchParams.forEach((value, key) => {
              query[key] = value;
            });
            
            // Only add query if there are parameters
            if (Object.keys(query).length > 0) {
              href = {
                pathname: href,
                query
              };
            }
          }
          
          return (
            <React.Fragment key={actualIndex}>
              <BreadcrumbItem>
                {actualItem.href ? (
                  <BreadcrumbLink asChild>
                    <Link
                      href={href || "#"}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors",
                        isRTL ? "font-ibm-arabic" : ""
                      )}
                    >
                      {actualItem.translateKey ? t(actualItem.translateKey) : actualItem.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className={cn(
                    "font-medium",
                    isRTL ? "font-ibm-arabic" : ""
                  )}>
                    {actualItem.translateKey ? t(actualItem.translateKey) : actualItem.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && (
                <BreadcrumbSeparator className="text-muted-foreground/50">
                  {isRTL ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
