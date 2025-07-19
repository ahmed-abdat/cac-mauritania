"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
  centered?: boolean;
  showDecorator?: boolean;
  decoratorColor?: "primary" | "blue" | "green" | "purple" | "orange" | "cac-primary" | "cac-gradient" | "cac-blue";
  decoratorVariant?: "default" | "triple-line" | "simple" | "gradient";
  variant?: "default" | "large" | "small";
  animation?: boolean;
  gradientText?: boolean;
  rtlSupport?: boolean;
  animationVariant?: "entrance" | "fade" | "scale" | "slide";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  maxWidth = "3xl",
  centered = true,
  showDecorator = false,
  decoratorColor = "primary",
  decoratorVariant = "default",
  variant = "default",
  animation = true,
  gradientText = false,
  rtlSupport = false,
  animationVariant = "entrance",
}) => {
  const getMaxWidthClass = () => {
    const maxWidthClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      full: "max-w-full",
    };
    return maxWidthClasses[maxWidth];
  };

  const getTitleSizeClass = () => {
    const sizeClasses = {
      small: "text-2xl md:text-3xl",
      default: "text-3xl md:text-4xl lg:text-5xl",
      large: "text-4xl md:text-5xl lg:text-6xl",
    };
    return sizeClasses[variant];
  };

  const getResponsiveTitleClass = () => {
    const responsiveClasses = {
      small: "text-[clamp(1.5rem,4vw,2rem)] md:text-[clamp(2rem,5vw,3rem)]",
      default: "text-[clamp(2rem,5vw,3rem)] md:text-[clamp(2.5rem,6vw,4rem)] lg:text-[clamp(3rem,7vw,5rem)]",
      large: "text-[clamp(2.5rem,6vw,4rem)] md:text-[clamp(3rem,7vw,5rem)] lg:text-[clamp(4rem,8vw,6rem)]",
    };
    return responsiveClasses[variant];
  };

  const getDescriptionSizeClass = () => {
    const sizeClasses = {
      small: "text-base md:text-lg",
      default: "text-lg md:text-xl",
      large: "text-xl md:text-2xl",
    };
    return sizeClasses[variant];
  };

  const getDecoratorColors = () => {
    const colors = {
      primary: { from: "from-primary", to: "to-blue-500", dot: "bg-primary" },
      blue: { from: "from-blue-500", to: "to-blue-600", dot: "bg-blue-500" },
      green: { from: "from-green-500", to: "to-emerald-600", dot: "bg-green-500" },
      purple: { from: "from-purple-500", to: "to-indigo-600", dot: "bg-purple-500" },
      orange: { from: "from-orange-500", to: "to-red-600", dot: "bg-orange-500" },
      "cac-primary": { from: "from-primary", to: "to-primary-blue", dot: "bg-primary" },
      "cac-gradient": { from: "from-primary", to: "to-primary-lightBlue", dot: "bg-primary" },
      "cac-blue": { from: "from-primary-blue", to: "to-primary-darkBlue", dot: "bg-primary-blue" },
    };
    return colors[decoratorColor];
  };

  const getGradientTextClass = () => {
    if (!gradientText) return "";
    return "bg-gradient-to-r from-primary via-primary-blue to-primary-lightBlue bg-clip-text text-transparent";
  };

  const getAnimationVariants = () => {
    const variants = {
      entrance: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      },
      fade: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
      },
      scale: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.7,
            ease: "easeOut",
          },
        },
      },
      slide: {
        hidden: { opacity: 0, x: rtlSupport ? 20 : -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      },
    };
    return variants[animationVariant || "entrance"];
  };

  const colors = getDecoratorColors();
  const containerVariants = getAnimationVariants();

  const renderDecorator = () => {
    if (!showDecorator) return null;
    
    const decoratorClass = centered ? "justify-center" : rtlSupport ? "justify-start" : "justify-start";
    
    switch (decoratorVariant) {
      case "triple-line":
        return (
          <div className={`flex items-center gap-2 mt-8 ${decoratorClass}`}>
            <div
              className={cn(
                "w-12 h-1 bg-gradient-to-r rounded-full",
                colors.from + "/40",
                colors.to
              )}
            />
            <div className={cn("w-3 h-3 rounded-full animate-pulse", colors.dot)} />
            <div
              className={cn(
                "w-12 h-1 bg-gradient-to-r rounded-full",
                "from-primary-blue",
                "to-primary-blue/40"
              )}
            />
          </div>
        );
      case "simple":
        return (
          <div className={`flex items-center gap-2 mt-8 ${decoratorClass}`}>
            <div
              className={cn(
                "w-16 h-1 bg-gradient-to-r rounded-full",
                colors.from,
                colors.to
              )}
            />
          </div>
        );
      case "gradient":
        return (
          <div className={`flex items-center gap-2 mt-8 ${decoratorClass}`}>
            <div className="w-20 h-1 bg-gradient-to-r from-primary via-primary-blue to-primary-lightBlue rounded-full" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary-blue animate-pulse" />
            <div className="w-20 h-1 bg-gradient-to-r from-primary-lightBlue via-primary-blue to-primary rounded-full" />
          </div>
        );
      default:
        return (
          <div className={`flex items-center gap-3 mt-8 ${decoratorClass}`}>
            <div
              className={cn(
                "w-20 h-1 bg-gradient-to-r rounded-full",
                colors.from,
                colors.to
              )}
            />
            <div className={cn("w-3 h-3 rounded-full animate-pulse", colors.dot)} />
            <div
              className={cn(
                "w-20 h-1 bg-gradient-to-r rounded-full",
                colors.from,
                colors.to
              )}
            />
          </div>
        );
    }
  };

  const content = (
    <div
      className={cn(
        getMaxWidthClass(),
        centered && "mx-auto text-center",
        rtlSupport && "rtl:text-right",
        "mb-16 md:mb-20",
        className
      )}
    >
      {/* Title */}
      <h2
        className={cn(
          getTitleSizeClass(),
          "font-bold text-gray-900 mb-6 leading-tight",
          gradientText && getGradientTextClass(),
          titleClassName
        )}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={cn(
            getDescriptionSizeClass(),
            "text-gray-600 leading-relaxed",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}

      {/* Decorator */}
      {renderDecorator()}
    </div>
  );

  if (animation) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default SectionHeader;