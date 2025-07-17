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
      <BoxReveal boxColor={"#5046e6"} duration={0.3}>
        <SparklesText
          text={title}
          className={cn("text-3xl font-bold mb-4", locale === "ar" ? "text-right" : "text-left")}
          sparklesCount={5}
        />
      </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.4}>
        <p
          className={cn("text-sm md:text-base font-normal mb-4", locale === "ar" ? "text-right" : "text-left")}
        >
          {description}
        </p>
      </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <ClickWrapper 
          locale={locale} 
          url="/about"
          translationKey="aboutLink"
        >
          <Button
            variant="default"
            className="shadow-2xl bg-primary-blue"
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
              {cta}
            </span>
          </Button>
        </ClickWrapper>
      </BoxReveal>
    </>
  );
}
