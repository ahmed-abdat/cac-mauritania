import React from "react";
import { Image } from "@/components/ui/image";
import LocalSwitcher from "@/components/header/local-switcher";
import { useTranslations } from "next-intl";
import DockDemo from "./Docke";
import Link from "next/link";
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
          <Image src="/logo.jpg" alt="CAC Logo" width={80} height={80} />
          <p className="mt-4">
            CAC - مركز الريادة والاستشارات
            <br />
            {t("location")}
          </p>
          <div className="mt-4">
            <Link
              href="https://maps.app.goo.gl/EgMSVd6i2fsrZLdT9?g_st=aw"
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
            <span>{t("phone")}: </span>00222-42022255
            <br />
            <span>{t("mobile")}: </span>00222-42022244
            <br />
            <span>{t("email")}: </span>info@cacmauritanie.mr
          </p>
        </div>
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">{t("services")}</h2>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="text-white hover:text-gray-100 transition-all duration-150 block py-1"
                >
                  {link.title}
                </Link>
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
