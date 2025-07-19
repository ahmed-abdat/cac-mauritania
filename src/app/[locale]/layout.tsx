import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { locales } from "@/i18n/routing";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { RB, roboto, tajawal } from "@/app/font/font";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { layoutKeywords } from "@/constats/keywords";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import ReactPlugin from "@stagewise-plugins/react";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
      languages: {
        en: `/en`,
        fr: `/fr`,
        ar: `/ar`,
      },
    },
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: layoutKeywords,
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      locale: locale,
      type: "website",
    },
    twitter: {
      title: siteConfig.name,
      description: siteConfig.description,
      card: "summary_large_image",
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const isRtl = locale === "ar";

  // Use getMessages instead of direct import
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          isRtl
            ? `${RB.className} ${tajawal.className} overflow-x-hidden`
            : `${roboto.className} overflow-x-hidden`
        )}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Suspense fallback={<div>Loading header...</div>}>
            <Header locale={locale} />
          </Suspense>
          <main>
            <Suspense fallback={<div>Loading content...</div>}>
              {children}
            </Suspense>
          </main>
          <Toaster position="top-center" richColors />
          <Suspense fallback={<div>Loading footer...</div>}>
            <Footer locale={locale} />
          </Suspense>

          {/* Stagewise Toolbar - Only renders in development mode */}
          {process.env.NODE_ENV === "development" && (
            <StagewiseToolbar
              config={{
                plugins: [ReactPlugin],
              }}
            />
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
