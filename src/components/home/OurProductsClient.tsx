"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import ClickWrapper from "../ClickWrapper";
// MeillersProducts removed for CAC transformation
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { motion } from "framer-motion";

interface OurProductsClientProps {
  locale: string;
  products: Product[];
}

const OurProductsClient = ({ locale, products }: OurProductsClientProps) => {
  const t = useTranslations("Products");
  const produc = useTranslations("product");
  const isRTL = locale === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
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

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      className="relative py-12 sm:py-16 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute w-[400px] h-[400px] -top-48 ${
            isRTL ? "-right-48" : "-left-48"
          } bg-primary/5 rounded-full mix-blend-multiply filter blur-2xl animate-blob`}
        />
        <div
          className={`absolute w-[400px] h-[400px] -bottom-48 ${
            isRTL ? "-left-48" : "-right-48"
          } bg-blue-500/5 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000`}
        />
      </div>

      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-[85rem] mx-auto">
          {/* Header Section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4"
            variants={itemVariants}
          >
            <div className="text-center md:text-start max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {t("sectionTitle")}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="w-8 h-0.5 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="shrink-0"
            >
              <ClickWrapper
                locale={locale}
                url="/about"
                className="block"
              >
                <Button
                  variant="default"
                  className="bg-primary hover:bg-primary-blue transition-all duration-300 group px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg"
                >
                  <span className="text-sm font-medium mx-2">
                    {t("viewAll")}
                  </span>
                  <ArrowIcon
                    className={`w-4 h-4 inline-block transform transition-transform duration-200 ${
                      isRTL
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </Button>
              </ClickWrapper>
            </motion.div>
          </motion.div>

          {/* CAC Services Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
          >
            {/* CAC Service Cards */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-primary text-4xl">🏗️</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === "ar" ? "البناء والإنشاءات" : locale === "fr" ? "Construction" : "Construction"}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === "ar" ? "حلول البناء المبتكرة والاستشارات المهنية" : 
                 locale === "fr" ? "Solutions de construction innovantes et conseil professionnel" : 
                 "Innovative construction solutions and professional consulting"}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-green-500 text-4xl">🌱</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === "ar" ? "الطاقة المتجددة" : locale === "fr" ? "Énergies renouvelables" : "Renewable Energy"}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === "ar" ? "حلول الطاقة المستدامة والاستشارات البيئية" : 
                 locale === "fr" ? "Solutions énergétiques durables et conseil environnemental" : 
                 "Sustainable energy solutions and environmental consulting"}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-blue-500 text-4xl">🚀</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === "ar" ? "ريادة الأعمال" : locale === "fr" ? "Entrepreneuriat" : "Entrepreneurship"}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === "ar" ? "دعم الشركات الناشئة والاستشارات التجارية" : 
                 locale === "fr" ? "Soutien aux startups et conseil commercial" : 
                 "Startup support and business consulting"}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default OurProductsClient;
