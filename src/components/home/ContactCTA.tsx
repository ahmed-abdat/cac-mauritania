"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CONTACT_INFO } from "@/constats/contact-info";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const ContactCTA = () => {
  const t = useTranslations("ContactCTA");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const contactMethods = [
    {
      icon: Phone,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      titleKey: "phone.title",
      descriptionKey: "phone.description",
      action: `tel:${CONTACT_INFO.PRIMARY_PHONE_FULL}`,
      actionText: CONTACT_INFO.PRIMARY_PHONE_FULL,
    },
    {
      icon: WhatsAppIcon,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      titleKey: "whatsapp.title",
      descriptionKey: "whatsapp.description",
      action: `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}`,
      actionText: CONTACT_INFO.PRIMARY_PHONE_FULL,
    },
    {
      icon: Mail,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      titleKey: "email.title",
      descriptionKey: "email.description",
      action: "mailto:cacanktt@gmail.com",
      actionText: "cacanktt@gmail.com",
    },
    {
      icon: MapPin,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      titleKey: "location.title",
      descriptionKey: "location.description",
      action: "https://www.google.com/maps?q=18.1190586090088,-16.0007514953613",
      actionText: t("location.address"),
    },
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="pt-10 pb-6 md:pt-12 md:pb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          title={t("sectionTitle")}
          description={t("sectionDescription")}
          showDecorator={true}
          decoratorColor="cac-blue"
          decoratorVariant="default"
          animationVariant="slide"
        />

        {/* Contact Methods Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="h-full p-6 text-center bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-50 mb-4 transition-transform duration-300 group-hover:scale-110">
                    {method.icon === WhatsAppIcon ? (
                      <WhatsAppIcon className={`w-6 h-6`} size={24} />
                    ) : (
                      <IconComponent
                        className={`w-6 h-6 ${method.iconColor}`}
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t(method.titleKey)}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {t(method.descriptionKey)}
                    </p>

                    <Link
                      href={method.action}
                      target={
                        method.action.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.action.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center justify-center w-full px-3 py-2 rounded-lg font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-200 text-sm"
                    >
                      {method.actionText}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main CTA Section */}
        <motion.div
          className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 lg:p-16 text-center rounded-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {t("mainCTA.title")}
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t("mainCTA.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-semibold px-10 py-4 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {t("mainCTA.contactButton")}
                  {isRtl ? (
                    <ArrowLeft className="w-5 h-5 mr-3" />
                  ) : (
                    <ArrowRight className="w-5 h-5 ml-3" />
                  )}
                </Button>
              </Link>

              <Link href="tel:+22242420762">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/5 font-semibold px-10 py-4 text-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {t("mainCTA.callButton")}
                  <Phone className={cn("w-5 h-5", isRtl ? "mr-3" : "ml-3")} />
                </Button>
              </Link>
            </div>

            <div className="mt-10 p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-gray-600" />
                <h4 className="text-xl font-semibold text-gray-900">
                  {t("businessHours.title")}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div className="text-gray-700 p-4">
                  <div className="font-semibold text-lg mb-2">
                    {t("businessHours.weekdays")}
                  </div>
                  <div className="text-gray-600">
                    {t("businessHours.weekdaysTime")}
                  </div>
                </div>
                <div className="text-gray-700 p-4">
                  <div className="font-semibold text-lg mb-2">
                    {t("businessHours.weekends")}
                  </div>
                  <div className="text-gray-600">
                    {t("businessHours.weekendsTime")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
