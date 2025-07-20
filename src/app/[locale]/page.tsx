import HeroContainer from '@/components/home/HeroContainer';
import ServicesOverview from '@/components/home/ServicesOverview';
import WhyChooseCAC from '@/components/home/WhyChooseCAC';
import TrustedCompanies from '@/components/home/TrustedCompanies';
import ContactCTA from '@/components/home/ContactCTA';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/routing';
import StructuredData from '@/components/seo/StructuredData';
import { organizationSchema, websiteSchema } from '@/lib/structured-data';

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IndexPage' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://cacmauritanie.mr/${locale}`,
      siteName: 'CAC',
      images: [
        {
          url: '/opengraph-image.jpeg',
          width: 1200,
          height: 630,
          alt: 'CAC',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/opengraph-image.jpeg'],
    },
    alternates: {
      canonical: `https://cacmauritanie.mr/${locale}`,
      languages: {
        'en': 'https://cacmauritanie.mr/en',
        'fr': 'https://cacmauritanie.mr/fr',
        'ar': 'https://cacmauritanie.mr/ar',
      },
    },
  };
}

export default async function Home({
  params
}: Readonly<HomeProps
>) {
  const { locale } = await params;
  // Cast the locale string to the Locale type
  const typedLocale = locale as Locale;
  
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={organizationSchema} id="organization-schema" />
      <StructuredData data={websiteSchema} id="website-schema" />
      
      <HeroContainer locale={typedLocale} />
      <ServicesOverview />
      <WhyChooseCAC />
      <TrustedCompanies />
      <ContactCTA />
    </>
  );
}
