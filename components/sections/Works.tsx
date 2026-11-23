"use client";

import { useEffect, useRef } from "react";
import type { Portfolio, PortfolioRepo } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { clearSplitCharsWillChange, splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

const cardSurface =
  "radial-gradient(120% 90% at 100% 0%, rgba(255,255,255,0.11), transparent 55%), linear-gradient(180deg, var(--violet-deep) 0%, color-mix(in srgb, var(--violet-deep) 72%, black) 100%)";

function accentBadgeClass() {
  return "border border-[color:var(--violet-soft)]/50 bg-[color:var(--violet-soft)]/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--violet-soft)]";
}

export function Works({ data, reduceMotion, liteMotion }: Props) {
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
      gsap.set(".repo-card", { opacity: 0, y: 60 });

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
                  onComplete: () => clearSplitCharsWillChange(headingTargets),
                },
          ).to(
            ".repo-card",
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
            "<0.2",
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const { works } = data.template;

  return (
    <SectionFrame
      id="works"
      theme="violet"
      indexLabel={works.indexLabel}
      kicker={works.kicker ?? ""}
    >
      <div
        ref={root}
        className="relative w-full px-4 pb-32 pt-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <h2 className="font-display text-[14vw] leading-[0.9] sm:text-[10vw] lg:col-span-7 lg:text-[8vw]">
              <span ref={w1} className="block overflow-hidden">
                {works.heading[0]}
              </span>
              <span ref={w2} className="block overflow-hidden text-display-fill">
                {works.heading[1]}
              </span>
            </h2>
            <p className="max-w-md font-mono text-[12px] leading-relaxed text-white/70 lg:col-span-5">
              {works.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function RepoCard({ repo }: { repo: PortfolioRepo }) {
  return (
    <article
      className={`repo-card relative min-h-[240px] overflow-hidden border ${
        repo.featured
          ? "border-[color:var(--violet-soft)]/40"
          : "border-white/10"
      }`}
    >
      <div
        className="relative flex h-full min-h-[240px] flex-col p-6 sm:p-7"
        style={{ background: cardSurface }}
      >
        <div className="flex items-start justify-between gap-3">
          {repo.featuredBadge ? (
            <span className={accentBadgeClass()}>{repo.featuredBadge}</span>
          ) : (
            <span className="h-5" aria-hidden />
          )}
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          <h4 className="font-display text-xl uppercase leading-[0.95] tracking-tight text-white">
            {repo.name}
          </h4>
          <p className="mt-3 font-mono text-[12px] leading-[1.65] text-white/68">
            {repo.description}
          </p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-4">
          {repo.tags.map((tag) => (
            <li
              key={tag}
              className="border border-white/12 bg-black/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/58"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
