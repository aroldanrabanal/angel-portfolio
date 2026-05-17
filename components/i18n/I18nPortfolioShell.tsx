"use client";

import type { Portfolio } from "@/types/portfolio";
import { PortfolioShell } from "@/components/PortfolioShell";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Props = {
  dataEn: Portfolio;
  dataEs: Portfolio;
};

export function I18nPortfolioShell({ dataEn, dataEs }: Props) {
  const { locale } = useLocale();
  const data = locale === "es" ? dataEs : dataEn;
  return <PortfolioShell data={data} />;
}
