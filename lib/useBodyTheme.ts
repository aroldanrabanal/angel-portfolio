"use client";

import { useSyncExternalStore } from "react";
import type { SectionTheme } from "@/lib/sectionTheme";

function subscribe(onStoreChange: () => void) {
  const obs = new MutationObserver(onStoreChange);
  obs.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}

function getSnapshot(): SectionTheme {
  const t = document.body.dataset.theme;
  if (t === "violet" || t === "cream" || t === "violet-deep" || t === "ink") return t;
  return "ink";
}

function getServerSnapshot(): SectionTheme {
  return "ink";
}

export function useBodyTheme(): SectionTheme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
