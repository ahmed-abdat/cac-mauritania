import React from "react";
import { getMeillersProducts } from "@/app/action";
import OurProductsClient from "./OurProductsClient";
import { Locale } from "@/i18n/routing"; 

interface OurProductsProps {
  locale: Locale; 
}

const OurProducts = async ({ locale }: OurProductsProps) => {
  // Fetch products on the server
  const products = await getMeillersProducts();

  // Pass data to client component
  return <OurProductsClient locale={locale} products={products} />;
};

export default OurProducts;
