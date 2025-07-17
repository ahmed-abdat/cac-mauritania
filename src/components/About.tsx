"use client";

import React from "react";
import { Image } from "@/components/ui/image";
import { useTranslations } from "next-intl";
import ShineBorder from "@/components/magicui/shine-border";
import { motion } from "framer-motion";
import { Building2, Leaf, Stethoscope, MapPin } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  const t = useTranslations("AboutUs");
  const footerT = useTranslations("Footer");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <motion.section
        className="relative py-16 md:py-24 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-64 -left-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute w-[500px] h-[500px] -bottom-64 -right-64 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("PresentationduGroupeCAC")}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants} className="relative group">
              <ShineBorder
                className="relative flex w-full overflow-hidden rounded-2xl border bg-background shadow-xl aspect-[16/10] md:aspect-[4/3]"
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/about.webp"
                  alt={t("PresentationduGroupeCAC")}
                  fill
                  className="object-cover p-[2px] transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  priority
                />
              </ShineBorder>

              {/* Optional: Add floating elements for depth */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <p className="text-gray-700 leading-relaxed mb-6">
                {t("CenterforEntrepreneurship")}
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                {t("ExperienceDescription")}
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {t("ProjetsExemples")}
              </h2>
              <div className="space-y-4">
                {["Projet1", "Projet2", "Projet3"].map((projet, index) => (
                  <motion.div
                    key={projet}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium">{t(projet)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Sections */}
      <motion.section
        className="py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t("SecteurPrive")}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t("EnergieSolaire")}
                </h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>{t("Energie24h")}</p>
                <p>{t("EnergieHybride")}</p>
                <p>{t("EnergieQuotidienne")}</p>
                <p>{t("ProjetsEnergie")}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t("ElevageAgriculture")}
                </h3>
              </div>
              <p className="text-gray-700">{t("CACAGRO")}</p>
              <p className="text-gray-700 mt-4">{t("CACAGRODescription")}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Medical Section */}
      <motion.section
        className="py-16 md:py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t("CACMedical")}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "UnitesUrgents",
              "UnitesMaternite",
              "UnitesIntegrees",
              "UnitesVaccination",
              "UnitesSang",
              "CliniqueDentaire",
            ].map((unite, index) => (
              <motion.div
                key={unite}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t(unite)}
                  </h3>
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t("AppareilsExamen")}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Radio",
                  "ECG",
                  "ECO",
                  "MaterielLaboratoire",
                  "LitsFauteuils",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-gray-700">{t(item)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {footerT("contactUs")}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {footerT("location")}
              </h3>
              <p className="text-gray-700 mb-6">{footerT("location")}</p>
              <Link
                href="https://maps.app.goo.gl/EgMSVd6i2fsrZLdT9?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl transition-all duration-200 group shadow-lg hover:shadow-xl border border-primary/20"
              >
                <div className="p-1 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-semibold group-hover:scale-105 transition-transform duration-200">
                  {footerT("viewOnMap")}
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {footerT("contactUs")}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">{footerT("phone")}: </span>
                  +222 42 02 22 55
                </p>
                <p>
                  <span className="font-medium">{footerT("mobile")}: </span>
                  +222 42 02 22 44
                </p>
                <p>
                  <span className="font-medium">{footerT("email")}: </span>
                  info@groupembirim.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
