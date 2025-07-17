import React from "react";
import { MediaGallery } from "@/components/media";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { MediaItem } from "@/types/presentation";
import { getGalaryMedia } from "@/app/action";
import { presentations } from "@/constats/presentation";

interface GalaryProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: GalaryProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `/${slug}` });

  const mediaData: MediaItem[] = await getGalaryMedia(slug);

  const title = t("title");
  const description = t("title");

  const images = mediaData
    .filter(
      (item): item is MediaItem & { type: "image" } => item.type === "image"
    )
    .map((item) => ({
      url: item.url,
      width: 1200,
      height: 630,
      alt: title,
    }));

  return {
    title: `${title} | CAC - مركز الريادة والاستشارات`,
    description,
    keywords: [
      `CAC ${title}`,
      `${title} at CAC`,
      `مركز الريادة ${title}`,
      `Learn more about ${title}`,
    ],
    openGraph: {
      title: `${title} | CAC - مركز الريادة والاستشارات`,
      description,
      url: `https://cacmauritanie.mr/${locale}/${slug}`,
      type: "website",
      images: images.length > 0 ? images : undefined,
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

export default async function Page({ params }: GalaryProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: `/${slug}` });

  const title = t("title");

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <MediaGallery slug={slug} title={title} />
    </>
  );
}

// Generate static params for all CAC categories
export async function generateStaticParams() {
  return Object.keys(presentations).map((slug) => ({
    slug,
  }));
}