"use client";

import { useRef } from "react";
import { themeBg, themeFg, type SectionTheme } from "@/lib/sectionTheme";

type Theme = SectionTheme;

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

  return (
    <section
      ref={ref}
      id={id}
      data-section
      data-theme={swapBackground ? theme : undefined}
      data-swap-background={swapBackground ? "" : undefined}
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
