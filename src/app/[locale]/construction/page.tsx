import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Locale } from "@/i18n/routing";
import { ConstructionProjectsGrid } from "@/components/construction/ConstructionProjectsGrid";

interface ConstructionPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ConstructionPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ConstructionProjects' });

  const title = t('allProjectsTitle', { defaultValue: 'All Construction Projects' });
  const description = t('allProjectsDescription', { 
    defaultValue: 'Explore our complete portfolio of construction projects showcasing quality craftsmanship and innovative design across ready construction and regular construction categories.' 
  });

  return {
    title: `${title} | CAC - مركز الريادة والاستشارات`,
    description,
    keywords: [
      'CAC construction projects',
      'ready construction Mauritania',
      'regular construction Mauritania',
      'building construction CAC',
      'مشاريع البناء CAC',
      'البناء الجاهز موريتانيا',
      'البناء العادي موريتانيا',
    ],
    openGraph: {
      title: `${title} | CAC - مركز الريادة والاستشارات`,
      description,
      url: `https://cacmauritanie.mr/${locale}/construction`,
      type: "website",
      images: [
        {
          url: '/og-image.jpeg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `/${locale}/construction`,
      languages: {
        en: `/en/construction`,
        fr: `/fr/construction`,
        ar: `/ar/construction`,
      },
    },
  };
}

export default async function ConstructionPage({ params }: ConstructionPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ConstructionProjects' });
  const typedLocale = locale as Locale;

  const title = t('allProjectsTitle', { defaultValue: 'All Construction Projects' });

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <ConstructionProjectsGrid locale={typedLocale} />
    </>
  );
}