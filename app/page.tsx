import { I18nPortfolioShell } from "@/components/i18n/I18nPortfolioShell";
import { loadPortfolioServer } from "@/lib/loadPortfolio";
import { resolveServerLocale } from "@/lib/portfolioLocale.server";

export default async function Home() {
  const locale = await resolveServerLocale();
  const initialData = await loadPortfolioServer(locale);

  return <I18nPortfolioShell initialData={initialData} />;
}
