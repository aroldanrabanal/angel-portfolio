/**
 * Tiny SplitText replacement (the official GSAP SplitText is paid).
 * Wraps every character of a node's text in a <span class="char"> with
 * `display: inline-block` so GSAP can transform each glyph independently.
 *
 * Returns the array of char spans. Re-callable: it bails if the element is
 * already split (looks for [data-split="true"]).
 */
export function splitChars(el: HTMLElement | null): HTMLSpanElement[] {
  if (!el) return [];
  if (el.dataset.split === "true") {
    return Array.from(el.querySelectorAll<HTMLSpanElement>("[data-char]"));
  }

  const text = el.textContent ?? "";
  el.textContent = "";
  el.dataset.split = "true";

  const chars: HTMLSpanElement[] = [];

  for (const ch of text) {
    const span = document.createElement("span");
    span.dataset.char = "true";
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(span);
    chars.push(span);
  }

  return chars;
}
