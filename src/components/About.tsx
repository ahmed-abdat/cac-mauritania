"use client";

import React from "react";
import { Image } from "@/components/ui/image";
import { useTranslations } from "next-intl";
import ShineBorder from "@/components/magicui/shine-border";
import { motion } from "framer-motion";
import { Building2, Leaf, MapPin, Zap, Factory, Users, Heart, Award, Shield, Lightbulb, Recycle, HandHeart, Wrench, Sun, Wheat, Presentation, Cog, TreePine } from "lucide-react";
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div variants={itemVariants} className="relative space-y-6">
              {/* First Image - Construction Worker */}
              <motion.div 
                className="relative group"
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
              </motion.div>

              {/* Second Image - Building/Construction Site */}
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ShineBorder
                  className="relative flex w-full overflow-hidden rounded-2xl border bg-background shadow-xl aspect-[16/10]"
                  color={["#FE8FB5", "#FFBE7B", "#A07CFE"]}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src="/about.webp"
                    alt={t("PresentationduGroupeCAC")}
                    fill
                    className="object-cover p-[2px] transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  />
                </ShineBorder>

                {/* Optional: Add floating elements for depth */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
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
                className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gray-50/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">{t("CompanyType")}</p>
                </div>
                <div className="bg-gray-50/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">{t("CompanyLocation")}</p>
                </div>
                <div className="bg-gray-50/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">{t("CompanyContact")}</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">رؤيتنا</h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{t("CompanyVision")}</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50/50 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">رسالتنا</h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{t("CompanyMission")}</p>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-gray-700 leading-relaxed mb-8 text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {t("ExperienceDescription")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  {t("ProjetsExemples")}
                </h2>
                <div className="space-y-4">
                  {["Projet1", "Projet2", "Projet3"].map((projet, index) => (
                    <motion.div
                      key={projet}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-all duration-300 hover:shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: 5 }}
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
            </motion.div>
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
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:scale-105"
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
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.key}
                  variants={itemVariants}
                  className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 text-center hover:scale-105"
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
              <p className="text-gray-700 mb-6">شارع الشيخ زايد / تفرغ زينة، نواكشوط، موريتانيا</p>
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
                  +222 42 42 07 62
                </p>
                <p>
                  <span className="font-medium">{footerT("mobile")}: </span>
                  +222 42 42 07 60
                </p>
                <p>
                  <span className="font-medium">{footerT("email")}: </span>
                  cacanktt@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
