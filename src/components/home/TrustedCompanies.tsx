"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CustomersSection } from "@/components/ui/customers-section";
import SectionHeader from "@/components/ui/SectionHeader";

const companies = [
  { src: "/companys/somelec.webp", alt: "Somelec", height: 20 },
  { src: "/companys/taazour.webp", alt: "Taazour", height: 24 },
  { src: "/companys/sweed.webp", alt: "Sweed", height: 18 },
  { src: "/companys/snim.webp", alt: "SNIM", height: 22 },
  { src: "/companys/snde.webp", alt: "SNDE", height: 20 },
  { src: "/companys/radio.webp", alt: "Radio Mauritanie", height: 16 },
  { src: "/companys/port.webp", alt: "Port de Tanit", height: 18 },
  { src: "/companys/ministere.webp", alt: "Ministère", height: 24 },
  { src: "/companys/gendarmerie.webp", alt: "Gendarmerie", height: 20 },
  { src: "/companys/bpm.webp", alt: "BPM", height: 22 },
];

const TrustedCompanies = () => {
  const t = useTranslations("TrustedCompanies");

  return (
    <section className="bg-gray-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t("sectionTitle")}
          description={t("sectionDescription")}
          showDecorator={true}
          decoratorColor="cac-primary"
          decoratorVariant="triple-line"
          gradientText={true}
          animationVariant="fade"
        />
        <div className="mt-12 md:mt-16">
          <CustomersSection
            customers={companies}
            className="bg-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;