import React from "react";
import { Image } from "@/components/ui/image";
import LocalSwitcher from "@/components/header/local-switcher";
import { useTranslations } from "next-intl";
import DockDemo from "./Docke";
import { CONTACT_INFO } from "@/constats/contact-info";
import Link from "next/link";
import { Link as I18nLink } from "@/i18n/routing";
import { MapPin } from "lucide-react";

const Footer: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");

  const footerLinks = [
    { title: nav("Ready Build"), href: "/ready-construction" },
    { title: nav("Construction"), href: "/regular-construction" },
    { title: nav("Energy"), href: "/renewable-energy" },
    { title: nav("Agriculture"), href: "/agriculture" },
  ];

  return (
    <footer className="bg-primary-blue text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <Image src="/logo.webp" alt="CAC Logo" width={80} height={80} />
          <p className="mt-4">
            CAC - مركز الريادة والاستشارات
            <br />
            {t("location")}
          </p>
          <div className="mt-4">
            <Link
              href="https://www.google.com/maps?q=18.1190586090088,-16.0007514953613"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white hover:text-gray-100 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-200">
                <MapPin className="w-5 h-5 flex-shrink-0" />
              </div>
              <span className="font-medium group-hover:underline">
                {t("viewOnMap")}
              </span>
            </Link>
          </div>
          <DockDemo />
        </div>
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">{t("contactUs")}</h2>
          <p>
            <span>{t("phone")}: </span><span dir="ltr">{CONTACT_INFO.PRIMARY_PHONE_FULL}</span>
            <br />
            <span>{t("email")}: </span>{CONTACT_INFO.EMAIL}
          </p>
        </div>
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">{t("services")}</h2>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <I18nLink
                  href={link.href}
                  className="text-white hover:text-gray-100 transition-all duration-150 block py-1"
                >
                  {link.title}
                </I18nLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold mb-4">{t("switchLanguage")}</h2>
          <LocalSwitcher variant="footer" />
        </div>
      </div>
      <div className="text-center mt-8">
        <p dir="rtl">
          &copy; {new Date().getFullYear()} CAC | مركز الريادة والاستشارات.{" "}
          {t("allRightsReserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
