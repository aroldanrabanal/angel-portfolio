"use client";

import { useEffect, useRef } from "react";
import type { Portfolio, PortfolioExperience } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { StarBurst } from "@/components/ui/StarBurst";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

const badgeStyles: Record<
  NonNullable<PortfolioExperience["badgeTone"]>,
  string
> = {
  active:
    "border-[color:var(--lime)]/50 bg-[color:var(--lime)]/10 text-[color:var(--lime)]",
  accent:
    "border-[color:var(--violet-soft)]/50 bg-[color:var(--violet-soft)]/15 text-[color:var(--violet-soft)]",
};

const cardSurface =
  "radial-gradient(120% 90% at 0% 0%, rgba(255,255,255,0.11), transparent 55%), linear-gradient(180deg, var(--violet-deep) 0%, color-mix(in srgb, var(--violet-deep) 75%, black) 100%)";

export function Experience({ data, reduceMotion, liteMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const w1 = useRef<HTMLSpanElement | null>(null);
  const w2 = useRef<HTMLSpanElement | null>(null);
  const experiences = data.experience;

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
      gsap.set(".exp-card", { opacity: 0, y: 56 });
      gsap.set(".exp-index-num", { opacity: 0, scale: 0.92 });

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.to(
            headingTargets,
            liteMotion
              ? {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
                  stagger: 0.08,
                  ease: "power2.out",
                }
              : {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.85,
                  stagger: { each: 0.02 },
                  ease: "expo.out",
                },
          );
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".exp-card");
      cards.forEach((card, i) => {
        const indexEl = card.querySelector<HTMLElement>(".exp-index-num");
        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              delay: liteMotion ? 0 : i * 0.06,
              ease: "power3.out",
            });
            if (indexEl) {
              gsap.to(indexEl, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.4)",
              });
            }
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const section = data.template.experience;
  const visitLabel = section.visitSiteLabel;

  return (
    <SectionFrame
      id="experience"
      theme="violet"
      indexLabel={section.indexLabel}
      kicker={section.kicker ?? ""}
    >
      <div
        ref={root}
        className="relative w-full px-4 pb-32 pt-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex items-start justify-between gap-8 sm:mb-16">
            <h2 className="font-display text-[14vw] leading-[0.9] sm:text-[10vw] lg:text-[8vw]">
              <span ref={w1} className="block overflow-hidden">
                {section.heading[0]}
              </span>
              <span ref={w2} className="block overflow-hidden text-display-fill">
                {section.heading[1]}
              </span>
            </h2>
            <StarBurst
              size={36}
              color="var(--lime)"
              className="mt-6 shrink-0"
            />
          </div>

          <ol className="relative flex flex-col gap-6 sm:gap-8">
            {experiences.map((exp, i) => (
              <li
                key={exp.id}
                className="relative grid grid-cols-1 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-x-8 lg:gap-x-12"
              >
                <div
                  className="mb-3 flex items-center gap-3 sm:mb-0 sm:flex-col sm:items-start sm:pt-2"
                  aria-hidden
                >
                  <span className="exp-index-num font-display text-4xl leading-none text-white/20 sm:text-5xl lg:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < experiences.length - 1 ? (
                    <span className="hidden h-full min-h-[2rem] w-px flex-1 bg-gradient-to-b from-white/25 to-transparent sm:block" />
                  ) : null}
                </div>

                <ExperienceBlock
                  exp={exp}
                  visitLabel={visitLabel}
                  featured={Boolean(exp.highlightBadge)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionFrame>
  );
}

function ExperienceBlock({
  exp,
  visitLabel,
  featured = false,
}: {
  exp: PortfolioExperience;
  visitLabel: string;
  featured?: boolean;
}) {
  const badgeClass =
    exp.badgeTone != null ? badgeStyles[exp.badgeTone] : "";

  return (
    <article
      className={`exp-card group relative flex min-h-[22rem] overflow-hidden border transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 sm:min-h-[24rem] ${
        featured
          ? "border-[color:var(--lime)]/35 shadow-[0_0_0_1px_rgba(214,255,62,0.08),0_20px_60px_rgba(0,0,0,0.35)] hover:border-[color:var(--lime)]/50 hover:shadow-[0_0_0_1px_rgba(214,255,62,0.15),0_24px_64px_rgba(0,0,0,0.4)]"
          : "border-white/10 hover:border-[color:var(--violet-soft)]/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35),0_0_0_1px_rgba(138,63,232,0.1)]"
      }`}
      style={{ background: cardSurface }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className={`absolute left-0 top-0 h-0 w-[3px] transition-[height] duration-500 group-hover:h-full ${
          featured ? "bg-[color:var(--lime)]" : "bg-[color:var(--violet-soft)]"
        }`}
      />

      <div className="relative flex h-full flex-1 flex-col gap-6 p-7 sm:p-9 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 space-y-3">
            {exp.highlightBadge ? (
              <span
                className={`inline-block border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${badgeClass}`}
              >
                {exp.highlightBadge}
              </span>
            ) : null}
            {exp.website ? (
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-display text-3xl uppercase leading-[0.92] tracking-tight transition-opacity hover:opacity-80 sm:text-4xl lg:text-5xl"
              >
                {exp.company}
              </a>
            ) : (
              <h3 className="font-display text-3xl uppercase leading-[0.92] tracking-tight sm:text-4xl lg:text-5xl">
                {exp.company}
              </h3>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className="border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              {exp.period}
            </span>
            {exp.website ? (
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 underline-offset-4 transition-colors hover:text-[color:var(--lime)] hover:underline"
              >
                {visitLabel} ↗
              </a>
            ) : null}
          </div>
        </div>

        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--violet-soft)]">
          {exp.role}
        </p>

        <p className="max-w-3xl flex-1 border-l border-white/10 pl-4 font-mono text-[13px] leading-relaxed text-white/80 sm:pl-5 sm:text-[14px]">
          {exp.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-1">
          {exp.tags.map((tag) => (
            <li
              key={tag}
              className="border border-white/15 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 group-hover:border-white/25 group-hover:text-white/85"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
