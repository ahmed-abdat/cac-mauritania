'use client';

import React from 'react';
import { Button } from "../ui/button";
import BoxReveal from "@/components/magicui/box-reveal";
import SparklesText from "../magicui/sparkles-text";
import ClickWrapper from "../ClickWrapper";
import { Locale } from "@/i18n/routing";
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface HeroAnimationsProps {
  title: string;
  description: string;
  cta: string;
  locale: Locale;
}

export default function HeroAnimations({ 
  title, 
  description, 
  cta, 
  locale 
}: HeroAnimationsProps) {
  const a11y = useTranslations('Accessibility');
  
  return (
    <>
      <BoxReveal boxColor={"#1A4FE6"} duration={0.3}>
        <SparklesText
          text={title}
          className={cn("text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-primary-lightBlue bg-clip-text text-transparent", locale === "ar" ? "text-right" : "text-left")}
          sparklesCount={8}
        />
      </BoxReveal>
      <BoxReveal boxColor={"#1A4FE6"} duration={0.4}>
        <p
          className={cn("text-base md:text-lg lg:text-xl font-medium mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto", locale === "ar" ? "text-right" : "text-left")}
        >
          {description}
        </p>
      </BoxReveal>
      <BoxReveal boxColor={"#1A4FE6"} duration={0.5}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <ClickWrapper 
            locale={locale} 
            url="/about"
            translationKey="aboutLink"
          >
            <Button
              variant="default"
              className="shadow-2xl bg-gradient-to-r from-primary-blue to-primary-lightBlue hover:from-primary-darkBlue hover:to-primary-blue transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-lg"
            >
              <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                {cta}
              </span>
            </Button>
          </ClickWrapper>
          <ClickWrapper 
            locale={locale} 
            url="/services"
            translationKey="servicesLink"
          >
            <Button
              variant="outline"
              className="shadow-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-lg"
            >
              <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                {locale === "ar" ? "خدماتنا" : locale === "fr" ? "Nos Services" : "Our Services"}
              </span>
            </Button>
          </ClickWrapper>
        </div>
      </BoxReveal>
    </>
  );
}
