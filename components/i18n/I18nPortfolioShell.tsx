"use client";

import { useEffect, useState } from "react";
import type { Portfolio } from "@/types/portfolio";
import { PortfolioShell } from "@/components/PortfolioShell";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { loadPortfolio, prefetchPortfolio } from "@/lib/loadPortfolio";

type Props = {
  initialData: Portfolio;
};

export function I18nPortfolioShell({ initialData }: Props) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let cancelled = false;

    void loadPortfolio(locale).then((next) => {
      if (!cancelled) setData(next);
    });

    const other = locale === "en" ? "es" : "en";
    const idle =
      typeof requestIdleCallback === "function" ?
        requestIdleCallback(() => prefetchPortfolio(other))
      : window.setTimeout(() => prefetchPortfolio(other), 2500);

    return () => {
      cancelled = true;
      if (typeof requestIdleCallback === "function") {
        cancelIdleCallback(idle as number);
      } else {
        clearTimeout(idle as number);
      }
    };
  }, [locale]);

  return <PortfolioShell data={data} />;
}
