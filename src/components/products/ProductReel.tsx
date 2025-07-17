// src/components/ProductReel.tsx

"use client";

import Link from "next/link";
import ProductListing from "./ProductListing";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  products?: Product[];
  category?: string;
  locale: string;
  isCenter? : boolean;
  mainRoute?: string;
}


const ProductReel = (props: ProductReelProps) => {
  const { title, mainRoute, products, locale , isCenter , category} = props;

  const productsToDisplay = products || [];

  return (
    <section className={cn("py-10 md:py-16 mx-auto px-4", {
      'py-0 md:py-0' : isCenter
    })}>
        <div className={cn("md:flex md:items-center md:justify-between mb-4", {
          'md:justify-center' : isCenter
        })}>
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0 w-full">
          {title && productsToDisplay.length > 0 ? (
            <h2 className={cn("text-2xl text-center md:text-right font-bold text-gray-900 sm:text-3xl", {
              'text-center text-4xl' : isCenter,
              'text-3xl' : locale === 'ar'
            })}>
              {title}
            </h2>
          ) : null}
        </div>
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 md:gap-y-10 lg:gap-x-8 lg:grid-cols-4">
            {productsToDisplay.map((product, i) => {
              return (
                <ProductListing
                  key={`product-${i}`}
                  product={product as Product}
                  index={i}
                  locale={locale as 'en' | 'ar' | 'fr'}
                  mainRoute={mainRoute}
                  categoryID={category}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
