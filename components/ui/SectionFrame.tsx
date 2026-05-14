"use client";

import { useEffect, useRef } from "react";

type Theme = "ink" | "violet" | "cream" | "violet-deep";

type Props = {
  id: string;
  /** Section index label shown bottom-right, e.g. "#2" */
  indexLabel: string;
  /** Short label for top-left utility row (e.g. "Services") */
  kicker?: string;
  theme: Theme;
  className?: string;
  children: React.ReactNode;
  /** When true, swaps the global body bg & text color when this section is centered in the viewport. */
  swapBackground?: boolean;
  /** Full minimum height — true (default) = 100svh, false = auto. */
  fill?: boolean;
};

const themeBg: Record<Theme, string> = {
  ink: "#0A0A0F",
  violet: "#6E22D6",
  cream: "#EFE9F5",
  "violet-deep": "#3D0E80",
};

const themeFg: Record<Theme, string> = {
  ink: "#FFFFFF",
  violet: "#FFFFFF",
  cream: "#0A0A0F",
  "violet-deep": "#FFFFFF",
};

const themeMuted: Record<Theme, string> = {
  ink: "rgba(255,255,255,0.55)",
  violet: "rgba(255,255,255,0.7)",
  cream: "rgba(10,10,15,0.55)",
  "violet-deep": "rgba(255,255,255,0.7)",
};

const themeGridLine: Record<Theme, string> = {
  ink: "rgba(255,255,255,0.06)",
  violet: "rgba(255,255,255,0.12)",
  cream: "rgba(10,10,15,0.08)",
  "violet-deep": "rgba(255,255,255,0.12)",
};

export function SectionFrame({
  id,
  indexLabel,
  kicker,
  theme,
  className = "",
  children,
  swapBackground = true,
  fill = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!swapBackground) return;
    const node = ref.current;
    if (!node) return;

    const apply = () => {
      document.documentElement.style.setProperty("--bg", themeBg[theme]);
      document.documentElement.style.setProperty("--fg", themeFg[theme]);
      document.documentElement.style.setProperty("--muted", themeMuted[theme]);
      document.documentElement.style.setProperty(
        "--grid-line",
        themeGridLine[theme],
      );
      document.body.dataset.theme = theme;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            apply();
          }
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [theme, swapBackground]);

  return (
    <section
      ref={ref}
      id={id}
      data-section
      data-theme={theme}
      className={`relative ${fill ? "min-h-[100svh]" : ""} w-full ${className}`}
      style={{
        backgroundColor: themeBg[theme],
        color: themeFg[theme],
      }}
    >
      {children}

      {/* HUD: kicker top-left + index bottom-right + arrow bottom-left */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] sm:px-8 sm:pb-6"
        style={{ color: themeFg[theme], opacity: 0.7 }}
      >
        <span aria-hidden className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1 V13 M2 8 L7 13 L12 8"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          {kicker ? <span>{kicker}</span> : null}
        </span>
        <span>{indexLabel}</span>
      </div>
    </section>
  );
}
