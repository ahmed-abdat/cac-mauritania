import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutUs from "@/components/About";
import { aboutKeywords } from "@/constats/keywords";
import { siteConfig } from "@/config/site";

interface AboutProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: AboutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutUs" });

  return {
    title: t("PresentationduGroupeCAC"),
    description: t("Description"),
    keywords: aboutKeywords,
    openGraph: {
      title: t("PresentationduGroupeCAC"),
      description: t("Description"),
      url: `${siteConfig.url}/${locale}/about`,
      type: "website",
      images: [
        {
          url: `/about.webp`,
          width: 1200,
          height: 630,
          alt: t("PresentationduGroupeCAC"),
        },
      ],
    },
  };
}

export default async function AboutPage({ params }: AboutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutUs" });

  return (
    <>
      <h1 className="sr-only">{t("PresentationduGroupeCAC")}</h1>
      <AboutUs />
    </>
  );
}
