"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Portfolio, PortfolioProject } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";

type Props = { data: Portfolio; reduceMotion: boolean };

const projectKind = (data: Portfolio, project: PortfolioProject) =>
  project.kind ?? data.template.works.projectKindFallback;

export function Works({ data, reduceMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const w1 = useRef<HTMLSpanElement | null>(null);
  const w2 = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reduceMotion || !root.current) return;
    const c1 = splitChars(w1.current);
    const c2 = splitChars(w2.current);

    const ctx = gsap.context(() => {
      gsap.set([...c1, ...c2], { yPercent: 110, opacity: 0 });
      gsap.set(".work-card", { opacity: 0, y: 80 });

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to([...c1, ...c2], {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: { each: 0.02 },
          }).to(
            ".work-card",
            { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
            "<0.2",
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

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

  return (
    <article
      className={`work-card group overflow-hidden border border-white/10 bg-[color:var(--violet-deep)] ${className}`}
    >
      <ProjectMedia project={project} sizes="(max-width: 1024px) 100vw, 60vw" />

      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--lime)]">
          {projectKind(data, project)}
        </p>
        <h3 className="font-display text-3xl uppercase leading-[0.95] sm:text-4xl">
          {project.title}
        </h3>
        {project.description ? (
          <p className="max-w-md font-mono text-[12px] leading-relaxed text-white/80">
            {project.description}
          </p>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-2">
          <ProjectList label={works.highlightsLabel} items={project.highlights} />
          <ProjectList label={works.documentationLabel} items={project.documentation} />
        </div>
        <ProjectLinks label={works.linksLabel} project={project} />
      </div>
    </article>
  );
}

function WorkCardSmall({ data, project }: { data: Portfolio; project: PortfolioProject }) {
  const { works } = data.template;

  return (
    <article className="work-card group overflow-hidden border border-white/10 bg-[color:var(--violet-deep)]">
      <ProjectMedia project={project} sizes="(max-width: 1024px) 100vw, 40vw" compact />

      <div className="flex flex-col gap-4 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
          {projectKind(data, project)}
        </p>
        <h4 className="font-display text-2xl uppercase leading-[0.95]">
          {project.title}
        </h4>
        {project.description ? (
          <p className="font-mono text-[11px] leading-relaxed text-white/75">
            {project.description}
          </p>
        ) : null}

        <ProjectList label={works.highlightsLabel} items={project.highlights?.slice(0, 2)} />
        <ProjectList
          label={works.documentationLabel}
          items={project.documentation?.slice(0, 1)}
        />
        <ProjectLinks label={works.linksLabel} project={project} />
      </div>
    </article>
  );
}

function ProjectMedia({
  project,
  sizes,
  compact = false,
}: {
  project: PortfolioProject;
  sizes: string;
  compact?: boolean;
}) {
  const media = (
    <div className={`relative w-full overflow-hidden ${compact ? "aspect-[5/3]" : "aspect-[5/4]"}`}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={sizes}
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
      <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center bg-[color:var(--lime)] text-[color:var(--ink)] transition-transform group-hover:scale-110">
        <ArrowIcon />
      </span>
    </div>
  );

  if (!project.href) {
    return media;
  }

  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={project.title}>
      {media}
    </a>
  );
}

function ProjectList({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--lime)]">
        {label}
      </p>
      <ul className="space-y-2 font-mono text-[11px] leading-relaxed text-white/70">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-[color:var(--lime)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectLinks({ label, project }: { label: string; project: PortfolioProject }) {
  const links = project.links ?? [];
  if (!links.length) return null;

  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={`${project.id}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-[color:var(--lime)] hover:bg-[color:var(--lime)] hover:text-[color:var(--ink)]"
          >
            {link.label}
            <ArrowIcon size={10} />
          </a>
        ))}
      </div>
    </div>
  );
}

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 11 L11 3 M4 3 H11 V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
