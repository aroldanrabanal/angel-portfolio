"use client";

import { useEffect, useState } from "react";
import type { Portfolio } from "@/types/portfolio";
import { Monogram } from "@/components/ui/Monogram";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Props = {
  data: Portfolio;
};

export function TopNav({ data }: Props) {
  const { locale, setLocale } = useLocale();
  const lt = data.ui.languageToggle;
  const [theme, setTheme] = useState<"ink" | "violet" | "cream" | "violet-deep">(
    "ink",
  );

  useEffect(() => {
    const update = () => {
      const t = (document.body.dataset.theme as
        | "ink"
        | "violet"
        | "cream"
        | "violet-deep") || "ink";
      setTheme(t);
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const onLight = theme === "cream";
  const fg = onLight ? "var(--ink)" : "#fff";
  const borderColor = onLight ? "rgba(10,10,15,0.12)" : "rgba(255,255,255,0.12)";
  const navBg = onLight
    ? "color-mix(in srgb, var(--cream) 65%, transparent)"
    : "color-mix(in srgb, var(--ink) 50%, transparent)";

  const handleNav = (href: string) => {
    if (!href.startsWith("#")) return;
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{ color: fg }}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#hero");
          }}
          className="group flex items-center gap-2"
          aria-label={data.template.brand.name}
        >
          <span
            className="grid h-9 w-9 place-items-center transition-colors"
            style={{ color: "var(--violet-soft)" }}
          >
            <Monogram size={28} color="currentColor" />
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 rounded-full px-2 py-1.5 backdrop-blur-md md:flex"
          style={{
            background: navBg,
            border: `1px solid ${borderColor}`,
          }}
        >
          {data.template.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(item.href);
              }}
              className="rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-current/10"
              style={{ color: fg }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            role="group"
            aria-label={lt.groupAriaLabel}
            className="flex items-center rounded-full border px-0.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px]"
            style={{ borderColor }}
          >
            <button
              type="button"
              aria-pressed={locale === "en"}
              aria-label={lt.switchToEnglish}
              onClick={() => setLocale("en")}
              className="rounded-full px-2.5 py-1.5 transition-colors sm:px-3"
              style={{
                background: locale === "en" ? "var(--violet-soft)" : "transparent",
                color: locale === "en" ? "#fff" : fg,
              }}
            >
              EN
            </button>
            <button
              type="button"
              aria-pressed={locale === "es"}
              aria-label={lt.switchToSpanish}
              onClick={() => setLocale("es")}
              className="rounded-full px-2.5 py-1.5 transition-colors sm:px-3"
              style={{
                background: locale === "es" ? "var(--violet-soft)" : "transparent",
                color: locale === "es" ? "#fff" : fg,
              }}
            >
              ES
            </button>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#contact");
            }}
            className="group inline-flex h-11 w-11 items-center justify-center transition-transform hover:scale-105 sm:h-12 sm:w-12"
            style={{ background: "var(--violet-soft)", color: "#fff" }}
            aria-label={data.ui.aria.contactButton}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 14 L14 4 M6 4 H14 V12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="square"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile nav drawer trigger replaced by simple inline links under the bar on small screens */}
      <nav
        className="flex items-center justify-center gap-1 px-4 pb-3 md:hidden"
        style={{ color: fg }}
      >
        {data.template.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              handleNav(item.href);
            }}
            className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ borderColor }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
