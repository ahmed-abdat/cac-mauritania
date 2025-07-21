"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createFormSchema,
  FormData,
  ValidationMessages,
} from "@/types/formSchema";
import { sendEmail } from "@/app/action";
import { toast } from "sonner";
import DockDemo from "./Docke";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

interface ContactFormProps {
  translations: {
    title: string;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    message: string;
    submit: string;
    getInTouch: string;
    visitUs: string;
    visitDescription: string;
    chatToUs: string;
    chatDescription: string;
    callUs: string;
    callDescription: string;
    socialMedia: string;
    emailAddress: string;
    phone: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    companyNamePlaceholder: string;
    emailPlaceholder: string;
    phoneNumberPlaceholder: string;
    messagePlaceholder: string;
    validation: ValidationMessages;
    notifications: {
      sending: string;
      emailSentSuccess: string;
      emailSentSuccessDescription: string;
      errorPrefix: string;
      unexpectedErrorPrefix: string;
      tryAgainLater: string;
    };
  };
}

export function ContactForm({ translations }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const footerT = useTranslations("Footer");

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  // Create the form schema with translated validation messages
  const FormSchema = createFormSchema(translations.validation);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const result = await sendEmail(data);
      if (result.success) {
        toast.success(translations.notifications.emailSentSuccess, {
          description: translations.notifications.emailSentSuccessDescription,
        });
        form.reset();
      } else {
        toast.error(
          `${translations.notifications.errorPrefix}: ${result.error}`
        );
      }
    } catch (error: any) {
      toast.error(
        `${translations.notifications.unexpectedErrorPrefix}: ${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:py-0">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-6">
        <div className="md:w-1/2 p-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-4">{translations.getInTouch}</h2>
          <dl>
            <dt className="font-semibold mb-2">{translations.visitUs}</dt>
            <dd className="mb-4">{translations.visitDescription}</dd>

            {/* Google Maps Button */}
            <div className="mb-6">
              <Link
                href="https://www.google.com/maps?q=18.1190586090088,-16.0007514953613"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 group border border-white/20 hover:border-white/40"
              >
                <div className="p-1 rounded bg-white/20 group-hover:bg-white/30 transition-all duration-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">
                  {footerT("viewOnMap")}
                </span>
              </Link>
            </div>

            <dt className="font-semibold mb-2">{translations.chatToUs}</dt>
            <dd className="mb-4">{translations.chatDescription}</dd>
            <dt className="font-semibold mb-2">{translations.callUs}</dt>
            <dd className="mb-4">{translations.callDescription}</dd>
            <dt className="font-semibold mb-2">{translations.socialMedia}</dt>
            <dd>
              <DockDemo />
            </dd>
          </dl>
        </div>

        <div className="md:w-1/2 p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-6">{translations.title}</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-x-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel htmlFor="firstName">
                        {translations.firstName}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="firstName"
                          placeholder={translations.firstNamePlaceholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel htmlFor="lastName">
                        {translations.lastName}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          placeholder={translations.lastNamePlaceholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="companyName">
                      {translations.companyName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="companyName"
                        placeholder={translations.companyNamePlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">{translations.email}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder={translations.emailPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phoneNumber">
                      {translations.phoneNumber}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="phoneNumber"
                        placeholder={translations.phoneNumberPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="message">
                      {translations.message}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder={translations.messagePlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? translations.notifications.sending
                  : translations.submit}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
