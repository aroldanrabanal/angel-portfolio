"use client";

import { useEffect, useRef } from "react";
import type { Portfolio } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { StarBurst } from "@/components/ui/StarBurst";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

export function Process({ data, reduceMotion, liteMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const w1 = useRef<HTMLSpanElement | null>(null);
  const w2 = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reduceMotion || !root.current) return;
    const headingTargets = liteMotion
      ? [w1.current, w2.current].filter((item): item is HTMLElement => Boolean(item))
      : [...splitChars(w1.current), ...splitChars(w2.current)];

    const ctx = gsap.context(() => {
      gsap.set(
        headingTargets,
        liteMotion ? { y: 28, opacity: 0 } : { yPercent: 110, opacity: 0 },
      );
      gsap.set(".proc-step", { opacity: 0, y: 30 });
      gsap.set(".proc-exp", { opacity: 0, y: 30 });

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
          )
            .to(
              ".proc-step",
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
              "<0.2",
            )
            .to(
              ".proc-exp",
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
              "<0.1",
            );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const { process } = data.template;

  return (
    <SectionFrame
      id="process"
      theme="cream"
      indexLabel={process.indexLabel}
      kicker={process.kicker ?? ""}
    >
      <div ref={root} className="relative w-full px-4 pb-32 pt-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-display text-[14vw] leading-[0.9] text-[color:var(--ink)] sm:text-[10vw] lg:text-[8vw]">
                <span ref={w1} className="block overflow-hidden">
                  {process.heading[0]}
                </span>
                <span ref={w2} className="block overflow-hidden text-display-fill text-[color:var(--ink)]">
                  {process.heading[1]}
                </span>
              </h2>
            </div>
            <p className="max-w-md font-mono text-[12px] leading-relaxed text-[color:var(--ink)]/70 lg:col-span-5">
              {process.intro}
            </p>
          </div>

          {/* Steps grid */}
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, i) => (
              <li
                key={step.id}
                className="proc-step relative flex flex-col gap-3 border border-[color:var(--ink)]/10 bg-white/70 p-6 backdrop-blur-sm"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--violet)]">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl uppercase leading-[0.95] text-[color:var(--ink)]">
                  {step.title}
                </h3>
                <p className="font-mono text-[12px] leading-relaxed text-[color:var(--ink)]/70">
                  {step.body}
                </p>
                {i === 0 ? (
                  <StarBurst
                    size={20}
                    color="var(--violet)"
                    className="absolute right-4 top-4"
                  />
                ) : null}
              </li>
            ))}
          </ol>

          {/* Experience strip — employment from data.experience */}
          <div className="mt-20 border-t border-[color:var(--ink)]/10 pt-12">
            <div className="mb-8 flex items-baseline justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/60">
                {process.experienceStripKicker}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/40">
                {data.experience.length} {process.experienceOngoingSuffix}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.experience.map((exp) => (
                <article
                  key={exp.id}
                  className="proc-exp relative border-l-2 border-[color:var(--violet)] bg-white/60 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-display text-xl uppercase leading-[0.95] text-[color:var(--ink)]">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink)]/50">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--violet)]">
                    {exp.company}
                  </p>
                  <p className="mt-4 font-mono text-[12px] leading-relaxed text-[color:var(--ink)]/75">
                    {exp.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <li
                        key={t}
                        className="border border-[color:var(--ink)]/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink)]/70"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
