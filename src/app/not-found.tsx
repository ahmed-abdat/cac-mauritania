import { ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '404 - Page Not Found | CAC - مركز الريادة والاستشارات',
  description: 'The page you are looking for could not be found. Return to CAC homepage to explore our services.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  openGraph: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for could not be found.',
    type: 'website',
  },
};

export default async function NotFound() {
  // Get translations for accessibility and not found page
  const a11y = await getTranslations("Accessibility");
  const t = await getTranslations("NotFound");

  return (
    <html>
      <body className="text-center">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <header className="absolute top-0 left-0 right-0 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link
                href="/"
                passHref
                aria-label={a11y("homeLink")}
                title={a11y("homeTitle")}
              >
                <span className="inline-block">
                  <Image
                    src="/logo.jpg"
                    width={120}
                    height={120}
                    alt="logo"
                    className="object-cover"
                  />
                </span>
              </Link>
            </div>
          </header>
          <div className="text-center">
            <h1 className="text-9xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">{t("title")}</p>
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white opacity-20 blur"></div>
              <p className="relative z-10 text-lg px-6 py-3">
                {t("description")}
              </p>
            </div>
            <Link
              href="/"
              passHref
              aria-label={a11y("homeLink")}
              title={a11y("homeTitle")}
            >
              <span className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 items-center mx-auto inline-flex cursor-pointer">
                <ArrowLeft className="mr-2" />
                {t("goBack")}
              </span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
