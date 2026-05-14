"use client";

import { useEffect, useRef } from "react";
import type { Portfolio } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { BrandWord } from "@/components/ui/BrandWord";
import { StarBurst } from "@/components/ui/StarBurst";

type Props = { data: Portfolio; reduceMotion: boolean };

/** Per-tech presentation: variant + relative size, to mimic the wall-of-clients mix */
const VARIANTS: Array<{ variant: "sans" | "serif" | "italic" | "mono" | "display"; size: string }> = [
  { variant: "sans", size: "text-3xl sm:text-5xl" },
  { variant: "serif", size: "text-3xl sm:text-5xl" },
  { variant: "italic", size: "text-3xl sm:text-5xl" },
  { variant: "display", size: "text-3xl sm:text-5xl" },
  { variant: "mono", size: "text-2xl sm:text-4xl" },
  { variant: "sans", size: "text-3xl sm:text-5xl" },
  { variant: "italic", size: "text-3xl sm:text-5xl" },
  { variant: "serif", size: "text-3xl sm:text-5xl" },
  { variant: "display", size: "text-2xl sm:text-4xl" },
  { variant: "sans", size: "text-3xl sm:text-5xl" },
  { variant: "serif", size: "text-3xl sm:text-5xl" },
  { variant: "mono", size: "text-2xl sm:text-4xl" },
];

export function Stack({ data, reduceMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const h = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reduceMotion || !root.current) return;
    const chars = splitChars(h.current);

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 110, opacity: 0 });
      gsap.set(".stack-item", { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(chars, {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: { each: 0.02 },
          }).to(
            ".stack-item",
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "power2.out" },
            "<0.2",
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  const { stack } = data.template;

  return (
    <SectionFrame
      id="stack"
      theme="cream"
      indexLabel={stack.indexLabel}
      kicker={stack.kicker}
    >
      <div ref={root} className="relative w-full px-4 pb-32 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <h2 className="font-display text-[12vw] leading-[0.92] text-[color:var(--ink)] sm:text-[8vw] lg:col-span-7 lg:text-[6vw]">
              <span ref={h} className="block overflow-hidden">
                {stack.heading}
              </span>
            </h2>
            <p className="max-w-md font-mono text-[12px] leading-relaxed text-[color:var(--ink)]/70 lg:col-span-5">
              {stack.intro}
            </p>
          </div>

          {/* Logo wall */}
          <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 border-y border-[color:var(--ink)]/10 py-12 sm:grid-cols-3 lg:grid-cols-4">
            {stack.items.map((label, i) => {
              const v = VARIANTS[i % VARIANTS.length];
              return (
                <div
                  key={label}
                  className="stack-item flex items-center justify-center text-[color:var(--ink)]"
                >
                  <BrandWord variant={v.variant} className={v.size}>
                    {label.toLowerCase() === "javascript" ? "JS" : label}
                  </BrandWord>
                </div>
              );
            })}

            {/* Decorative star somewhere on the grid (like the original) */}
            <StarBurst
              size={28}
              color="var(--lime)"
              className="absolute right-[18%] top-[42%] hidden lg:block"
            />
          </div>

          {/* Soft skills + languages secondary strip */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/50">
                {data.ui.footer.languagesTitle}
              </p>
              <ul className="mt-3 space-y-2 font-mono text-[12px] text-[color:var(--ink)]/80">
                {data.languages.map((l) => (
                  <li key={l.lang} className="flex items-baseline justify-between gap-4 border-b border-[color:var(--ink)]/10 pb-2">
                    <span className="font-display text-base uppercase text-[color:var(--ink)]">
                      {l.lang}
                    </span>
                    <span>{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/50">
                {data.ui.footer.softSkillsTitle}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink)]/80">
                {data.softSkills.map((s) => (
                  <li
                    key={s}
                    className="border border-[color:var(--ink)]/15 bg-white/60 px-3 py-1.5"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
