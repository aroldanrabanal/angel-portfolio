"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Portfolio } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Crosshair } from "@/components/ui/Crosshair";
import { BrandWord } from "@/components/ui/BrandWord";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

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
      gsap.set(".about-strip > *", { opacity: 0, y: 12 });

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
              ".about-strip > *",
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
              "<0.1",
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
              {/* Duotone overlay */}
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
              {/* hairline frame */}
              <div className="pointer-events-none absolute inset-3 border border-white/20" />
              {/* tag */}
              <div className="absolute bottom-3 left-3 right-3 flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                <span>{data.personal.location}</span>
                <span>{data.template.brand.estYear}</span>
              </div>
            </div>
          </div>

          {/* Heading + body */}
          <div className="relative col-span-1 flex flex-col gap-8 lg:col-span-7 lg:pl-10">
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

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              <p>{about.commitStripLabel}</p>
              <div className="about-strip flex flex-wrap items-center gap-x-10 gap-y-4 text-white">
                <BrandWord variant="sans" className="text-2xl">{about.trustStrip[0]}</BrandWord>
                <BrandWord variant="serif" className="text-2xl">{about.trustStrip[1]}</BrandWord>
                <BrandWord variant="mono" className="text-base">{about.trustStrip[2]}</BrandWord>
                <BrandWord variant="italic" className="text-2xl">{about.trustStrip[3]}</BrandWord>
                <BrandWord variant="display" className="text-xl">{about.trustStrip[4]}</BrandWord>
                <BrandWord variant="sans" className="text-2xl">{about.trustStrip[5]}</BrandWord>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
