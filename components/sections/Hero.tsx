"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Portfolio } from "@/types/portfolio";
import { gsap } from "@/lib/gsap";
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

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const pillClass =
  "inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-wide text-white/85 backdrop-blur-md sm:text-[12px]";

const btnSecondaryClass =
  "inline-flex items-center justify-center gap-2 border border-white/20 bg-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/90 backdrop-blur-md transition-colors hover:border-[color:var(--lime)] hover:text-[color:var(--lime)] sm:text-[12px]";

export function Hero({ data, reduceMotion, liteMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-knot", { opacity: 0, scale: 0.7 });
      gsap.set(".hero-name", { opacity: 0, y: 24 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 24 });
      gsap.set(".hero-tagline", { opacity: 0, y: 16 });
      gsap.set(".hero-availability", { opacity: 0, y: 16 });
      gsap.set(".hero-cta > *", { opacity: 0, y: 12 });
      gsap.set(".hero-profile", { opacity: 0, y: 20 });
      gsap.set(".hero-location", { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(".hero-knot", { opacity: 1, scale: 1, duration: 1.4 }, 0)
        .to(".hero-name", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.15)
        .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.25)
        .to(
          ".hero-tagline, .hero-availability",
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power2.out" },
          0.3,
        )
        .to(
          ".hero-cta > *",
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          0.35,
        )
        .to(".hero-profile", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.45)
        .to(".hero-location", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5);
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const { hero } = data.template;
  const portrait = data.personal.portrait;

  return (
    <SectionFrame
      id="hero"
      theme="ink"
      indexLabel={hero.indexLabel}
      kicker={data.template.brand.name}
    >
      <div ref={root} className="relative h-[100svh] w-full overflow-hidden">
        {/* Capa A — canvas / WebGL (sin cambios) */}
        <div className="hero-knot absolute inset-0 z-10">
          <HeroKnot reduceMotion={reduceMotion} liteMotion={liteMotion} />
        </div>

        {/* Capa B — overlay HTML */}
        <div className="pointer-events-none relative z-20 flex h-full items-center bg-transparent">
          <div className="pointer-events-auto mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 pb-28 pt-24 sm:px-8 lg:grid-cols-[3fr_2fr] lg:gap-12 lg:px-12 lg:pb-24 lg:pt-28">
            {/* Columna derecha — primero en móvil */}
            <div className="flex flex-col items-center gap-4 lg:order-2 lg:items-center">
              <div className="hero-profile relative h-[168px] w-[168px] shrink-0 rounded-full p-[3px] ring-2 ring-[color:var(--lime)]/55 sm:h-[180px] sm:w-[180px] lg:h-[300px] lg:w-[300px]">
                {portrait ? (
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-[color:var(--violet-deep)]">
                    <Image
                      src={portrait}
                      alt={hero.name}
                      fill
                      sizes="(max-width: 1024px) 180px, 300px"
                      className="object-cover"
                      style={{ filter: "contrast(1.05) brightness(0.78) saturate(1.05)" }}
                      priority
                    />
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
                  </div>
                ) : null}
              </div>
              <span className={`hero-location ${pillClass}`}>{hero.location}</span>
            </div>

            {/* Columna izquierda — texto y CTAs */}
            <div className="flex flex-col items-center gap-5 text-center lg:order-1 lg:items-start lg:text-left">
              <h1
                className="hero-name max-w-2xl font-mono text-[clamp(2.5rem,6.5vw,5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white"
              >
                {hero.name}
              </h1>

              <p className="hero-subtitle max-w-xl font-mono text-[15px] leading-snug text-white/85 sm:text-lg">
                {hero.subtitle}
              </p>

              <p className="hero-tagline max-w-xl font-mono text-[12px] leading-relaxed text-[color:var(--muted)] sm:text-[13px]">
                {hero.tagline}
              </p>

              <div className="hero-availability inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/25 px-3.5 py-2 font-mono text-[11px] tracking-wide text-white/90 backdrop-blur-md sm:text-[12px]">
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>{hero.availabilityLine}</span>
              </div>

              <div className="hero-cta mt-1 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href={data.ui.cta.projectsHref}
                  className="inline-flex items-center justify-center gap-2 bg-[color:var(--lime)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink)] transition-transform hover:-translate-y-0.5 sm:text-[12px]"
                >
                  {hero.workCta}
                </a>
                <a
                  href="/CV_Angel_Roldan_Rabanal.pdf"
                  download
                  className={btnSecondaryClass}
                >
                  CV ↓
                </a>
                <a
                  href={data.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={data.ui.cta.linkedin}
                  className={`${btnSecondaryClass} !px-3`}
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
