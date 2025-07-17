// src/components/ProductListing.tsx

"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn, formatePrice } from "@/lib/utils";
import ImageSlider from "@/components/ImageSlider";
import { Product } from "@/types/product";
import ClickWrapper from "../ClickWrapper";
import { whatsappUrl } from "@/constats/whatsapp-url";
import { useTranslations } from 'next-intl';

interface ProductListingProps {
  product: Product;
  index: number;
  locale: 'en' | 'ar' | 'fr';
  mainRoute?: string;
  isMeillersProducts?: boolean;
  categoryID?: string;
  whatsaapMessage?: string;
}

const ProductListing = ({ product, index, locale , mainRoute , isMeillersProducts , categoryID , whatsaapMessage}: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const t = useTranslations('health');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const validUrls = product.images.map((image) => image.url);

  if (isVisible && product) {
    return (
      <>
      {
        isMeillersProducts ? (
          <Link
          className={cn("invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5": isVisible,
          })}
          href={`${whatsappUrl}${whatsaapMessage}*${product.title[locale]}* ${product.price ? `*${formatePrice(product.price)}*` : ''}`}
          target="_blank"
        >
          <div className="flex flex-col w-full relative">
            <ImageSlider urls={validUrls} />
            <span
              className={cn(
                "absolute top-1 px-1.5 py-1 left-1 w-fit text-sm z-10 rounded-full font-medium",
                {
                  "bg-red-200 text-red-900": !product.stock,
                  "bg-green-300 text-green-900": product.stock,
                }
              )}
            >
              {" "}
              {product.stock ? t('inStock') : t('outOfStock')}
            </span>
  
            <h3 className="text-lg font-semibold mb-2 mt-2">{product.title[locale]}</h3>
            {
              product.specification && product.price && <hr className="my-2" />
            }
            <div className="flex justify-between text-sm">
              <div className="w-1/2 px-2">
                {
                  product.specification && <p className="flex flex-col space-y-1">
                  <span className="text-gray-600 text-xs uppercase tracking-wide">{t('specification')}:</span>
                  <span className="font-medium">{product.specification}</span>
                </p>
                }
              </div>
              <div className="w-1/2 px-2">
                {
                  product.price && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-600 text-xs uppercase tracking-wide">{t('price')}:</span>
                      <span className="font-medium text-primary">
                        {formatePrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatePrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  )
                }
              </div>
            </div>
            {/* <ClickWrapper
              locale={locale}
              url={`/marketplace/${product.id}`}
              className="absolute bottom-0 left-0 w-full"
            >
              <Button
                variant="default"
                className="rounded-lg w-full hover:bg-primary-darkBlue transition-all duration-150"
              >
                discover
              </Button>
            </ClickWrapper> */}
          </div>
        </Link>
        ) : (
          <ClickWrapper
          className={cn("invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5": isVisible,
          })}
          locale={locale}
          url={ `/${mainRoute || 'marketplace'}/${product.id}${categoryID ? `?category=${categoryID}` : ''}`}
        >
          <div className="flex flex-col w-full relative">
            <ImageSlider urls={validUrls} />
            <span
              className={cn(
                "absolute top-1 px-1.5 py-1 left-1 w-fit text-sm z-10 rounded-full font-medium",
                {
                  "bg-red-200 text-red-900": !product.stock,
                  "bg-green-300 text-green-900": product.stock,
                }
              )}
            >
              {" "}
              {product.stock ? t('inStock') : t('outOfStock')}
            </span>
  
            <h3 className="text-lg font-semibold mb-2 mt-2">{product.title[locale]}</h3>
            {
              product.specification && product.price && <hr className="my-2" />
            }
            <div className="flex justify-between text-sm">
              <div className="w-1/2 px-2">
                {
                  product.specification && <p className="flex flex-col space-y-1">
                  <span className="text-gray-600 text-xs uppercase tracking-wide">{t('specification')}:</span>
                  <span className="font-medium">{product.specification}</span>
                </p>
                }
              </div>
              <div className="w-1/2 px-2">
                {
                  product.price && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-600 text-xs uppercase tracking-wide">{t('price')}:</span>
                      <span className="font-medium text-primary">
                        {formatePrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatePrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  )
                }
              </div>
            </div>
            {/* <ClickWrapper
              locale={locale}
              url={`/marketplace/${product.id}`}
              className="absolute bottom-0 left-0 w-full"
            >
              <Button
                variant="default"
                className="rounded-lg w-full hover:bg-primary-darkBlue transition-all duration-150"
              >
                discover
              </Button>
            </ClickWrapper> */}
          </div>
        </ClickWrapper>
        )
      }
      </>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductListing;
