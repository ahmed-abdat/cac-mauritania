'use client'

import { Product } from "@/types/product";
import { PromosDisplay } from "@/types/promotion";
import { Image } from "@/components/ui/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { whatsappUrl } from "@/constats/whatsapp-url";
import { formatePrice } from "@/lib/utils";
import { motion } from "framer-motion";

interface CarouselItemProps {
  item: PromosDisplay | Product;
  locale: "en" | "fr" | "ar";
  CTA: string;
}

const CarouselItemComponent = ({ item, locale, CTA }: CarouselItemProps) => {
  const isPromotion = "image" in item;
  const image = isPromotion ? item.image : item.images[0];
  const title = item.title[locale];
  const price = item.price;
  const oldPrice = item.oldPrice;

  return (
    <div className="relative w-full h-full group">
      <Image
        src={image.url}
        alt={image.name}
        fill
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className={`text-2xl md:text-3xl font-bold ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
            {title}
          </h2>
          <div className={`flex items-center text-lg ${locale === 'ar' ? 'justify-end' : 'justify-start'}`}>
            {oldPrice && (
              <span className={`line-through text-gray-300 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                {formatePrice(oldPrice)}
              </span>
            )}
            {price && (
              <span className="text-white font-semibold">
                {formatePrice(price)}
              </span>
            )}
          </div>
          <Link
            href={`${whatsappUrl}${title} *${formatePrice(price || "0")}*`}
            passHref
            className="block w-full"
          >
            <Button
              variant="default"
              className="w-full bg-primary hover:bg-primary-blue transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl py-6"
            >
              <span className="text-base font-medium mx-2">
                {CTA}
              </span>
              <motion.span
                className={`inline-block ${locale === 'ar' ? 'rotate-180' : ''}`}
                animate={{ x: locale === 'ar' ? -5 : 5 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                →
              </motion.span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CarouselItemComponent; 