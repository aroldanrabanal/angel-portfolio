"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToHash } from "@/lib/smoothScroll";

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis(): Lenis | null {
  return useContext(LenisContext).lenis;
}

export function useSmoothScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (hash: string) => {
      scrollToHash(lenis, hash);
    },
    [lenis],
  );
}

/**
 * Wraps the app with a Lenis smooth-scroll instance synced to gsap.ticker
 * so ScrollTrigger updates in the same frame. Mobile lite mode keeps native
 * scrolling to reduce main-thread work on constrained devices.
 */
export function LenisProvider({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const subscribers = useRef(new Set<() => void>());
  const subscribe = useCallback((onStoreChange: () => void) => {
    subscribers.current.add(onStoreChange);

    return () => subscribers.current.delete(onStoreChange);
  }, []);
  const getSnapshot = useCallback(() => lenisRef.current, []);
  const lenis = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const notifySubscribers = useCallback(() => {
    subscribers.current.forEach((notify) => notify());
  }, []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (disabled || reduce) {
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      autoRaf: false,
    });

    lenisRef.current = instance;
    notifySubscribers();

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      notifySubscribers();
    };
  }, [disabled, notifySubscribers]);

  /* Smooth scroll to hash on load (e.g. /#works from a case study) */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const run = () => {
      const hash = window.location.hash;
      if (!hash) return;
      scrollToHash(lenis, hash);
    };

    run();
    const t = window.setTimeout(run, 150);
    return () => window.clearTimeout(t);
  }, [lenis]);

  /* Same-page anchor links → Lenis scrollTo, or native smooth fallback */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;

      if (!document.getElementById(href.slice(1))) return;

      e.preventDefault();
      scrollToHash(lenis, href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  );
}
