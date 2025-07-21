"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Menu,
  ArrowRight,
  ArrowLeft,
  Building,
  Zap,
  Sprout,
  Heart,
  Users,
  Headphones,
  Home,
  Info,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Image } from "@/components/ui/image";
import { useState } from "react";
import LocalSwitcher from "./local-switcher";
import { StarBorder } from "@/components/ui/star-border";
import { cn } from "@/lib/utils";

// Same navigation structure as desktop
const navigationGroups = [
  {
    id: "construction",
    icon: Building,
    items: [
      { title: "Construction", href: "/construction" },
      { title: "Ready Build", href: "/ready-construction" },
      { title: "Regular Construction", href: "/regular-construction" },
    ],
  },
  {
    id: "sustainability",
    icon: Zap,
    items: [
      { title: "Energy", href: "/renewable-energy" },
      { title: "Agriculture", href: "/agriculture" },
      { title: "Livestock", href: "/animal-development" },
    ],
  },
  {
    id: "business",
    icon: Users,
    items: [
      { title: "Entrepreneurship", href: "/entrepreneurship-center" },
      { title: "Conference", href: "/conference-hall" },
      { title: "Charity", href: "/charitable-interventions" },
    ],
  },
];

interface ModernMobileNavProps {
  locale: string;
}

export function ModernMobileNav({ locale }: ModernMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const isRTL = locale === "ar";

  const closeSheet = () => setIsOpen(false);

  const getGroupTitle = (groupId: string) => {
    return t(`navigationGroups.${groupId}.title`);
  };

  // Helper function to check if a link is active
  const isLinkActive = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    const linkPath = href === '/' ? '/' : href;
    
    // Exact match for home page
    if (linkPath === '/' && currentPath === '/') {
      return true;
    }
    
    // For other pages, check if current path starts with the link path
    if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
      return true;
    }
    
    return false;
  };

  const renderMobileGroup = (group: (typeof navigationGroups)[0]) => {
    const groupTitle = getGroupTitle(group.id);

    return (
      <AccordionItem key={group.id} value={group.id} className="border-b-0">
        <AccordionTrigger className="py-4 px-4 font-medium hover:no-underline rounded-xl hover:bg-primary-blue/5 hover:text-primary-blue focus:bg-primary-blue/10 focus:text-primary-blue focus:outline-none transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-blue/10 rounded-lg">
              <group.icon className="w-4 h-4 text-primary-blue" />
            </div>
            <span className="text-left">{groupTitle}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-2 pb-2">
          <div className="space-y-1">
            {group.items.map((item) => {
              const isActive = isLinkActive(item.href);
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-lg p-3 ml-4 leading-none outline-none transition-all duration-200 hover:bg-primary-blue/5 hover:text-primary-blue focus:bg-primary-blue/10 focus:text-primary-blue focus:outline-none active:scale-95",
                    isActive && "bg-primary-blue/10 text-primary-blue border border-primary-blue/20"
                  )}
                  onClick={closeSheet}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors duration-200",
                        isActive ? "bg-primary-blue" : "bg-primary-blue/60"
                      )} 
                    />
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-sm font-medium transition-colors duration-200",
                        isActive && "text-primary-blue font-semibold"
                      )}>
                        {t(item.title)}
                      </span>
                    </div>
                  </div>
                  {isRTL ? (
                    <ArrowLeft className={cn(
                      "w-4 h-4 transition-colors duration-200",
                      isActive ? "text-primary-blue" : "text-gray-400"
                    )} />
                  ) : (
                    <ArrowRight className={cn(
                      "w-4 h-4 transition-colors duration-200", 
                      isActive ? "text-primary-blue" : "text-gray-400"
                    )} />
                  )}
                </Link>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-900 hover:bg-gray-100 hover:text-primary-blue transition-all duration-200 border border-gray-300 hover:border-primary-blue/50 shadow-sm"
        >
          <Menu className="w-4 h-4" />
          <span className="sr-only">{t("openMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isRTL ? "left" : "right"}
        className="flex flex-col w-80 p-0 bg-white"
      >
        <SheetHeader className="p-6 bg-white border-b border-gray-200">
          <SheetTitle asChild>
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-900"
              onClick={closeSheet}
            >
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <Image
                  src="/logo.jpg"
                  alt="CAC Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-gray-900">CAC</span>
                <span className="text-xs text-gray-600">
                  {t("cacSubtitle")}
                </span>
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Home Link */}
          <nav className="space-y-2 mb-6">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary-blue/5 hover:text-primary-blue focus:bg-primary-blue/10 focus:text-primary-blue focus:outline-none transition-all duration-200 active:scale-95",
                isLinkActive('/') && "bg-primary-blue/10 text-primary-blue border border-primary-blue/20 font-semibold"
              )}
              onClick={closeSheet}
            >
              <Home className={cn(
                "w-4 h-4 transition-colors duration-200",
                isLinkActive('/') ? "text-primary-blue" : "text-primary-blue"
              )} />
              <span className={cn(
                "transition-colors duration-200",
                isLinkActive('/') && "text-primary-blue font-semibold"
              )}>
                {t("Home")}
              </span>
            </Link>
          </nav>

          {/* Navigation Groups */}
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-2"
          >
            {navigationGroups.map(renderMobileGroup)}
          </Accordion>

          <Separator className="my-6 bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent" />

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-primary-blue px-2">
              {t("quickLinks")}
            </h3>
            <nav className="space-y-2">
              <Link
                href="/about"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary-blue/5 hover:text-primary-blue focus:bg-primary-blue/10 focus:text-primary-blue focus:outline-none transition-all duration-200 active:scale-95",
                  isLinkActive('/about') && "bg-primary-blue/10 text-primary-blue border border-primary-blue/20 font-semibold"
                )}
                onClick={closeSheet}
              >
                <Info className={cn(
                  "w-4 h-4 transition-colors duration-200",
                  isLinkActive('/about') ? "text-primary-blue" : "text-primary-blue"
                )} />
                <span className={cn(
                  "transition-colors duration-200",
                  isLinkActive('/about') && "text-primary-blue font-semibold"
                )}>
                  {t("About")}
                </span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Language Switcher Section */}
        <div className="border-t border-primary-blue/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-primary-blue">
              {t("language")}
            </h3>
            <LocalSwitcher variant="footer" className="w-auto" />
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="border-t border-primary-blue/10 p-6 space-y-4 bg-gradient-to-r from-primary-blue/5 to-primary-lightBlue/5">
          <StarBorder
            as={Link}
            href="/contact"
            color="#1A4FE6"
            speed="4s"
            className="text-sm h-10 flex items-center justify-center hover:scale-105 transition-transform duration-200 w-full"
            onClick={closeSheet}
          >
            <div
              className={cn(
                "flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-primary-blue transition-colors duration-200",
                pathname === `/${locale}/contact` && "text-primary-blue"
              )}
            >
              <Headphones className="w-4 h-4" />
              {t("contactUs")}
            </div>
          </StarBorder>
        </div>
      </SheetContent>
    </Sheet>
  );
}
