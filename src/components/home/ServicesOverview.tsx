"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Sun, 
  Wheat, 
  Users, 
  Lightbulb, 
  Target, 
  Heart,
  Zap 
} from 'lucide-react';
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const ServicesOverview = () => {
  const t = useTranslations("Services");
  
  const services = [
    {
      icon: Building2,
      iconColor: "text-blue-600",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      titleKey: "construction.title",
      descriptionKey: "construction.description",
      features: ["traditionalConstruction", "prefabConstruction", "securityRooms", "caravans"],
      status: "Active",
      colSpan: 2
    },
    {
      icon: Sun,
      iconColor: "text-yellow-600",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-orange-600",
      titleKey: "energy.title",
      descriptionKey: "energy.description",
      features: ["solarPower", "windPower", "hybridSystems", "maintenance"],
      status: "Popular"
    },
    {
      icon: Wheat,
      iconColor: "text-green-600",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      titleKey: "agriculture.title",
      descriptionKey: "agriculture.description",
      features: ["hydroponics", "irrigation", "livestock", "feedCultivation"],
      status: "Growing"
    },
    {
      icon: Users,
      iconColor: "text-purple-600",
      gradientFrom: "from-purple-500",
      gradientTo: "to-indigo-600",
      titleKey: "conferences.title",
      descriptionKey: "conferences.description",
      features: ["eventPlanning", "conferenceHall", "seminars", "workshops"],
      status: "Premium"
    },
    {
      icon: Lightbulb,
      iconColor: "text-indigo-600",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-purple-600",
      titleKey: "entrepreneurship.title",
      descriptionKey: "entrepreneurship.description",
      features: ["startupSupport", "businessConsulting", "investmentSolutions", "mentorship"],
      status: "Featured"
    },
    {
      icon: Target,
      iconColor: "text-red-600",
      gradientFrom: "from-red-500",
      gradientTo: "to-rose-600",
      titleKey: "strategic.title",
      descriptionKey: "strategic.description",
      features: ["developmentSolutions", "researchBased", "structuralChallenges", "sustainability"],
      status: "Strategic"
    },
    {
      icon: Heart,
      iconColor: "text-pink-600",
      gradientFrom: "from-pink-500",
      gradientTo: "to-red-600",
      titleKey: "charity.title",
      descriptionKey: "charity.description",
      features: ["scientificCouncil", "humanitarianSupport", "communityProjects", "sustainableImpact"],
      status: "Impact"
    },
    {
      icon: Zap,
      iconColor: "text-orange-600",
      gradientFrom: "from-orange-500",
      gradientTo: "to-red-600",
      titleKey: "innovation.title",
      descriptionKey: "innovation.description",
      features: ["modernTechnology", "digitalSolutions", "processOptimization", "futureReady"],
      status: "Future"
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
    <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          title={t("sectionTitle")}
          description={t("sectionDescription")}
          showDecorator={true}
          decoratorColor="cac-gradient"
          decoratorVariant="gradient"
          gradientText={true}
          animationVariant="entrance"
        />

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "group relative p-6 rounded-2xl overflow-hidden transition-all duration-300",
                  "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
                  "shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-white/20",
                  "hover:-translate-y-1 will-change-transform",
                  service.colSpan === 2 ? "md:col-span-2" : "col-span-1"
                )}
              >

                <div className="relative flex flex-col space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight transition-colors duration-300">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium transition-colors duration-300">
                      {t(service.descriptionKey)}
                    </p>
                  </div>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 backdrop-blur-sm transition-all duration-200 font-medium"
                      >
                        #{t(`features.${feature}`)}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesOverview;