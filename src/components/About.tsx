"use client";

import React from "react";
import { Image } from "@/components/ui/image";
import { useTranslations, useLocale } from "next-intl";
import ShineBorder from "@/components/magicui/shine-border";
import { motion } from "framer-motion";
import { Building2, MapPin, Users, Award, Shield, Lightbulb, Recycle, HandHeart, Wrench, Sun, Wheat, Presentation, Cog } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  const t = useTranslations("AboutUs");
  const footerT = useTranslations("Footer");
  const locale = useLocale();
  const isRTL = locale === "ar";

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <motion.div variants={itemVariants} className="relative">
              {/* Single Image - Construction Worker */}
              <motion.div 
                className="relative group w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ShineBorder
                  className="relative flex w-full overflow-hidden rounded-2xl border bg-background shadow-xl aspect-[16/10]"
                  color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src="/about.png"
                    alt={t("PresentationduGroupeCAC")}
                    fill
                    className="object-cover p-[2px] transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                    priority
                  />
                </ShineBorder>

                {/* Optional: Add floating elements for depth */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-gray-100 transition-all duration-300"
            >
              <motion.p 
                className="text-gray-700 leading-relaxed mb-8 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t("CenterforEntrepreneurship")}
              </motion.p>
              
              <motion.div 
                className="space-y-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className={`${isRTL ? 'border-r-4 pr-6 rounded-l-lg' : 'border-l-4 pl-6 rounded-r-lg'} border-primary py-4 bg-primary/5`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("VisionHeader")}</h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{t("CompanyVision")}</p>
                </div>
                <div className={`${isRTL ? 'border-r-4 pr-6 rounded-l-lg' : 'border-l-4 pl-6 rounded-r-lg'} border-blue-500 py-4 bg-blue-50/50`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("MissionHeader")}</h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{t("CompanyMission")}</p>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-gray-700 leading-relaxed mb-8 text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {t("ExperienceDescription")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Project Examples Section */}
      <motion.section
        className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              {t("ProjetsExemples")}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Projet1", "Projet2", "Projet3"].map((projet) => (
              <motion.div
                key={projet}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-500 hover:scale-105"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="w-8 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full group-hover:from-primary group-hover:to-primary/60" />
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{t(projet)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Services Section */}
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
              {t("CoreServices")}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Wrench,
                title: "Service1Title",
                description: "Service1Description",
                color: "text-blue-600",
                bg: "bg-blue-50",
                hoverBg: "group-hover:bg-blue-600"
              },
              {
                icon: Sun,
                title: "Service2Title",
                description: "Service2Description",
                color: "text-orange-600",
                bg: "bg-orange-50",
                hoverBg: "group-hover:bg-orange-600"
              },
              {
                icon: Wheat,
                title: "Service3Title",
                description: "Service3Description",
                color: "text-green-600",
                bg: "bg-green-50",
                hoverBg: "group-hover:bg-green-600"
              },
              {
                icon: Presentation,
                title: "Service4Title",
                description: "Service4Description",
                color: "text-purple-600",
                bg: "bg-purple-50",
                hoverBg: "group-hover:bg-purple-600"
              },
              {
                icon: Cog,
                title: "Service5Title",
                description: "Service5Description",
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                hoverBg: "group-hover:bg-indigo-600"
              },
              {
                icon: HandHeart,
                title: "Service6Title",
                description: "Service6Description",
                color: "text-red-600",
                bg: "bg-red-50",
                hoverBg: "group-hover:bg-red-600"
              }
            ].map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-500 hover:scale-105"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-4 rounded-xl ${service.bg} ${service.color} ${service.hoverBg} group-hover:text-white transition-all duration-500`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {t(service.title)}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                    {t(service.description)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
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
              {t("CoreValues")}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { key: "Value1", icon: Award, color: "text-blue-600", bg: "bg-blue-50", hoverBg: "group-hover:bg-blue-600" },
              { key: "Value2", icon: Shield, color: "text-green-600", bg: "bg-green-50", hoverBg: "group-hover:bg-green-600" },
              { key: "Value3", icon: Lightbulb, color: "text-yellow-600", bg: "bg-yellow-50", hoverBg: "group-hover:bg-yellow-600" },
              { key: "Value4", icon: Recycle, color: "text-emerald-600", bg: "bg-emerald-50", hoverBg: "group-hover:bg-emerald-600" },
              { key: "Value5", icon: HandHeart, color: "text-red-600", bg: "bg-red-50", hoverBg: "group-hover:bg-red-600" }
            ].map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.key}
                  variants={itemVariants}
                  className="group bg-white rounded-xl p-6 border border-gray-100 transition-all duration-500 text-center hover:scale-105"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${value.bg} flex items-center justify-center ${value.hoverBg} group-hover:text-white transition-all duration-500 ${value.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {t(value.key)}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Company Information Section */}
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
              {t("CompanyInformation") || "معلومات الشركة"}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Building2 className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                  {t("CompanyTypeLabel") || "النوع"}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  {t("CompanyType")}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                  {footerT("location") || "الموقع"}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  {t("CompanyLocation")}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                  <Users className="w-6 h-6 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                  {footerT("contactUs") || "اتصل بنا"}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  {t("CompanyContact")}
                </p>
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
              className="bg-white rounded-2xl p-8 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {footerT("location")}
              </h3>
              <p className="text-gray-700 mb-6">{footerT("location")}</p>
              <Link
                href="https://www.google.com/maps?q=18.1190586090088,-16.0007514953613"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl transition-all duration-200 group border border-primary/20"
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
              className="bg-white rounded-2xl p-8 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {footerT("contactUs")}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">{footerT("phone")}: </span>
                  <span dir="ltr">+222 42 42 07 62</span>
                </p>
                <p>
                  <span className="font-medium">{footerT("mobile")}: </span>
                  <span dir="ltr">+222 42 42 07 60</span>
                </p>
                <p>
                  <span className="font-medium">{footerT("email")}: </span>
                  <span dir="ltr">cacanktt@gmail.com</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
