import React from "react";
import { MoveRight, PhoneCall, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";

interface HeroVariant4Props {
  locale: Locale;
}

export default async function HeroVariant4({ locale }: HeroVariant4Props) {
  const t = await getTranslations("IndexPage");

  return (
    <div className="w-full py-10 lg:py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex gap-6 flex-col", locale === "ar" ? "lg:order-2" : "")}>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                {locale === "ar" ? "نحن متاحون الآن!" : locale === "fr" ? "Nous sommes en ligne!" : "We're live!"}
              </Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {locale === "ar" ? "تقييم 5 نجوم" : locale === "fr" ? "5 étoiles" : "5-star rated"}
                </span>
              </div>
            </div>
            
            <div className="flex gap-6 flex-col">
              <h1 className={cn(
                "text-4xl md:text-5xl lg:text-6xl max-w-2xl tracking-tight font-bold text-slate-900 dark:text-white leading-tight",
                locale === "ar" ? "text-right font-black" : "text-left"
              )}>
                {t("title")}
              </h1>
              
              <p className={cn(
                "text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-xl",
                locale === "ar" ? "text-right font-medium" : "text-left"
              )}>
                {t("description")}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gap-4 bg-primary-blue hover:bg-primary-darkBlue text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4"
              >
                <PhoneCall className="w-5 h-5" />
                {locale === "ar" ? "اتصل بنا" : locale === "fr" ? "Appelez-nous" : "Call us now"}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="gap-4 border-2 border-primary-blue/20 hover:border-primary-blue/40 hover:bg-primary-blue/5 transform hover:scale-105 transition-all duration-300 px-8 py-4"
              >
                {t("CTA")}
                <MoveRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Simple feature list */}
            <div className={cn(
              "mt-8 space-y-3",
              locale === "ar" ? "text-right" : "text-left"
            )}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                <span className="text-muted-foreground">
                  {locale === "ar" ? "500+ عميل راضٍ" : locale === "fr" ? "500+ Clients satisfaits" : "500+ Happy Clients"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                <span className="text-muted-foreground">
                  {locale === "ar" ? "10+ سنة خبرة" : locale === "fr" ? "10+ Années d'expérience" : "10+ Years Experience"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                <span className="text-muted-foreground">
                  {locale === "ar" ? "99% معدل النجاح" : locale === "fr" ? "99% Taux de réussite" : "99% Success Rate"}
                </span>
              </div>
            </div>
          </div>
          
          <div className={cn("relative", locale === "ar" ? "lg:order-1" : "")}>
            <div className="relative rounded-3xl overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-800">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/hero.png"
                  alt="CAC Services"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
            
            {/* Subtle floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-blue/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-blue/8 rounded-full blur-2xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </div>
  );
}