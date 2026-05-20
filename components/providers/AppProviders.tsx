"use client";

import type { Locale } from "@/types/portfolio";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";

type Props = {
  children: React.ReactNode;
  defaultLocale?: Locale;
};

export function AppProviders({ children, defaultLocale }: Props) {
  return <LocaleProvider defaultLocale={defaultLocale}>{children}</LocaleProvider>;
}
