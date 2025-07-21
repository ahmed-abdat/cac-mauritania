import React from "react";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { Image } from "@/components/ui/image";

export default async function Hero({
  locale,
}: {
  locale: Locale;
}) {
  const t = await getTranslations("IndexPage");

  return (
    <div className="w-full py-10 md:py-12 lg:py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">
          <div className="flex gap-6 flex-col">
            
            <div className="flex gap-6 flex-col">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-2xl tracking-tight font-bold leading-tight text-slate-900 dark:text-white">
                  <span className="text-primary font-bold">
                    {t("title")}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium">
                  {t("subtitle")}
                </p>
              </div>
              
              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-xl">
                {t("description")}
              </p>
              
              <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {t("heroServices")}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gap-4 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 px-8 py-4"
              >
                {t("callNow")}
                <PhoneCall className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="gap-4 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 hover:translate-y-[-2px] transition-all duration-300 px-8 py-4"
              >
                {t("CTA")}
                <MoveRight className={locale === "ar" ? "w-5 h-5 rotate-180" : "w-5 h-5"} />
              </Button>
            </div>

          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-slate-100 dark:bg-slate-800">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/hero.png"
                  alt="CAC Services"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
            
            {/* Micro-interactions - floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/8 rounded-full blur-2xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
