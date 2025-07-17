import React, { Suspense } from 'react';
import Hero from './Hero';
import { Locale } from '@/i18n/routing';
import HeroSkeleton from './HeroSkeleton';

function HeroContainer({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <Hero locale={locale} />
    </Suspense>
  );
}

export default HeroContainer;