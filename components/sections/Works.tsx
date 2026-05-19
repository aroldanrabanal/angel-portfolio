"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Portfolio, PortfolioProject } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

const projectKind = (data: Portfolio, project: PortfolioProject) =>
  project.kind ?? data.template.works.projectKindFallback;

function primaryExternalHref(project: PortfolioProject): string | undefined {
  if (project.href) return project.href;
  const hit = project.links?.find((l) => /^https?:\/\//i.test(l.url));
  return hit?.url;
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
      gsap.set(".work-card", { opacity: 0, y: 80 });

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
          ).to(
            ".work-card",
            { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
            "<0.2",
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const { works } = data.template;
  const projects = data.projects;
  const [hero, ...rest] = projects;

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
              {works.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {hero ? (
              <WorkCardLarge data={data} project={hero} className="lg:col-span-7" />
            ) : null}
            <div className="grid grid-cols-1 gap-4 lg:col-span-5 lg:grid-rows-2">
              {rest.map((p) => (
                <WorkCardSmall key={p.id} data={data} project={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function WorkCardLarge({
  data,
  project,
  className = "",
}: {
  data: Portfolio;
  project: PortfolioProject;
  className?: string;
}) {
  const { works } = data.template;
  const ext = primaryExternalHref(project);

  return (
    <div
      className={`work-card group relative block overflow-hidden border border-white/10 bg-[color:var(--violet-deep)] ${className}`}
    >
      <Link
        href={`/proyecto/${project.id}`}
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[color:var(--lime)]"
        aria-label={`${works.caseStudyCta}: ${project.title}`}
      />

      <div className="pointer-events-none relative">
        <div className="relative aspect-[5/4] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:gap-3 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--lime)]">
            {projectKind(data, project)}
          </p>
          {project.tech?.length ? (
            <ul className="flex max-w-md flex-wrap gap-1.5" aria-hidden>
              {project.tech.slice(0, 5).map((t) => (
                <li
                  key={t}
                  className="border border-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/85"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
          <h3 className="font-display text-3xl uppercase leading-[0.95] sm:text-4xl">
            {project.title}
          </h3>
          {project.impactContext ? (
            <p className="text-sm leading-relaxed text-white/55">{project.impactContext}</p>
          ) : null}
          {project.description ? (
            <p className="max-w-md font-mono text-[12px] leading-relaxed text-white/80">
              {project.description}
            </p>
          ) : null}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            {works.caseStudyCta}
          </p>
        </div>
      </div>

      {ext ? (
        <a
          href={ext}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center bg-[color:var(--lime)] text-[color:var(--ink)] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={works.externalLinkAria}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M3 11 L11 3 M4 3 H11 V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </a>
      ) : null}
    </div>
  );
}

function WorkCardSmall({ data, project }: { data: Portfolio; project: PortfolioProject }) {
  const { works } = data.template;
  const ext = primaryExternalHref(project);

  return (
    <div className="work-card group relative block overflow-hidden border border-white/10 bg-[color:var(--violet-deep)]">
      <Link
        href={`/proyecto/${project.id}`}
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[color:var(--lime)]"
        aria-label={`${works.caseStudyCta}: ${project.title}`}
      />

      <div className="pointer-events-none relative">
        <div className="relative aspect-[5/3] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
              {projectKind(data, project)}
            </p>
            {project.tech?.length ? (
              <ul className="mt-1 flex flex-wrap gap-1" aria-hidden>
                {project.tech.slice(0, 3).map((t) => (
                  <li
                    key={t}
                    className="border border-white/12 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/75"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            <h4 className="mt-1 font-display text-xl uppercase leading-[0.95]">
              {project.title}
            </h4>
            {project.impactContext ? (
              <p className="mt-1 text-sm leading-snug text-white/55">{project.impactContext}</p>
            ) : null}
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
              {works.caseStudyCta}
            </p>
          </div>
          {ext ? (
            <a
              href={ext}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto relative z-20 inline-flex h-8 w-8 shrink-0 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white hover:text-[color:var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--lime)]"
              aria-label={works.externalLinkAria}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M3 11 L11 3 M4 3 H11 V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </a>
          ) : (
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-white/30 text-white opacity-40"
              aria-hidden
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 11 L11 3 M4 3 H11 V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
