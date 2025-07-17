import localFont from "next/font/local";
import { Tajawal, Roboto } from "next/font/google";

export const RB = localFont({
  src: "./RB-Regular.ttf",
  variable: "--font-rb",
});



export const tajawal = Tajawal({
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
  fallback: ["system-ui", "arial"],
});


export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});