import React, { Suspense } from "react";
import { Image } from "../ui/image";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";

// Import client components
import HeroAnimations from "./HeroAnimations";

export default async function Hero({
  locale,
}: {
  locale: Locale;
}) {
  const t = await getTranslations("IndexPage");

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.webp"
          alt={t("title")}
          fill
          priority
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="object-cover w-full h-full"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="sr-only">{t("title")}</h1>
            
            {/* Client component with animations wrapped in Suspense */}
            <Suspense fallback={
              <div className="space-y-6">
                <div className="h-16 bg-white/10 animate-pulse rounded-lg"></div>
                <div className="h-24 bg-white/10 animate-pulse rounded-lg"></div>
                <div className="h-12 w-40 bg-white/10 animate-pulse rounded-lg mx-auto"></div>
              </div>
            }>
              <HeroAnimations 
                title={t("title")}
                description={t("description")}
                cta={t("CTA")}
                locale={locale}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-sm mt-2 opacity-75">
            {locale === "ar" ? "اكتشف المزيد" : locale === "fr" ? "Découvrir" : "Discover"}
          </span>
        </div>
      </div>
    </section>
  );
}
