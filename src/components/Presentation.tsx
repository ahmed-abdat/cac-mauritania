import { useTranslations } from "next-intl";
import React from "react";
import PresentaionClient from "./PresentationClient";
import { MediaItem } from "@/types/presentation";



export default function Presentation({
  slug,
  locale,
  images,
}: {
  slug: string;
  locale?: string;
  images: MediaItem[] | [];
}) {
  const t = useTranslations(slug);
  return (
    <PresentaionClient
      images={images}
      title={t("title")}
      slug={slug}
      locale={locale}
      CTA={t("CTA")}
      description={t("description")}
    />
  );
}
