"use client";

import { useEffect, useRef } from "react";
import type { Portfolio } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { clearSplitCharsWillChange, splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

const illuminateCard =
  "skills-block group relative overflow-hidden border bg-white/[0.03] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[color:var(--lime)]/45 hover:bg-[color:var(--lime)]/[0.04] hover:shadow-[0_0_28px_rgba(214,255,62,0.12),0_0_48px_rgba(110,34,214,0.06)]";

function IlluminateOverlay() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, rgba(214,255,62,0.12), transparent 55%), linear-gradient(180deg, rgba(110,34,214,0.06), transparent 40%)",
      }}
    />
  );
}

function LevelBar({ percent, label }: { percent: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="mt-4 h-1.5 w-full overflow-hidden bg-white/10"
    >
      <div
        className="skills-level-fill h-full bg-[color:var(--lime)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function isHonorBadge(badge: string) {
  const lower = badge.toLowerCase();
  return lower.includes("honor") || lower.includes("matrícula");
}

export function Skills({ data, reduceMotion, liteMotion }: Props) {
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
      gsap.set(".skills-block", { opacity: 0, y: 24 });
      gsap.set(".skills-level-fill", { scaleX: 0, transformOrigin: "left center" });

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
                  duration: 0.8,
                  stagger: { each: 0.02 },
                  onComplete: () => clearSplitCharsWillChange(headingTargets),
                },
          )
            .to(
              ".skills-block",
              { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out" },
              "<0.15",
            )
            .to(
              ".skills-level-fill",
              { scaleX: 1, duration: 0.9, stagger: 0.12, ease: "power2.out" },
              "<0.2",
            );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const { skills } = data.template;
  const uiFooter = data.ui.footer;

  return (
    <SectionFrame
      id="skills"
      theme="ink"
      indexLabel={skills.indexLabel}
      kicker={skills.kicker ?? ""}
      fill={false}
    >
      <div ref={root} className="relative w-full px-4 pb-32 pt-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 sm:mb-12">
            <h2 className="font-display text-[9vw] leading-[0.95] sm:text-[5.5vw] lg:text-[3.5vw]">
              <span ref={w1} className="block overflow-hidden">
                {skills.heading[0]}
              </span>
              <span ref={w2} className="block overflow-hidden text-display-fill">
                {skills.heading[1]}
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-14 lg:gap-16">
            {/* Education + Languages */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {uiFooter.educationTitle}
                </p>
                <div className="space-y-3">
                  {skills.education.map((edu) => (
                    <div
                      key={edu.title}
                      className={`${illuminateCard} border-[color:var(--lime)]/35 p-4 sm:p-5`}
                    >
                      <IlluminateOverlay />
                      <div className="relative min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <h3 className="font-display text-sm leading-snug text-white sm:text-[15px]">
                            {edu.title}
                          </h3>
                          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45 sm:text-right">
                            {edu.period}
                          </span>
                        </div>
                        <p className="mt-1.5 font-mono text-[10px] text-white/50">{edu.school}</p>
                        {edu.badge ? (
                          <span
                            className={`relative mt-2.5 inline-block font-mono text-[9px] font-medium uppercase tracking-[0.16em] ${
                              isHonorBadge(edu.badge)
                                ? "border border-[color:var(--lime)]/50 bg-[color:var(--lime)]/10 px-2 py-1 text-[color:var(--lime)]"
                                : "text-[color:var(--lime)]"
                            }`}
                          >
                            {edu.badge}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`${illuminateCard} border-[color:var(--lime)]/35 bg-gradient-to-r from-[color:var(--violet-deep)]/80 to-white/[0.04] p-4 sm:p-5`}
                >
                  <IlluminateOverlay />
                  <div className="relative min-w-0 flex-1 space-y-1.5">
                    <p className="font-mono text-[11px] leading-snug text-white/90">
                      {skills.erasmus.title}
                    </p>
                    <p className="font-mono text-[10px] text-white/50">{skills.erasmus.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {uiFooter.languagesTitle}
                </p>
                <div className="flex flex-col gap-3">
                  {skills.languages.map((lang) => (
                    <div
                      key={lang.name}
                      className={`${illuminateCard} flex flex-col border-[color:var(--violet-soft)]/50 p-4 sm:p-5`}
                    >
                      <IlluminateOverlay />
                      <div className="relative min-w-0 flex-1">
                        <p className="font-mono text-[11px] text-white/85">{lang.name}</p>
                        <p className="mt-2 font-mono text-[11px] font-medium uppercase leading-snug tracking-[0.12em] text-[color:var(--lime)]">
                          {lang.badge}
                        </p>
                        {lang.subBadge ? (
                          <p className="mt-1 font-mono text-[10px] text-white/45">
                            {lang.subBadge}
                          </p>
                        ) : null}
                      </div>
                      <LevelBar percent={lang.levelPercent} label={lang.name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What I bring to a team */}
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                {skills.teamBring.title}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
                {skills.teamBring.items.map((text, i) => (
                  <div
                    key={i}
                    className={`${illuminateCard} min-h-[8.5rem] border-[color:var(--violet-soft)]/50 p-5 sm:min-h-[9rem] sm:p-6`}
                  >
                    <IlluminateOverlay />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-2 right-3 font-display text-5xl leading-none text-white/10 select-none sm:text-6xl lg:text-7xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="relative z-10 text-sm leading-relaxed text-white sm:text-[15px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
