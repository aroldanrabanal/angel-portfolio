"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Portfolio } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { TechCarouselStaticGrid } from "@/components/canvas/TechCarouselStaticGrid";
import {
  preloadTechCarouselChunk,
  preloadTechCarouselIcons,
} from "@/lib/techCarouselPreload";

const TechCarouselCanvas = dynamic(
  () =>
    import("@/components/canvas/TechCarouselCanvas").then((m) => m.TechCarouselCanvas),
  { ssr: false },
);

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

export function Technologies({ data, reduceMotion, liteMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const w1 = useRef<HTMLSpanElement | null>(null);
  const w2 = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  const section = data.template.technologies;
  const useStatic = reduceMotion || liteMotion;

  useEffect(() => {
    if (useStatic) return;
    preloadTechCarouselChunk();
    void preloadTechCarouselIcons();
  }, [useStatic]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const updateInView = (intersecting: boolean) => {
      setInView(intersecting);
    };

    const observer = new IntersectionObserver(
      ([entry]) => updateInView(entry?.isIntersecting ?? false),
      { rootMargin: "280px 0px", threshold: 0.01 },
    );
    observer.observe(node);

    const rect = node.getBoundingClientRect();
    const nearViewport =
      rect.top < window.innerHeight + 280 && rect.bottom > -280;
    if (nearViewport) updateInView(true);

    return () => observer.disconnect();
  }, []);

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
      gsap.set(".tech-canvas-wrap", { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top 72%",
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
            ".tech-canvas-wrap",
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            "<0.15",
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  return (
    <SectionFrame
      id="technologies"
      theme="ink"
      indexLabel={section.indexLabel}
      kicker={section.kicker ?? ""}
      fill={false}
    >
      <div ref={root} className="relative w-full px-4 pb-24 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="font-display text-[11vw] leading-[0.92] sm:text-[7vw] lg:text-[5vw]">
              <span ref={w1} className="block overflow-hidden">
                {section.heading[0]}
              </span>
              <span ref={w2} className="block overflow-hidden text-display-fill">
                {section.heading[1]}
              </span>
            </h2>
          </div>

          <div className="tech-canvas-wrap">
            {useStatic ? (
              <TechCarouselStaticGrid />
            ) : (
              <TechCarouselCanvas active={inView} />
            )}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
