"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BrandsGrid } from "@/components/ui/brands";

const companies = [
  { name: "Somelec", logo: "/companys/somelec.webp" },
  { name: "Taazour", logo: "/companys/taazour.webp" },
  { name: "Sweed", logo: "/companys/sweed.webp" },
  { name: "SNIM", logo: "/companys/snim.webp" },
  { name: "SNDE", logo: "/companys/snde.webp" },
  { name: "Radio Mauritanie", logo: "/companys/radio.webp" },
  { name: "Port de Tanit", logo: "/companys/port.webp" },
  { name: "Ministère", logo: "/companys/ministere.webp" },
  { name: "Gendarmerie", logo: "/companys/gendarmerie.webp" },
  { name: "BPM", logo: "/companys/bpm.webp" },
];

const TrustedCompaniesSimple = () => {
  const t = useTranslations("IndexPage");

  return (
    <BrandsGrid
      title={t("trustedCompaniesHeading")}
      brands={companies}
      className="bg-gray-50"
    />
  );
};

export default TrustedCompaniesSimple;