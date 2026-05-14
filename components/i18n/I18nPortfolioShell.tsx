"use client";

import type { Portfolio } from "@/types/portfolio";
import { PortfolioShell } from "@/components/PortfolioShell";
import { LocaleProvider, useLocale } from "@/components/i18n/LocaleProvider";

type Props = {
  dataEn: Portfolio;
  dataEs: Portfolio;
};

function ResolvedShell({ dataEn, dataEs }: Props) {
  const { locale } = useLocale();
  const data = locale === "es" ? dataEs : dataEn;
  return <PortfolioShell data={data} />;
}

export function I18nPortfolioShell({ dataEn, dataEs }: Props) {
  return (
    <LocaleProvider>
      <ResolvedShell dataEn={dataEn} dataEs={dataEs} />
    </LocaleProvider>
  );
}
