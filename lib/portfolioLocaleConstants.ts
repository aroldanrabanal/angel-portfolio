import type { Locale } from "@/types/portfolio";

export const LOCALE_COOKIE = "portfolio-locale";
export const LOCALE_STORAGE_KEY = "portfolio-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "es";
}
