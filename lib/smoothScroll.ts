import type Lenis from "lenis";

/** Fixed nav height — offset so section titles sit below the header */
export const SMOOTH_SCROLL_NAV_OFFSET = -88;

export function scrollToHash(
  lenis: Lenis | null,
  hash: string,
  options?: { offset?: number; duration?: number },
) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const offset = options?.offset ?? SMOOTH_SCROLL_NAV_OFFSET;
  const duration = options?.duration ?? 1.15;

  if (lenis) {
    lenis.scrollTo(el, { offset, duration });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (window.location.hash !== `#${id}`) {
    history.pushState(null, "", `#${id}`);
  }

  return true;
}
