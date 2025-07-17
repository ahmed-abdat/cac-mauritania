import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatePrice(price: number | string) {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  return `${numericPrice.toFixed(0)} MRU`;
}