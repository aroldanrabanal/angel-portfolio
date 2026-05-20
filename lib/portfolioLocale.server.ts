import { cookies, headers } from "next/headers";
import type { Locale } from "@/types/portfolio";
import { isLocale, LOCALE_COOKIE } from "@/lib/portfolioLocaleConstants";

export async function resolveServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (await headers()).get("accept-language") ?? "";
  const primary = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  if (primary.startsWith("es")) return "es";

  return "en";
}
