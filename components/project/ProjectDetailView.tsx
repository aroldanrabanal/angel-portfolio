"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Portfolio, PortfolioProject } from "@/types/portfolio";
import portfolioEn from "@/data/portfolio.en.json";
import portfolioEs from "@/data/portfolio.es.json";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LenisProvider } from "@/lib/lenis";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { TopNav } from "@/components/ui/TopNav";
import { Footer } from "@/components/sections/Footer";
import { findProject } from "@/lib/portfolioProject";

const dataEn = portfolioEn as Portfolio;
const dataEs = portfolioEs as Portfolio;

type Props = { projectId: string };

function bodyThemeFromAccent(accent: PortfolioProject["accent"]) {
  if (accent === "lime") return "violet-deep";
  return accent ?? "ink";
}

export function ProjectDetailView({ projectId }: Props) {
  const { locale } = useLocale();
  const data = locale === "es" ? dataEs : dataEn;
  const project = useMemo(() => findProject(data, projectId), [data, projectId]);
  const { works } = data.template;

  useEffect(() => {
    if (!project) return;
    const t = bodyThemeFromAccent(project.accent);
    document.body.dataset.theme = t;
    return () => {
      document.body.dataset.theme = "ink";
    };
  }, [project]);

  if (!project) {
    return null;
  }

  const resolvedLinks =
    project.links?.length ?
      project.links
    : project.href ?
      [{ label: works.openRepo, url: project.href, external: true }]
    : [];

  return (
    <LenisProvider>
      <BackgroundGrid />
      <TopNav data={data} />
      <main className="relative z-10 pt-28 md:pt-32">
        <article className="mx-auto max-w-[900px] px-4 pb-24 sm:px-8 lg:px-12">
          <Link
            href="/#works"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--violet-soft)]"
          >
            ← {works.backToWorks}
          </Link>

          <header className="mt-10 border-b border-current/10 pb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--lime)]">
              {project.kind ?? works.projectKindFallback}
            </p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-[0.95] sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[12px] text-[color:var(--muted)]">
              {project.year ? <span>{project.year}</span> : null}
              {project.role ? <span>{project.role}</span> : null}
            </div>
          </header>

          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-current/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 900px"
              priority
            />
          </div>

          {project.description ? (
            <p className="mt-10 font-mono text-[13px] leading-relaxed text-[color:var(--muted)]">
              {project.description}
            </p>
          ) : null}

          {project.content?.length ? (
            <section className="mt-12" aria-labelledby="project-overview">
              <h2
                id="project-overview"
                className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
              >
                {works.detailOverviewHeading}
              </h2>
              <div className="mt-4 space-y-4 font-mono text-[13px] leading-relaxed text-[color:var(--muted)]">
                {project.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ) : null}

          {project.tech?.length ? (
            <section className="mt-12" aria-labelledby="project-tech">
              <h2
                id="project-tech"
                className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
              >
                {works.detailTechHeading}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="border border-current/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--fg)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.highlights?.length ? (
            <section className="mt-12" aria-labelledby="project-highlights">
              <h2
                id="project-highlights"
                className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
              >
                {works.detailHighlightsHeading}
              </h2>
              <ul className="mt-6 space-y-8">
                {project.highlights.map((h) => (
                  <li key={h.title}>
                    <h3 className="font-display text-lg uppercase text-[color:var(--lime)]">{h.title}</h3>
                    <p className="mt-2 font-mono text-[13px] leading-relaxed text-[color:var(--muted)]">
                      {h.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {resolvedLinks.length ? (
            <section className="mt-14" aria-labelledby="project-links">
              <h2
                id="project-links"
                className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
              >
                {works.detailLinksHeading}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {resolvedLinks.map((link) => {
                  const ext = link.external !== false;
                  return (
                    <a
                      key={link.url + link.label}
                      href={link.url}
                      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-2 border border-current/20 bg-[color:var(--violet-soft)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {link.label}
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path
                          d="M3 11 L11 3 M4 3 H11 V10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                        />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <Footer data={data} />
    </LenisProvider>
  );
}
