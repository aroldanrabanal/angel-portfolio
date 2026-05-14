import type { Portfolio } from "@/types/portfolio";
import portfolioEn from "@/data/portfolio.en.json";
import portfolioEs from "@/data/portfolio.es.json";
import { I18nPortfolioShell } from "@/components/i18n/I18nPortfolioShell";

const dataEn = portfolioEn as Portfolio;
const dataEs = portfolioEs as Portfolio;

export default function Home() {
  return <I18nPortfolioShell dataEn={dataEn} dataEs={dataEs} />;
}
