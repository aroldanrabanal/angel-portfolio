"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import type { Portfolio } from "@/types/portfolio";
import { Monogram } from "@/components/ui/Monogram";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useSmoothScrollTo } from "@/lib/lenis";

type Props = {
  data: Portfolio;
};

export function TopNav({ data }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { locale, setLocale } = useLocale();
  const lt = data.ui.languageToggle;
  const aria = data.ui.aria;
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const onLight = theme === "cream";
  const fg = onLight ? "var(--ink)" : "#fff";
  const borderColor = onLight ? "rgba(10,10,15,0.12)" : "rgba(255,255,255,0.12)";
  const navBg = onLight
    ? "color-mix(in srgb, var(--cream) 65%, transparent)"
    : "color-mix(in srgb, var(--ink) 50%, transparent)";
  const panelBg = onLight
    ? "color-mix(in srgb, var(--cream) 92%, transparent)"
    : "color-mix(in srgb, var(--ink) 88%, transparent)";
  const overlayBg = onLight ? "rgba(10,10,15,0.35)" : "rgba(0,0,0,0.55)";

  const scrollTo = useSmoothScrollTo();

  const hashHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const onHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome || !href.startsWith("#")) return;
    e.preventDefault();
    scrollTo(href);
  };

  const onNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    onHashClick(e, href);
    setMenuOpen(false);
  };

  const motionClass = reduceMotion
    ? ""
    : "transition-opacity duration-300 ease-out";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{ color: fg }}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
        <a
          href={hashHref("#hero")}
          onClick={(e) => onNavLinkClick(e, "#hero")}
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
          aria-label={aria.mobileNavLabel}
        >
          {data.template.nav.map((item) => (
            <a
              key={item.href}
              href={hashHref(item.href)}
              onClick={(e) => onNavLinkClick(e, item.href)}
              className="rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-current/10"
              style={{ color: fg }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md md:hidden"
            style={{ borderColor, background: navBg, color: fg }}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? aria.closeMenu : aria.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden
              className={reduceMotion ? "" : "transition-transform duration-300"}
              style={{ transform: menuOpen ? "rotate(90deg)" : undefined }}
            >
              {menuOpen ? (
                <path
                  d="M5 5 L15 15 M15 5 L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              ) : (
                <>
                  <path
                    d="M3 6 H17"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                  <path
                    d="M3 10 H17"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                  <path
                    d="M3 14 H17"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                </>
              )}
            </svg>
          </button>

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
            href={hashHref("#contact")}
            onClick={(e) => onNavLinkClick(e, "#contact")}
            className="group inline-flex h-11 w-11 items-center justify-center transition-transform hover:scale-105 sm:h-12 sm:w-12"
            style={{ background: "var(--violet-soft)", color: "#fff" }}
            aria-label={aria.contactButton}
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

      {menuOpen ? (
        <>
          <button
            type="button"
            className={`fixed inset-0 top-16 z-40 sm:top-20 md:hidden ${motionClass}`}
            style={{
              background: overlayBg,
              opacity: menuOpen ? 1 : 0,
            }}
            aria-label={aria.closeMenu}
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id={menuId}
            aria-label={aria.mobileNavLabel}
            className={`fixed inset-x-0 top-16 z-[45] border-b px-4 py-6 backdrop-blur-xl sm:top-20 sm:px-6 md:hidden ${motionClass}`}
            style={{
              background: panelBg,
              borderColor,
              color: fg,
            }}
          >
            <ul className="mx-auto flex max-w-[1600px] flex-col gap-1">
              {data.template.nav.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={hashHref(item.href)}
                    onClick={(e) => onNavLinkClick(e, item.href)}
                    className="flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 font-mono text-[13px] uppercase tracking-[0.2em] transition-colors hover:bg-current/8 sm:min-h-14 sm:text-[14px]"
                    style={{ borderColor }}
                  >
                    <span>{item.label}</span>
                    <span
                      className="text-[11px] tracking-[0.14em] opacity-50"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}
