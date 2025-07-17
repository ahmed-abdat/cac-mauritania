'use client'

import React from "react";
import { Button } from "../ui/button";
import ClickWrapper from "../ClickWrapper";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
// import MeillersProducts from "./MeillersProducts";

interface ProductsSectionProps {
  locale: string;
  products: Product[];
  sectionTitle: string;
  viewAllText: string;
  whatsappMessage: string;
}

const ProductsSection = ({
  locale,
  products,
  sectionTitle,
  viewAllText,
  whatsappMessage
}: ProductsSectionProps) => {
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

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 max-w-7xl mx-auto">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute -bottom-8 right-0 w-72 h-72 bg-primary-blue/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div 
            variants={headerVariants}
            className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
          >
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {sectionTitle}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-12 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full" />
                <div className="w-3 h-3 rounded-full bg-primary-blue" />
                <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-blue/40 rounded-full" />
              </div>
            </div>

            <ClickWrapper
              className="group"
              locale={locale}
              url="/marketplace"
            >
              <Button 
                variant="default" 
                className="relative px-6 py-2 bg-gradient-to-r from-primary to-primary-blue text-white rounded-full 
                  hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  {viewAllText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </ClickWrapper>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            variants={containerVariants}
            className="w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
              sm:gap-x-8 sm:gap-y-12 lg:gap-x-10 lg:gap-y-14"
          >
            {/* <MeillersProducts
              locale={locale as "en" | "ar" | "fr"}
              whatsaapMessage={whatsappMessage}
              products={products}
            /> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection; 