import React from "react";
import { MoveRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { Image } from "@/components/ui/image";
import { Link } from "@/i18n/routing";
import { BlurFade } from "@/components/magicui/blur-fade";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { RippleButton } from "@/components/magicui/ripple-button";

export default async function Hero({
  locale,
}: {
  locale: Locale;
}) {
  const t = await getTranslations("IndexPage");

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 items-center lg:grid-cols-2 lg:gap-20">
          <div className="flex gap-4 sm:gap-6 flex-col">
            
            <div className="flex gap-4 sm:gap-6 flex-col">
              <div className="space-y-4">
                <BlurFade delay={0.1} inView duration={0.3}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-2xl tracking-tight font-bold leading-tight text-slate-900 dark:text-white will-change-[opacity,transform]">
                    <span className="text-primary font-bold">
                      {t("title")}
                    </span>
                  </h1>
                </BlurFade>
                
                <BlurFade delay={0.15} inView duration={0.3}>
                  {/* Single streamlined description */}
                  <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl will-change-[opacity,transform]">
                    {t("description")}
                  </p>
                </BlurFade>
              </div>
            </div>
            
            <BlurFade delay={0.2} inView duration={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 will-change-[opacity,transform]">
                <Link href="/contact">
                  <PulsatingButton 
                    className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all duration-300 px-6 py-3 text-base font-medium rounded-lg"
                    pulseColor="59, 130, 246"
                    duration="0.8s"
                  >
                    <div className="flex items-center gap-2 justify-center">
                      {t("contactUs")}
                      <Mail className="w-4 h-4" />
                    </div>
                  </PulsatingButton>
                </Link>
                <Link href="/about">
                  <RippleButton 
                    className="w-full border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 hover:translate-y-[-1px] transition-all duration-300 px-6 py-3 text-base font-medium rounded-lg"
                    rippleColor="59, 130, 246"
                    duration="400ms"
                  >
                    <div className="flex items-center gap-2 justify-center">
                      {t("CTA")}
                      <MoveRight className={locale === "ar" ? "w-4 h-4 rotate-180" : "w-4 h-4"} />
                    </div>
                  </RippleButton>
                </Link>
              </div>
            </BlurFade>

          </div>
          
          <BlurFade delay={0.25} inView duration={0.3}>
            <div className="relative will-change-[opacity,transform]">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-slate-100 dark:bg-slate-800">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/hero.webp"
                    alt="CAC Services"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105 will-change-transform"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>
              
              {/* Optimized decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/8 rounded-full blur-xl animate-pulse will-change-[opacity,transform]" style={{animationDuration: '2s'}} />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-pulse will-change-[opacity,transform]" style={{animationDuration: '3s', animationDelay: '1s'}} />
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
