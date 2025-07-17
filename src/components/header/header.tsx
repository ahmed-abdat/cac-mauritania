import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Image } from "@/components/ui/image";
import { ModernHeader } from "./ModernHeader";
import { ModernMobileNav } from "./ModernMobileNav";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

export default function Header({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const topNav = useTranslations("TopNav");
  const isRTL = locale === "ar";

  return (
    <nav className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg transition-all duration-300 ${className}`}>
      <div className="px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            aria-label="CAC Home Page"
            title="Return to CAC Homepage"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="bg-white shadow-lg p-2 rounded-xl border border-gray-200">
              <Image
                src="/logo.jpg"
                width={40}
                height={40}
                alt="CAC Logo"
                className="w-10 h-10 object-cover rounded-lg"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-gray-900">CAC</span>
              <span className="text-xs text-gray-600">
                {isRTL ? "مركز الريادة والاستشارات" : locale === "fr" ? "Centre d'Entrepreneuriat" : "Entrepreneurship Center"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ModernHeader locale={locale} />

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Phone Button */}
            <Button
              size="sm"
              className="bg-gray-50 hover:bg-gray-100 text-gray-900 hover:text-primary-blue shadow-sm hover:shadow-md transition-all duration-200 border border-gray-300 hover:border-primary-blue/50"
              asChild
            >
              <Link
                href="tel:+22242022255"
                aria-label="Call CAC Customer Support"
                title="Call Our Customer Support"
                className="flex items-center gap-2"
              >
                <Phone className={`w-4 h-4 ${isRTL ? "order-last" : "order-first"}`} />
                <span className="hidden sm:inline">{topNav("CallUs")}</span>
              </Link>
            </Button>

            {/* Mobile Menu */}
            <ModernMobileNav locale={locale} />
          </div>
        </div>
      </div>
    </nav>
  );
}
