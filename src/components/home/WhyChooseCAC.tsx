"use client";

import React from "react";
import { Card, CardContent } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { 
  Shield, 
  Award, 
  Globe, 
  Zap, 
  Users, 
  Leaf,
  CheckCircle,
  Star,
  Eye,
  Lightbulb,
  TreePine,
  Heart
} from 'lucide-react';
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const WhyChooseCAC = () => {
  const t = useTranslations("WhyChooseCAC");
  
  const advantages = [
    {
      icon: Shield,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      titleKey: "professionalism.title",
      descriptionKey: "professionalism.description",
      features: ["scientificApproach", "qualityAssurance", "transparency", "reliability"]
    },
    {
      icon: Award,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      titleKey: "expertise.title",
      descriptionKey: "expertise.description",
      features: ["modernEquipment", "latestTechnology", "certifications", "continuousLearning"]
    },
    {
      icon: Globe,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      gradientFrom: "from-purple-500",
      gradientTo: "to-indigo-600",
      titleKey: "comprehensive.title",
      descriptionKey: "comprehensive.description",
      features: ["allServices", "singleSource", "integratedSolutions", "endToEnd"]
    },
    {
      icon: Zap,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-orange-600",
      titleKey: "innovation.title",
      descriptionKey: "innovation.description",
      features: ["cuttingEdge", "futureReady", "digitalSolutions", "smartApproach"]
    },
    {
      icon: Users,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      gradientFrom: "from-red-500",
      gradientTo: "to-rose-600",
      titleKey: "local.title",
      descriptionKey: "local.description",
      features: ["localKnowledge", "internationalStandards", "culturalSensitivity", "communityFocused"]
    },
    {
      icon: Leaf,
      iconColor: "text-teal-600",
      bgColor: "bg-teal-50",
      gradientFrom: "from-teal-500",
      gradientTo: "to-green-600",
      titleKey: "sustainability.title",
      descriptionKey: "sustainability.description",
      features: ["environmentalCare", "renewableEnergy", "sustainablePractices", "futureGeneration"]
    }
  ];

  const stats = [
    {
      number: "8+",
      label: t("stats.serviceCategories"),
      icon: Star,
      color: "text-primary"
    },
    {
      number: "24/7",
      label: t("stats.support"),
      icon: Shield,
      color: "text-blue-600"
    },
    {
      number: "100%",
      label: t("stats.quality"),
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      number: "∞",
      label: t("stats.possibilities"),
      icon: Zap,
      color: "text-yellow-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          title={t("sectionTitle")}
          description={t("sectionDescription")}
          showDecorator={true}
          decoratorColor="cac-primary"
          animationVariant="entrance"
        />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Advantages Grid with Modern Layout */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 relative z-10 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
                  (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                  index < 4 && "lg:border-b dark:border-neutral-800"
                )}
              >
                {/* Gradient Overlay */}
                {index < 4 && (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
                )}
                {index >= 4 && (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
                )}

                {/* Icon */}
                <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${advantage.gradientFrom || 'from-primary'} ${advantage.gradientTo || 'to-blue-600'} shadow-sm group-hover/feature:shadow-md group-hover/feature:scale-110 transition-all duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <div className="text-lg font-bold mb-2 relative z-10 px-10">
                  <div className={`absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-gradient-to-b ${advantage.gradientFrom || 'group-hover/feature:from-primary'} ${advantage.gradientTo || 'group-hover/feature:to-blue-600'} transition-all duration-200 origin-center`} />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {t(advantage.titleKey)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 mb-4">
                  {t(advantage.descriptionKey)}
                </p>

                {/* Features List */}
                <div className="space-y-2 relative z-10 px-10">
                  {advantage.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className={`w-3 h-3 ${advantage.iconColor}`} />
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                        {t(`features.${feature}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Section - Company Values */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="p-8 md:p-12">
            <SectionHeader
              title={t("values.title")}
              description={t("values.description")}
              variant="small"
              showDecorator={true}
              decoratorColor="cac-gradient"
              decoratorVariant="simple"
              animation={false}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { key: 'professionalism', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-500/10' },
                { key: 'transparency', icon: Eye, color: 'text-green-600', bg: 'bg-green-500/10' },
                { key: 'innovation', icon: Lightbulb, color: 'text-purple-600', bg: 'bg-purple-500/10' },
                { key: 'sustainability', icon: TreePine, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
                { key: 'community', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-500/10' }
              ].map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={index}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`relative mx-auto flex aspect-square size-16 rounded-2xl border before:absolute before:-inset-2 before:rounded-2xl before:border dark:border-white/10 dark:before:border-white/5 ${value.bg} group-hover:shadow-lg transition-all duration-300`}>
                      <IconComponent className={`m-auto size-7 ${value.color} group-hover:scale-110 transition-transform duration-300`} strokeWidth={1.5} />
                    </div>
                    <div className="mt-4 space-y-1">
                      <span className="block text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {t(`values.${value.key}`)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseCAC;