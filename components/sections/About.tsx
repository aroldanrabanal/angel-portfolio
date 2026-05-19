"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Portfolio } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Crosshair } from "@/components/ui/Crosshair";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

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
        className="about-level-fill h-full bg-[color:var(--lime)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export function About({ data, reduceMotion, liteMotion }: Props) {
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
      gsap.set(".about-portrait", { opacity: 0, y: 40 });
      gsap.set(".about-body p", { opacity: 0, y: 20 });
      gsap.set(".about-block", { opacity: 0, y: 24 });
      gsap.set(".about-level-fill", { scaleX: 0, transformOrigin: "left center" });

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(".about-portrait", { opacity: 1, y: 0, duration: 1 })
            .to(
              headingTargets,
              liteMotion
                ? { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" }
                : {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: { each: 0.02 },
                  },
              "<0.1",
            )
            .to(
              ".about-body p",
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" },
              "<0.2",
            )
            .to(
              ".about-block",
              { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power2.out" },
              "<0.15",
            )
            .to(
              ".about-level-fill",
              { scaleX: 1, duration: 0.9, stagger: 0.12, ease: "power2.out" },
              "<0.2",
            );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const { about } = data.template;

  return (
    <SectionFrame
      id="about"
      theme="ink"
      indexLabel={about.indexLabel}
      kicker={about.kicker ?? ""}
    >
      <div ref={root} className="relative w-full px-4 pb-32 pt-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Portrait — duotone */}
          <div className="about-portrait relative col-span-1 lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--violet-deep)]">
              {data.personal.portrait ? (
                <Image
                  src={data.personal.portrait}
                  alt={data.personal.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  style={{ filter: "contrast(1.05) brightness(0.78) saturate(1.05)" }}
                  priority={false}
                />
              ) : null}
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-color"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(110,34,214,0.85) 0%, rgba(255,30,150,0.6) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(120% 80% at 0% 0%, rgba(110,34,214,0.45), transparent 60%)",
                }}
              />
              <div className="pointer-events-none absolute inset-3 border border-white/20" />
              <div className="absolute bottom-3 left-3 right-3 flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                <span>{data.personal.location}</span>
                <span>{data.template.brand.estYear}</span>
              </div>
            </div>
          </div>

          {/* Heading + content */}
          <div className="relative col-span-1 flex flex-col gap-10 lg:col-span-7 lg:pl-10">
            <div className="relative">
              <Crosshair
                size={32}
                color="var(--lime)"
                className="absolute -right-2 -top-6"
              />
              <h2 className="font-display text-[14vw] leading-[0.9] sm:text-[10vw] lg:text-[8vw]">
                <span ref={w1} className="block overflow-hidden">
                  {about.heading[0]}
                </span>
                <span
                  ref={w2}
                  className="block overflow-hidden text-display-fill"
                >
                  {about.heading[1]}
                </span>
              </h2>
            </div>

            <div className="about-body max-w-xl space-y-5 font-mono text-[13px] leading-relaxed text-white/75">
              {about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                {data.ui.footer.educationTitle}
              </p>
              <div className="space-y-4">
                {about.education.map((edu) => (
                  <div
                    key={edu.title}
                    className="about-block flex gap-4 border border-[color:var(--violet-soft)]/50 bg-white/[0.03] p-5 sm:gap-5 sm:p-6"
                  >
                    <span className="shrink-0 text-2xl leading-none" aria-hidden>
                      🎓
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="font-display text-lg leading-tight text-white sm:text-xl">
                          {edu.title}
                        </h3>
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-right">
                          {edu.period}
                        </span>
                      </div>
                      <p className="mt-2 font-mono text-[11px] text-white/50">{edu.school}</p>
                      {edu.badge ? (
                        <p className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--lime)]">
                          {edu.badge}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Erasmus+ */}
            <div
              className="about-block flex gap-4 border border-[color:var(--lime)]/35 bg-gradient-to-r from-[color:var(--violet-deep)]/80 to-white/[0.04] p-5 sm:gap-5 sm:p-6"
            >
              <span className="shrink-0 text-2xl leading-none" aria-hidden>
                🌍
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <p className="font-mono text-[12px] leading-snug text-white/90 sm:text-[13px]">
                  {about.erasmus.title}
                </p>
                <p className="font-mono text-[11px] text-white/50">{about.erasmus.subtitle}</p>
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                {data.ui.footer.languagesTitle}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {about.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="about-block flex flex-col border border-[color:var(--violet-soft)]/50 bg-white/[0.03] p-5 sm:p-6"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl leading-none" aria-hidden>
                        {lang.flag}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[12px] text-white/85">{lang.name}</p>
                        <p className="mt-3 font-display text-base uppercase leading-tight text-[color:var(--lime)] sm:text-lg">
                          {lang.badge}
                        </p>
                        {lang.subBadge ? (
                          <p className="mt-1.5 font-mono text-[10px] text-white/45">
                            {lang.subBadge}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <LevelBar percent={lang.levelPercent} label={lang.name} />
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


