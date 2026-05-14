"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  // eslint-disable-next-line no-var
  var __zylo_gsap_registered: boolean | undefined;
}

if (typeof window !== "undefined" && !globalThis.__zylo_gsap_registered) {
  gsap.registerPlugin(ScrollTrigger);
  globalThis.__zylo_gsap_registered = true;
}

export { gsap, ScrollTrigger };
