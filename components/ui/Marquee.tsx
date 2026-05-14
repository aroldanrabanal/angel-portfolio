"use client";

type Props = {
  items: string[];
  /** Seconds per loop. Lower = faster. */
  speed?: number;
  /** Tailwind className override (color, padding, border, etc.) */
  className?: string;
  /** Separator glyph between items. */
  separator?: string;
};

/**
 * Pure-CSS infinite marquee. Duplicates the items twice and animates -50%.
 */
export function Marquee({
  items,
  speed = 32,
  className = "",
  separator = "·",
}: Props) {
  const content = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((label, i) => (
        <span key={`${label}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
          <span>{label}</span>
          <span className="text-current/40">{separator}</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
    >
      <div
        className="flex w-max"
        style={{
          animation: `zylo-marquee ${speed}s linear infinite`,
        }}
      >
        {content}
        {content}
      </div>
      <style>{`
        @keyframes zylo-marquee {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
