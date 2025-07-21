"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Home, Info, Headphones, Hammer, Leaf, Briefcase } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import LocalSwitcher from "./local-switcher";
import { StarBorder } from "@/components/ui/star-border";

// Navigation structure with grouped items
const navigationGroups = [
  {
    id: "construction",
    icon: Hammer,
    items: [
      { title: "Construction", href: "/construction" },
      { title: "Ready Build", href: "/ready-construction" },
      { title: "Regular Construction", href: "/regular-construction" },
    ]
  },
  {
    id: "sustainability",
    icon: Leaf,
    items: [
      { title: "Energy", href: "/renewable-energy" },
      { title: "Agriculture", href: "/agriculture" },
      { title: "Livestock", href: "/animal-development" },
    ]
  },
  {
    id: "business",
    icon: Briefcase,
    items: [
      { title: "Entrepreneurship", href: "/entrepreneurship-center" },
      { title: "Conference", href: "/conference-hall" },
      { title: "Charity", href: "/charitable-interventions" },
    ]
  }
];

interface ModernHeaderProps {
  locale: string;
}

export function ModernHeader({ locale }: ModernHeaderProps) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const isRTL = locale === "ar";

  const getGroupTitle = (groupId: string) => {
    switch (groupId) {
      case "construction":
        return isRTL ? "البناء والإنشاء" : locale === "fr" ? "Construction" : "Construction";
      case "sustainability":
        return isRTL ? "الاستدامة" : locale === "fr" ? "Durabilité" : "Sustainability";
      case "business":
        return isRTL ? "الأعمال" : locale === "fr" ? "Affaires" : "Business";
      default:
        return "";
    }
  };

  const getGroupDescription = (groupId: string) => {
    switch (groupId) {
      case "construction":
        return isRTL ? "خدمات البناء والإنشاءات المتطورة" : 
               locale === "fr" ? "Services de construction avancés" : 
               "Advanced construction services";
      case "sustainability":
        return isRTL ? "حلول الطاقة المستدامة والزراعة" : 
               locale === "fr" ? "Solutions durables et agriculture" : 
               "Sustainable energy and agriculture solutions";
      case "business":
        return isRTL ? "دعم الأعمال والريادة" : 
               locale === "fr" ? "Support aux entreprises et entrepreneuriat" : 
               "Business support and entrepreneurship";
      default:
        return "";
    }
  };

  const renderNavigationGroup = (group: typeof navigationGroups[0]) => {
    const groupTitle = getGroupTitle(group.id);
    const groupDescription = getGroupDescription(group.id);

    return (
      <NavigationMenuItem key={group.id}>
        <NavigationMenuTrigger className="font-medium text-sm px-4 py-2 text-gray-900 hover:text-primary-blue hover:bg-primary-blue/10 focus:bg-primary-blue/15 focus:text-primary-blue focus:outline-none transition-all duration-200 border border-transparent hover:border-primary-blue/20">
          <div className="flex items-center gap-2">
            <group.icon className="w-4 h-4" />
            {groupTitle}
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!w-[420px] p-6 bg-white shadow-xl border border-gray-100 rounded-lg" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex flex-col lg:grid grid-cols-2 gap-6">
            {/* Group Info */}
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary-blue/10 rounded-lg">
                    <group.icon className="w-5 h-5 text-primary-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{groupTitle}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {groupDescription}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center px-4 py-2 bg-primary-blue hover:bg-primary-lightBlue text-white text-sm font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {t("learnMore")}
                </Link>
              </div>
            </div>

            {/* Group Items */}
            <div className="flex flex-col gap-2">
              {group.items.map((item) => (
                <Link
                  key={item.title}
                  href={`/${locale}${item.href}`}
                  className="flex items-center justify-between hover:bg-gray-50 hover:text-primary-blue py-3 px-4 rounded-lg group transition-all duration-200 border border-transparent hover:border-primary-blue/20 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-blue/60 rounded-full group-hover:bg-primary-blue transition-colors" />
                    <span className="font-medium text-sm">{t(item.title)}</span>
                  </div>
                  <div className="w-4 h-4 text-gray-400 group-hover:text-primary-blue transition-colors">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  };

  return (
    <div className="hidden lg:flex items-center gap-8">
      <NavigationMenu className="flex items-start">
        <NavigationMenuList
          className="justify-start gap-2"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Home Link */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href={`/${locale}`}
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 hover:text-primary-blue hover:bg-primary-blue/10 focus:bg-primary-blue/15 focus:text-primary-blue focus:outline-none transition-all duration-200 border border-transparent hover:border-primary-blue/20",
                  pathname === `/${locale}` && "bg-primary-blue/15 text-primary-blue border-primary-blue/20"
                )}
              >
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  {t("Home")}
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Navigation Groups */}
          {navigationGroups.map(renderNavigationGroup)}

          {/* About Link */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href={`/${locale}/about`}
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 hover:text-primary-blue hover:bg-primary-blue/10 focus:bg-primary-blue/15 focus:text-primary-blue focus:outline-none transition-all duration-200 border border-transparent hover:border-primary-blue/20",
                  pathname === `/${locale}/about` && "bg-primary-blue/15 text-primary-blue border-primary-blue/20"
                )}
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {t("About")}
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      {/* Action Items */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <LocalSwitcher />

        {/* Contact Button with Star Border */}
        <StarBorder
          as={Link}
          href={`/${locale}/contact`}
          color="#1A4FE6"
          speed="4s"
          className="text-sm h-10 flex items-center hover:scale-105 transition-transform duration-200"
        >
          <div className={cn(
            "flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-primary-blue transition-colors duration-200",
            pathname === `/${locale}/contact` && "text-primary-blue"
          )}>
            <Headphones className="w-4 h-4" />
            {t("Contact")}
          </div>
        </StarBorder>
      </div>
    </div>
  );
}