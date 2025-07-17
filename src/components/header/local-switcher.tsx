"use client";

import { useLocale, useTranslations } from "next-intl";
import { Locale, usePathname, useRouter, routing } from "@/i18n/routing";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: "English", flag: "/flags/en.svg" },
  { code: "fr", name: "Français", flag: "/flags/fr.svg" },
  { code: "ar", name: "العربية", flag: "/flags/ar.svg" },
] as const;

type Props = {
  label?: string;
  className?: string;
  variant?: "default" | "footer";
};

export default function LocalSwitcher({ label, className, variant = "default" }: Props) {
  const t = useTranslations("LocaleSwitcher");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  function onSelectChange(nextLocale: string) {
    // Preserve any query parameters when switching languages
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params, query },
      { locale: nextLocale as Locale }
    );
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <Select defaultValue={currentLocale} onValueChange={onSelectChange}>
        <SelectTrigger
          className={cn(
            "h-9 w-[120px]",
            variant === "footer"
              ? "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:text-primary-blue border border-gray-200 hover:border-primary-blue/30 shadow-sm",
            className
          )}
          aria-label={label || t("select-language")}
        >
          <SelectValue>
            {currentLanguage && (
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 overflow-hidden rounded-sm">
                  <Image
                    src={currentLanguage.flag}
                    alt={`${currentLanguage.code} flag`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className={cn("text-sm font-medium line-clamp-1")}>
                  {currentLanguage.name}
                </span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="end" className="w-[120px]">
          {routing.locales.map((locale) => {
            const lang = languages.find((l) => l.code === locale);
            if (!lang) return null;

            return (
              <SelectItem
                key={locale}
                value={locale}
                className="py-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 overflow-hidden rounded-sm">
                    <Image
                      src={lang.flag}
                      alt={`${lang.code} flag`}
                      fill
                      className="object-cover"
    
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium line-clamp-1",
                      lang.code === "ar" && "font-ibm-arabic"
                    )}
                  >
                    {lang.name}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
