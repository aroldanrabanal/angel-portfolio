"use client";

import { useEffect, useState, type RefObject } from "react";

export function useTabVisible(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => {
      setVisible(document.visibilityState === "visible");
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return visible;
}

/** Pauses R3F when off-screen or tab hidden (same pattern as ProjectBackground). */
export function useCanvasFrameloop(inView: boolean): "always" | "never" {
  const tabVisible = useTabVisible();
  return inView && tabVisible ? "always" : "never";
}

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [inView, setInView] = useState(false);
  const rootMargin = options?.rootMargin;
  const threshold = options?.threshold ?? 0.01;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin, threshold },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView;
}
