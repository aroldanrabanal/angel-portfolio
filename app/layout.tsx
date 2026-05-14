import type { Metadata, Viewport } from "next";
import { Tourney, Space_Mono } from "next/font/google";
import portfolioEn from "@/data/portfolio.en.json";
import portfolioEs from "@/data/portfolio.es.json";
import type { Portfolio } from "@/types/portfolio";
import "./globals.css";

const dataEn = portfolioEn as Portfolio;
const dataEs = portfolioEs as Portfolio;

const tourney = Tourney({
  variable: "--font-tourney",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `${dataEn.personal.name} — ${dataEn.personal.title} · ${dataEs.personal.title}`,
  description: `${dataEn.personal.tagline} · ${dataEs.personal.tagline}`,
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${tourney.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
