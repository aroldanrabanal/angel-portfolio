import { TECH_CAROUSEL_ITEMS } from "@/lib/techCarouselItems";

export function TechCarouselStaticGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-[500px] flex-wrap items-center justify-center gap-2 px-4 py-12 ${className}`}
      aria-hidden
    >
      {TECH_CAROUSEL_ITEMS.map((item) => (
        <span
          key={item.name}
          className="rounded-full border border-[color:var(--violet-soft)]/35 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm"
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}
