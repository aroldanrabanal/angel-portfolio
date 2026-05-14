"use client";

/**
 * Fixed full-viewport SVG grid (12-col + horizontal hairlines).
 * Lines are very faint and tint themselves based on the current body bg via
 * CSS variable `--grid-line` (set per-section through `data-bg` swapping).
 */
export function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ contain: "strict" }}
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-h"
            width="1"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="var(--grid-line)"
              strokeWidth="0.005"
              vectorEffect="non-scaling-stroke"
            />
          </pattern>
        </defs>
        <rect width="12" height="12" fill="url(#grid-h)" />
      </svg>
    </div>
  );
}
