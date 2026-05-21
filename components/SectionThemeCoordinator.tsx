"use client";

import { useEffect, type ReactNode } from "react";
import { applySectionTheme, type SectionTheme } from "@/lib/sectionTheme";

type Props = {
  children: ReactNode;
  /** Root element that contains `[data-section]` blocks (defaults to `main`). */
  scopeSelector?: string;
};

export function SectionThemeCoordinator({
  children,
  scopeSelector = "main",
}: Props) {
  useEffect(() => {
    const scope = document.querySelector(scopeSelector);
    if (!scope) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const best = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b,
        );
        const next = best.target.getAttribute("data-theme") as SectionTheme | null;
        if (!next) return;
        applySectionTheme(next);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    const observeAll = () => {
      observer.disconnect();
      scope
        .querySelectorAll<HTMLElement>(
          "[data-section][data-theme][data-swap-background]",
        )
        .forEach((el) => observer.observe(el));
    };

    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(scope, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, [scopeSelector]);

  return children;
}
