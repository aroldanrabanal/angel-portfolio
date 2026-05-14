"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type { Portfolio } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Crosshair } from "@/components/ui/Crosshair";

const CTAKnot = dynamic(
  () => import("@/components/canvas/CTAKnot").then((m) => m.CTAKnot),
  { ssr: false },
);

type Props = { data: Portfolio; reduceMotion: boolean };

export function CTA({ data, reduceMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const w1 = useRef<HTMLSpanElement | null>(null);
  const w2 = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reduceMotion || !root.current) return;
    const c1 = splitChars(w1.current);
    const c2 = splitChars(w2.current);

    const ctx = gsap.context(() => {
      gsap.set([...c1, ...c2], { yPercent: 110, opacity: 0 });
      gsap.set(".cta-knot-wrap", { opacity: 0, scale: 0.75 });
      gsap.set(".cta-extra", { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(".cta-knot-wrap", { opacity: 1, scale: 1, duration: 1.4 })
            .to(
              [...c1, ...c2],
              { yPercent: 0, opacity: 1, duration: 0.9, stagger: { each: 0.022 } },
              "<0.1",
            )
            .to(
              ".cta-extra",
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
              "<0.2",
            );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  const { cta } = data.template;

  return (
    <SectionFrame
      id="contact"
      theme="violet"
      indexLabel={cta.indexLabel}
      kicker={cta.kicker ?? ""}
    >
      <div
        ref={root}
        className="relative w-full overflow-hidden px-4 pb-32 pt-24 sm:px-8 lg:px-12"
        style={{
          background:
            "linear-gradient(180deg, var(--cream) 0%, var(--violet) 30%, var(--violet-deep) 75%, var(--ink) 100%)",
        }}
      >
        <div className="mx-auto grid max-w-[1400px] place-items-center">
          <div className="relative grid h-[80vh] min-h-[600px] w-full place-items-center">
            <div className="cta-knot-wrap absolute inset-0 z-0">
              <CTAKnot reduceMotion={reduceMotion} />
            </div>

            <p className="cta-extra absolute top-6 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">
              {cta.kicker}
            </p>

            <h2 className="relative z-10 mx-auto max-w-[1100px] text-center font-display text-[14vw] leading-[0.92] sm:text-[11vw] lg:text-[8.5vw]">
              <span ref={w1} className="block overflow-hidden">
                {cta.heading[0]}
              </span>
              <span ref={w2} className="block overflow-hidden text-display-fill">
                {cta.heading[1]}
              </span>
            </h2>

            <Crosshair
              size={36}
              color="var(--lime)"
              className="cta-extra absolute bottom-[18%] z-10"
            />
          </div>

          <p className="cta-extra mx-auto mt-8 max-w-xl text-center font-mono text-[12px] leading-relaxed text-white/80 sm:text-[13px]">
            {cta.body}
          </p>

          <div className="cta-extra mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${data.personal.email}`}
              className="inline-flex items-center gap-2 bg-[color:var(--lime)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 11 L11 3 M4 3 H11 V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
              {data.ui.cta.emailMe}
            </a>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
            >
              {data.ui.cta.github}
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
            >
              {data.ui.cta.linkedin}
            </a>
            <a
              href={`tel:${data.personal.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
            >
              {data.personal.phone}
            </a>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
