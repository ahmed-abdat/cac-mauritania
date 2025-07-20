import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { useTranslations } from "next-intl";
import { contactKeywords } from "@/constats/keywords";
import { siteConfig } from "@/config/site";

interface ContactProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ContactProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("contactForm");

  return {
    title: t("title"),
    description: t("companyName"),
    keywords: contactKeywords,
    openGraph: {
      title: t("title"),
      description: t("companyName"),
      url: `${siteConfig.url}/${locale}/contact`,
      type: "website",
      images: [
        {
          url: `/og-image.jpeg`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      siteName: siteConfig.name,
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t("title"),
      description: t("companyName"),
      images: ['/og-image.jpeg'],
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/contact`,
      languages: {
        'en': `${siteConfig.url}/en/contact`,
        'fr': `${siteConfig.url}/fr/contact`,
        'ar': `${siteConfig.url}/ar/contact`,
      },
    },
  };
}

export default function Page({ params }: ContactProps) {
  const t = useTranslations("contactForm");
  const translations = {
    title: t("title"),
    firstName: t("firstName"),
    lastName: t("lastName"),
    companyName: t("companyName"),
    email: t("email"),
    phoneNumber: t("phoneNumber"),
    message: t("message"),
    submit: t("submit"),
    getInTouch: t("getInTouch"),
    visitUs: t("visitUs"),
    visitDescription: t("visitDescription"),
    chatToUs: t("chatToUs"),
    chatDescription: t("chatDescription"),
    callUs: t("callUs"),
    callDescription: t("callDescription"),
    socialMedia: t("socialMedia"),
    emailAddress: t("emailAddress"),
    phone: t("phone"),
    firstNamePlaceholder: t("firstNamePlaceholder"),
    lastNamePlaceholder: t("lastNamePlaceholder"),
    companyNamePlaceholder: t("companyNamePlaceholder"),
    emailPlaceholder: t("emailPlaceholder"),
    phoneNumberPlaceholder: t("phoneNumberPlaceholder"),
    messagePlaceholder: t("messagePlaceholder"),
    validation: {
      firstNameRequired: t("validation.firstNameRequired"),
      lastNameRequired: t("validation.lastNameRequired"),
      emailRequired: t("validation.emailRequired"),
      emailInvalid: t("validation.emailInvalid"),
      phoneRequired: t("validation.phoneRequired"),
      phoneMinLength: t("validation.phoneMinLength"),
      messageRequired: t("validation.messageRequired"),
    },
    notifications: {
      sending: t("notifications.sending"),
      emailSentSuccess: t("notifications.emailSentSuccess"),
      emailSentSuccessDescription: t(
        "notifications.emailSentSuccessDescription"
      ),
      errorPrefix: t("notifications.errorPrefix"),
      unexpectedErrorPrefix: t("notifications.unexpectedErrorPrefix"),
      tryAgainLater: t("notifications.tryAgainLater"),
    },
  };

  return (
    <>
      <h1 className="sr-only">{translations.title}</h1>
      <ContactForm translations={translations} />
    </>
  );
}
