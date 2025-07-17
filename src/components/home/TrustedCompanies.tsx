"use client";

import React from "react";
import { Image } from "@/components/ui/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const companies = [
  { src: "/companys/somelec.webp", alt: "Somelec" },
  { src: "/companys/taazour.webp", alt: "Taazour" },
  { src: "/companys/sweed.webp", alt: "Sweed" },
  { src: "/companys/snim.webp", alt: "SNIM" },
  { src: "/companys/snde.webp", alt: "SNDE" },
  { src: "/companys/radio.webp", alt: "Radio Mauritanie" },
  { src: "/companys/port.webp", alt: "Port de Tanit" },
  { src: "/companys/ministere.webp", alt: "Ministère" },
  { src: "/companys/gendarmerie.webp", alt: "Gendarmerie" },
  { src: "/companys/bpm.webp", alt: "BPM" },
];

const TrustedCompanies = () => {
  const t = useTranslations("IndexPage");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-64 -left-64 bg-gradient-to-r from-violet-500/10 to-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute w-[600px] h-[600px] -bottom-64 -right-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary/5 to-violet-500/5 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" />
      </div>

      <motion.div 
        className="relative container mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Enhanced Section Header */}
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-16 md:mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            {t("trustedCompaniesHeading")}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-1.5 bg-gradient-to-r from-primary/60 to-primary rounded-full" />
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-primary to-violet-500 animate-pulse" />
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500/60 rounded-full" />
          </div>
        </motion.div>

        {/* Enhanced Companies Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10"
          variants={containerVariants}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative aspect-[4/3] p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-100/80 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-primary/20"
            >
              {/* Logo Container */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={company.src}
                    alt={company.alt}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-contain filter group-hover:brightness-110 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Enhanced Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Enhanced Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 via-violet-500/10 to-blue-500/10 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-primary/10 rounded-tr-[80px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom Decorative Element */}
        <div className="mt-20 flex justify-center">
          <motion.div 
            className="w-32 h-1.5 bg-gradient-to-r from-primary/40 via-violet-500/40 to-blue-500/40 rounded-full"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 128 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default TrustedCompanies;
