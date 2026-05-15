"use client";

import { useEffect, useRef } from "react";
import type { Portfolio, TemplateService } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { StarBurst } from "@/components/ui/StarBurst";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

const CARD_VISUALS: Record<string, { tilt: number; glyph: React.ReactNode }> = {
  s1: { tilt: -2, glyph: <BlobGlyph color="#ffffff" /> },
  s2: { tilt: 1, glyph: <PhoneGlyph /> },
  s3: { tilt: -1, glyph: <CubesGlyph /> },
  s4: { tilt: 2, glyph: <PuckGlyph /> },
  s5: { tilt: -2, glyph: <LoopGlyph /> },
  s6: { tilt: 1, glyph: <PrismGlyph /> },
};

function BlobGlyph({ color = "#ffffff" }: { color?: string }) {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full">
      <defs>
        <radialGradient id="blob-g" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="60%" stopColor="#D6FF3E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3D0E80" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M120 30 Q200 60 200 130 Q200 200 130 210 Q60 220 40 150 Q20 80 80 50 Q100 35 120 30 Z"
        fill="url(#blob-g)"
      />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full">
      <rect x="80" y="30" width="80" height="180" rx="12" fill="#0A0A0F" />
      <rect x="86" y="36" width="68" height="168" rx="8" fill="#D6FF3E" />
      <rect x="100" y="60" width="40" height="6" fill="#0A0A0F" />
      <rect x="100" y="78" width="28" height="4" fill="#0A0A0F" opacity="0.4" />
      <rect x="100" y="110" width="40" height="40" rx="4" fill="#0A0A0F" opacity="0.2" />
    </svg>
  );
}

function CubesGlyph() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full">
      <g transform="translate(120 120)">
        <polygon
          points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
          fill="#ffffff"
          opacity="0.95"
        />
        <polygon
          points="0,-60 52,-30 0,0 -52,-30"
          fill="#D6FF3E"
          opacity="0.85"
        />
        <polygon points="0,0 52,-30 52,30 0,60" fill="#ffffff" opacity="0.6" />
      </g>
    </svg>
  );
}

function PuckGlyph() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full">
      <ellipse cx="120" cy="130" rx="78" ry="22" fill="#0A0A0F" />
      <ellipse cx="120" cy="120" rx="78" ry="22" fill="#D6FF3E" />
      <rect x="42" y="120" width="156" height="14" fill="#0A0A0F" opacity="0.4" />
    </svg>
  );
}

function LoopGlyph() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full">
      <defs>
        <linearGradient id="loop-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#D6FF3E" />
        </linearGradient>
      </defs>
      <path
        d="M70 80 C 40 80, 40 160, 70 160 C 100 160, 100 80, 130 80 C 160 80, 160 160, 190 160 C 220 160, 220 80, 190 80"
        stroke="url(#loop-g)"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PrismGlyph() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full">
      <polygon points="120,28 212,200 28,200" fill="#ffffff" opacity="0.95" />
      <polygon points="120,28 120,200 28,200" fill="#D6FF3E" opacity="0.85" />
      <polygon points="120,28 120,200 212,200" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}

export function Services({ data, reduceMotion, liteMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const w1 = useRef<HTMLSpanElement | null>(null);
  const w2 = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (!root.current) return;
    const headingTargets = liteMotion
      ? [w1.current, w2.current].filter((item): item is HTMLElement => Boolean(item))
      : [...splitChars(w1.current), ...splitChars(w2.current)];

    const ctx = gsap.context(() => {
      gsap.set(
        headingTargets,
        liteMotion ? { y: 28, opacity: 0 } : { yPercent: 110, opacity: 0 },
      );
      gsap.set(".srv-card", { opacity: 0, y: 60 });

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(
            headingTargets,
            liteMotion
              ? { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" }
              : {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.85,
                  stagger: { each: 0.02 },
                },
          ).to(
            ".srv-card",
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
            "<0.2",
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const { services } = data.template;

  return (
    <SectionFrame
      id="services"
      theme="violet"
      indexLabel={services.indexLabel}
      kicker={services.kicker ?? ""}
    >
      <div
        ref={root}
        className="relative w-full px-4 pb-32 pt-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex items-start justify-between gap-8">
            <h2 className="font-display text-[14vw] leading-[0.9] sm:text-[10vw] lg:text-[8vw]">
              <span ref={w1} className="block overflow-hidden">
                {services.heading[0]}
              </span>
              <span ref={w2} className="block overflow-hidden text-display-fill">
                {services.heading[1]}
              </span>
            </h2>
            <StarBurst
              size={36}
              color="var(--lime)"
              className="mt-6 shrink-0"
            />
          </div>

          <ServicesGrid items={services.items} />
        </div>
      </div>
    </SectionFrame>
  );
}

function ServicesGrid({ items }: { items: TemplateService[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-4">
      {items.map((s, i) => {
        // Asymmetric span pattern for desktop: 6/3/3 // 4/4/4
        const spans = [
          "lg:col-span-6 lg:row-span-1",
          "lg:col-span-3 lg:row-span-1",
          "lg:col-span-3 lg:row-span-1",
          "lg:col-span-4 lg:row-span-1",
          "lg:col-span-4 lg:row-span-1",
          "lg:col-span-4 lg:row-span-1",
        ];
        const visual = CARD_VISUALS[s.id] ?? CARD_VISUALS.s1;
        return <ServiceCard key={s.id} service={s} span={spans[i] ?? ""} visual={visual} />;
      })}
    </div>
  );
}

function ServiceCard({
  service,
  span,
  visual,
}: {
  service: TemplateService;
  span: string;
  visual: { tilt: number; glyph: React.ReactNode };
}) {
  return (
    <article
      className={`srv-card group relative flex min-h-[280px] flex-col justify-between overflow-hidden border border-white/10 bg-[color:var(--violet-deep)] p-6 ${span}`}
      style={{
        background:
          "radial-gradient(120% 90% at 100% 0%, rgba(255,255,255,0.12), transparent 60%), linear-gradient(180deg, var(--violet-deep) 0%, color-mix(in srgb, var(--violet-deep) 70%, black) 100%)",
      }}
    >
      <div
        className="absolute -right-8 -top-8 h-44 w-44 transition-transform duration-700 group-hover:translate-y-[-6px] group-hover:rotate-[10deg]"
        style={{ transform: `rotate(${visual.tilt}deg)` }}
      >
        {visual.glyph}
      </div>

      <div className="relative z-10 max-w-[60%]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          {service.id.toUpperCase()}
        </p>
        <h3 className="mt-3 font-display text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
          {service.title}
        </h3>
      </div>

      <div className="relative z-10 mt-auto max-w-[80%] space-y-3">
        <p className="font-mono text-[12px] leading-relaxed text-white/80">
          {service.blurb}
        </p>
        <ul className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="border border-white/20 px-2 py-1"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
