import type { Locale, Portfolio } from "@/types/portfolio";

const cache: Partial<Record<Locale, Portfolio>> = {};

export async function loadPortfolio(locale: Locale): Promise<Portfolio> {
  const cached = cache[locale];
  if (cached) return cached;

  const mod =
    locale === "es" ?
      await import("@/data/portfolio.es.json")
    : await import("@/data/portfolio.en.json");

  const data = mod.default as Portfolio;
  cache[locale] = data;
  return data;
}

/** Server-only: load one locale JSON for RSC pages. */
export async function loadPortfolioServer(locale: Locale): Promise<Portfolio> {
  return loadPortfolio(locale);
}

export function prefetchPortfolio(locale: Locale): void {
  void loadPortfolio(locale);
}
