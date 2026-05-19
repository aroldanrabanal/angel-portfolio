"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type { Portfolio } from "@/types/portfolio";
import { gsap } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { StarBurst } from "@/components/ui/StarBurst";
import { SectionFrame } from "@/components/ui/SectionFrame";

const HeroKnot = dynamic(
  () => import("@/components/canvas/HeroKnot").then((m) => m.HeroKnot),
  { ssr: false },
);

type Props = {
  data: Portfolio;
  reduceMotion: boolean;
  liteMotion: boolean;
};

export function Hero({ data, reduceMotion, liteMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const w1 = useRef<HTMLSpanElement | null>(null);
  const w2 = useRef<HTMLSpanElement | null>(null);
  const w3 = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (!root.current) return;

    const headingTargets = liteMotion
      ? [w1.current, w2.current, w3.current].filter((item): item is HTMLElement =>
          Boolean(item),
        )
      : [...splitChars(w1.current), ...splitChars(w2.current), ...splitChars(w3.current)];

    const ctx = gsap.context(() => {
      gsap.set(
        headingTargets,
        liteMotion ? { y: 24, opacity: 0 } : { yPercent: 110, opacity: 0 },
      );
      gsap.set(".hero-kicker", { opacity: 0, y: 16 });
      gsap.set(".hero-utility > *", { opacity: 0, y: 12 });
      gsap.set(".hero-knot", { opacity: 0, scale: 0.7 });
      gsap.set(".hero-star", { opacity: 0, scale: 0.4, rotate: -90 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(".hero-knot", { opacity: 1, scale: 1, duration: 1.4 }, 0)
        .to(
          headingTargets,
          liteMotion
            ? { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" }
            : {
                yPercent: 0,
                opacity: 1,
                duration: 0.9,
                stagger: { each: 0.018, from: "start" },
              },
          0.15,
        )
        .to(".hero-kicker", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.6)
        .to(
          ".hero-utility > *",
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          0.7,
        )
        .to(
          ".hero-star",
          { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2)" },
          0.5,
        );
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const { hero } = data.template;
  const [w1Text, w2Text, w3Text] = hero.words;

  return (
    <SectionFrame
      id="hero"
      theme="ink"
      indexLabel={hero.indexLabel}
      kicker={data.template.brand.name}
    >
      <div ref={root} className="relative h-[100svh] w-full overflow-hidden">
        {/* 3D knot occupies the centre, behind text */}
        <div className="hero-knot absolute inset-0 z-10">
          <HeroKnot reduceMotion={reduceMotion} liteMotion={liteMotion} />
        </div>

        {/* hairline frame */}
        <div className="pointer-events-none absolute inset-x-6 top-24 bottom-24 z-20 border border-white/[0.04]" />

        {/* Star accent */}
        <div className="hero-star absolute right-[12%] top-[28%] z-30 text-[color:var(--lime)]">
          <StarBurst size={42} />
        </div>

        {/* Stacked display words */}
        <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-4 pb-24 pt-28 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-[0.5vh]">
            <h1 className="font-display select-none text-[18vw] leading-[0.86] sm:text-[15vw] lg:text-[13vw]">
              <span
                ref={w1}
                className="block overflow-hidden"
                style={{ color: "#fff" }}
              >
                {w1Text}
              </span>
            </h1>

            <h1 className="font-display select-none text-[18vw] leading-[0.86] sm:text-[15vw] lg:text-[13vw]">
              <span
                ref={w2}
                className="block overflow-hidden text-display-fill"
                style={{ color: "#fff" }}
              >
                {w2Text}
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <p className="hero-kicker max-w-md font-mono text-[12px] leading-relaxed text-white/80 sm:text-[13px]">
              {hero.kicker}
            </p>

            <h1 className="font-display select-none text-[18vw] leading-[0.86] sm:text-[15vw] lg:text-[13vw]">
              <span ref={w3} className="block overflow-hidden">
                {w3Text}
              </span>
            </h1>
          </div>
        </div>

        {/* Utility bar */}
        <div className="hero-utility absolute inset-x-0 bottom-12 z-30 flex flex-wrap items-center justify-between gap-3 border-y border-white/10 bg-black/30 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 sm:px-8 sm:text-[12px]">
          <span>{hero.stats}</span>
          <span className="hidden sm:block">{hero.tagline}</span>
          <div className="flex items-center gap-4">
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-[color:var(--lime)]"
            >
              LinkedIn
            </a>
            <a
              href="/CV_Angel_Roldan_Rabanal.pdf"
              download
              className="border border-white/20 bg-white/5 px-3 py-1 text-white/70 transition-colors hover:border-[color:var(--lime)] hover:text-[color:var(--lime)]"
            >
              CV ↓
            </a>
          </div>
          <span>{hero.indexLabel}</span>
        </div>
      </div>
    </SectionFrame>
  );
}
