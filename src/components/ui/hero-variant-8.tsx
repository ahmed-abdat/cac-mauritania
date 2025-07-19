import React from "react";
import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";
import Link from "next/link";

interface HeroVariant8Props {
  locale: Locale;
}

export default async function HeroVariant8({ locale }: HeroVariant8Props) {
  const t = await getTranslations("IndexPage");

  return (
    <main>
      <section className="overflow-hidden bg-white dark:bg-slate-900">
        <div className="relative mx-auto px-6 py-28 lg:py-20">
          <div className={cn(
            "lg:flex lg:items-center lg:gap-12",
            locale === "ar" ? "lg:flex-row-reverse" : ""
          )}>
            <div className={cn(
              "relative z-10 mx-auto max-w-2xl text-center lg:w-1/2",
              locale === "ar" ? "lg:text-right lg:mr-0" : "lg:text-left lg:ml-0"
            )}>
              <Link
                href={locale === "ar" ? "/ar/about" : locale === "fr" ? "/fr/about" : "/en/about"}
                className={cn(
                  "rounded-lg mx-auto flex w-fit items-center gap-2 border border-primary-blue/20 bg-primary-blue/5 p-1 backdrop-blur-sm hover:border-primary-blue/30 hover:bg-primary-blue/10 transition-all duration-300",
                  locale === "ar" ? "lg:mr-0 flex-row-reverse pr-1 pl-3" : "lg:ml-0 pr-3 pl-1"
                )}
              >
                <span className="bg-primary-blue rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs text-white font-medium">
                  {locale === "ar" ? "جديد" : locale === "fr" ? "Nouveau" : "New"}
                </span>
                <span className="text-sm font-medium text-primary-blue">
                  {locale === "ar" ? "الإنشاءات المعاصرة" : locale === "fr" ? "Construction Contemporaine" : "Contemporary Construction"}
                </span>
                <span className="bg-border block h-4 w-px"></span>
                <ArrowRight className={cn(
                  "size-4 text-primary-blue",
                  locale === "ar" ? "rotate-180" : ""
                )} />
              </Link>

              <h1 className={cn(
                "mt-10 text-balance text-4xl font-bold md:text-5xl lg:text-6xl xl:text-6xl leading-tight text-slate-900 dark:text-white",
                locale === "ar" ? "text-right font-black" : "text-left"
              )}>
                {t("title")}
              </h1>
              
              <p className={cn(
                "mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl",
                locale === "ar" ? "text-right font-medium mx-auto lg:mr-0" : "text-left mx-auto lg:ml-0"
              )}>
                {t("description")}
              </p>

              <div className={cn(
                "mt-10 flex flex-col sm:flex-row gap-4 justify-center",
                locale === "ar" ? "lg:justify-end" : "lg:justify-start"
              )}>
                <Button
                  size="lg"
                  className="bg-primary-blue hover:bg-primary-darkBlue text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  {t("CTA")}
                  <MoveRight className={cn(
                    "size-5",
                    locale === "ar" ? "mr-2 rotate-180" : "ml-2"
                  )} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-blue/20 hover:border-primary-blue/40 hover:bg-primary-blue/5 transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  {locale === "ar" ? "تعرف على المزيد" : locale === "fr" ? "En savoir plus" : "Learn More"}
                  <ArrowRight className={cn(
                    "size-5",
                    locale === "ar" ? "mr-2 rotate-180" : "ml-2"
                  )} />
                </Button>
              </div>

              <div className={cn(
                "mt-12",
                locale === "ar" ? "text-right" : "text-left"
              )}>
                <ul className="space-y-3 text-muted-foreground">
                  <li className={cn(
                    "flex items-center gap-3",
                    locale === "ar" ? "flex-row-reverse" : ""
                  )}>
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-base font-medium">
                      {locale === "ar" ? "حلول سريعة ومبتكرة" : locale === "fr" ? "Solutions rapides et innovantes" : "Fast & Innovative Solutions"}
                    </span>
                  </li>
                  <li className={cn(
                    "flex items-center gap-3",
                    locale === "ar" ? "flex-row-reverse" : ""
                  )}>
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-base font-medium">
                      {locale === "ar" ? "فريق عمل متخصص" : locale === "fr" ? "Équipe spécialisée" : "Expert Team"}
                    </span>
                  </li>
                  <li className={cn(
                    "flex items-center gap-3",
                    locale === "ar" ? "flex-row-reverse" : ""
                  )}>
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-base font-medium">
                      {locale === "ar" ? "دعم على مدار الساعة" : locale === "fr" ? "Support 24/7" : "24/7 Support"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 -mx-4 rounded-3xl p-3 lg:col-span-3">
            <div aria-hidden className={cn(
              "absolute z-[1] inset-0",
              locale === "ar" ? "bg-gradient-to-l from-white dark:from-slate-900 from-35%" : "bg-gradient-to-r from-white dark:from-slate-900 from-35%"
            )} />
            <div className="relative">
              <div className="absolute inset-0 bg-primary-blue/10 rounded-3xl blur-3xl"></div>
              <Image
                src="/hero.png"
                alt="CAC Services Illustration"
                width={2796}
                height={2008}
                className={cn(
                  "relative w-full h-auto rounded-3xl shadow-lg object-cover",
                  locale === "ar" ? "scale-x-[-1]" : ""
                )}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}