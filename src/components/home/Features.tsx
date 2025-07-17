"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Lightbulb, Truck, Building2, Award } from "lucide-react";

const Features = () => {
  const t = useTranslations("Features");

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

  const features = [
    {
      title: t("feature1Title"),
      description: t("feature1Description"),
      icon: Lightbulb,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      hoverBorderColor: "hover:border-yellow-500/40",
    },
    {
      title: t("feature2Title"),
      description: t("feature2Description"),
      icon: Truck,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      hoverBorderColor: "hover:border-blue-500/40",
    },
    {
      title: t("feature3Title"),
      description: t("feature3Description"),
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      hoverBorderColor: "hover:border-primary/40",
    },
    {
      title: t("feature4Title"),
      description: t("feature4Description"),
      icon: Award,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      hoverBorderColor: "hover:border-green-500/40",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-64 -left-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute w-[500px] h-[500px] -bottom-64 -right-64 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t("sectionTitle")}
          </h2>
          <p className="text-gray-600 md:text-lg">{t("sectionDescription")}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border ${feature.borderColor} ${feature.hoverBorderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div
                className={`inline-flex p-4 rounded-xl ${feature.bgColor} ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              {/* Decorative corner */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${feature.bgColor} opacity-20 rounded-bl-full -z-10 transition-opacity duration-300 group-hover:opacity-30`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
