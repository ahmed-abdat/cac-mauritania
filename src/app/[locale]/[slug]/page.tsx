import React from "react";
import { Metadata } from "next";
import Presentation from "@/components/Presentation";
import { getPresentationImages } from "@/app/action";
import { presentations } from "@/constats/presentation";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const presentation = presentations[slug] || "";
  const messages = await import(`../../../../messages/${locale}.json`);

  return {
    title: messages[`Navigation`][presentation] || presentation,
    description:
      messages[`Navigation`][presentation] ||
      `Learn more about ${presentation} at CAC`,
    keywords: [
      `CAC ${presentation}`,
      `${presentation} at CAC`,
      `مركز الريادة ${presentation}`,
      `Learn more about ${presentation}`,
    ],
    openGraph: {
      title: messages[`Navigation`][presentation] || presentation,
      description:
        messages[`Navigation`][presentation] ||
        `Learn more about ${presentation} at CAC`,
      url: `https://cacmauritanie.mr/${locale}/${slug}`,
      type: "website",
      images: [
        {
          url: `/hero.webp`,
          width: 1200,
          height: 630,
          alt: messages[`Navigation`][presentation] || presentation,
        },
      ],
    },
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        en: `/en/${slug}`,
        fr: `/fr/${slug}`,
        ar: `/ar/${slug}`,
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  const presentation = presentations[slug] || "";

  if (!presentation) {
    return notFound();
  }
  
  const images = await getPresentationImages(slug);

  return (
    <>
      <h1 className="sr-only">{presentation}</h1>
      <Presentation images={images} slug={slug} locale={locale} />
    </>
  );
}

// Generate static params for all CAC categories
export async function generateStaticParams() {
  return Object.keys(presentations).map((slug) => ({
    slug,
  }));
}