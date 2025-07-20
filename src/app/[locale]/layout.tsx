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
    title: {
      template: `%s | ${siteConfig.name}`,
      default: siteConfig.name,
    },
    description: siteConfig.description,
    keywords: layoutKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: locale === 'ar' ? '/' : `/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr', 
        'ar': '/ar',
        'x-default': '/ar', // Arabic as default
      },
    },
    openGraph: {
      title: {
        template: `%s | ${siteConfig.name}`,
        default: siteConfig.name,
      },
      description: siteConfig.description,
      siteName: siteConfig.name,
      locale: locale,
      type: 'website',
      url: locale === 'ar' ? siteConfig.url : `${siteConfig.url}/${locale}`,
      images: [
        {
          url: '/og-image.jpeg',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        template: `%s | ${siteConfig.name}`,
        default: siteConfig.name,
      },
      description: siteConfig.description,
      images: ['/og-image.jpeg'],
      creator: '@CACMauritania', // Add if you have Twitter
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add Google Search Console verification when available
      // google: 'your-google-verification-code',
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
    <html 
      lang={locale} 
      dir={locale === "ar" ? "rtl" : "ltr"}
      prefix="og: https://ogp.me/ns#"
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Viewport meta for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1E40AF" />
        <meta name="msapplication-TileColor" content="#1E40AF" />
        
        {/* Disable automatic phone number detection */}
        <meta name="format-detection" content="telephone=no" />
      </head>
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
