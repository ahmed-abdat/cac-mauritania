"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";
import { PromosDisplay, Promotion } from "@/types/promotion";
import Meteors from "./magicui/meteors";
import { Button } from "./ui/button";
import { cn, formatePrice } from "@/lib/utils";
import Link from "next/link";
import { whatsappUrl } from "@/constats/whatsapp-url";
import { Product } from "@/types/product";
import { Locale } from "@/i18n/routing";

interface PromotionalCarouselProps {
  promotions: PromosDisplay[];
  products?: Product[];
  locale: Locale;
  CTA: string;
}

const PromotionalCarousel: React.FC<PromotionalCarouselProps> = ({
  promotions,
  products = [],
  locale,
  CTA,
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, playOnInit: true, stopOnInteraction: true })
  );

  const items = promotions.length > 0 ? promotions : products;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative overflow-hidden text-white h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      onMouseOut={() => plugin.current.play()}
      dir={locale == "ar" ? "ltr" : "ltr"}
    >
      <CarouselContent className="w-full h-[60dvh] md:h-[65dvh] lg:h-[80dvh] m-0">
        {items.map((item, index) => {
          const isPromotion = "image" in item;
          const image = isPromotion
            ? (item as PromosDisplay).image
            : (item as Product).images[0];
          const title = isPromotion
            ? (item as PromosDisplay).title[locale as "en" | "fr" | "ar"]
            : (item as Product).title[locale as "en" | "fr" | "ar"];
          const price = isPromotion
            ? (item as PromosDisplay).price
            : (item as Product).price;
          const oldPrice = isPromotion
            ? (item as PromosDisplay).oldPrice
            : (item as Product).oldPrice;

          return (
            <CarouselItem
              key={index}
              className="flex justify-center items-center h-full p-0"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white rounded-none">
                  <h2 className={cn("text-2xl font-bold mb-2", {
                      "text-right": locale === "ar",
                      "text-left": locale === "fr" || locale === "en",
                    })}
                  >
                    {title}
                  </h2>
                  <div
                    className={cn("flex items-center text-lg mb-4", {
                      "justify-end": locale === "ar",
                      "justify-start": locale === "fr" || locale === "en",
                    })}
                  >
                    {oldPrice && (
                      <span
                        className={cn("line-through text-gray-300 mr-2", {
                          "mr-2 ": locale === "ar",
                          "ml-2 ": locale === "fr" || locale === "en",
                        })}
                      >
                        {formatePrice(oldPrice)}
                      </span>
                    )}
                    {price && (
                      <span
                        className={cn("text-white", {
                          "mr-2 text-right": locale === "ar",
                          "ml-2 text-left": locale === "fr" || locale === "en",
                        })}
                      >
                        {formatePrice(price)}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`${whatsappUrl}${title} *${formatePrice(
                      price || "0"
                    )}*`}
                    passHref
                    className="w-full"
                  >
                    <Button
                      variant="default"
                      className="w-full px-6 py-2 bg-blue-700 text-white rounded-full transition-all duration-150 hover:bg-blue-800"
                    >
                      <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white lg:text-lg">
                        {CTA}
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default PromotionalCarousel;
