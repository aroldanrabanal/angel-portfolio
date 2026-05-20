"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type {
  Portfolio,
  PortfolioProject,
  PortfolioProjectGalleryImage,
  PortfolioProjectLink,
} from "@/types/portfolio";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { loadPortfolio } from "@/lib/loadPortfolio";
import { LenisProvider } from "@/lib/lenis";
import { useMotionProfile } from "@/lib/useMotionProfile";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { TopNav } from "@/components/ui/TopNav";
import { Footer } from "@/components/sections/Footer";
import { findProject, getAdjacentProjectIds } from "@/lib/portfolioProject";

type Props = { projectId: string; initialData: Portfolio };

const pillClass =
  "rounded-full border border-[color:var(--violet-soft)]/35 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--fg)]/80 backdrop-blur-sm";

function bodyThemeFromAccent(accent: PortfolioProject["accent"]) {
  if (accent === "lime") return "violet-deep";
  return accent ?? "ink";
}

function isGithubUrl(url: string) {
  return /github\.com/i.test(url);
}

function isLiveDemoLink(link: PortfolioProjectLink) {
  if (isGithubUrl(link.url)) return false;
  return /demo|live|vivo/i.test(link.label);
}

function linkButtonLabel(link: PortfolioProjectLink, works: Portfolio["template"]["works"]) {
  if (isLiveDemoLink(link)) return works.openDemo;
  if (isGithubUrl(link.url) && /^github$/i.test(link.label.trim())) return works.openGithub;
  return link.label;
}

function TechPills({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className={pillClass}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectHero({ project }: { project: PortfolioProject }) {
  const [imageError, setImageError] = useState(false);
  const showBanner = !project.image || imageError;
  const portrait = project.imageLayout === "portrait";

  if (showBanner) {
    return (
      <div
        className={`relative mt-10 flex w-full items-center justify-center overflow-hidden border border-current/10 bg-[color:var(--violet-soft)]/10 ${
          portrait ? "mx-auto aspect-[9/16] max-w-[320px]" : "aspect-[16/9]"
        }`}
        aria-hidden
      >
        <span className="px-6 text-center font-display text-3xl uppercase leading-[0.95] tracking-wide text-[color:var(--fg)] sm:text-4xl md:text-5xl">
          {project.title}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative mt-10 overflow-hidden border border-current/10 bg-[color:var(--violet-soft)]/8 ${
        portrait ? "mx-auto aspect-[9/16] w-full max-w-[320px]" : "aspect-[16/9] w-full"
      }`}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className={portrait ? "object-contain" : "object-contain object-center"}
        sizes={portrait ? "320px" : "(max-width: 900px) 100vw, 900px"}
        priority
        onError={() => setImageError(true)}
      />
    </div>
  );
}

function ProjectGallery({
  images,
  heading,
}: {
  images: PortfolioProjectGalleryImage[];
  heading: string;
}) {
  if (images.length === 0) return null;

  return (
    <section className="mt-16 md:mt-20" aria-labelledby="project-gallery">
      <h2
        id="project-gallery"
        className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
      >
        {heading}
      </h2>
      <ul className="mt-5 grid list-none gap-4 p-0 md:grid-cols-2">
        {images.map((img) => (
          <li key={img.src} className="flex flex-col gap-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-current/10 bg-[color:var(--violet-soft)]/8">
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                fill
                className="object-contain object-center"
                sizes="(max-width: 900px) 100vw, 440px"
              />
            </div>
            {img.caption ? (
              <p className="font-mono text-[11px] leading-relaxed text-[color:var(--muted)]">
                {img.caption}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProseSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby={id}>
      <h2
        id={id}
        className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
      >
        {heading}
      </h2>
      <div className="mt-5 max-w-prose font-mono text-[13px] leading-relaxed text-[color:var(--muted)]">
        {children}
      </div>
    </section>
  );
}

export function ProjectDetailView({ projectId, initialData }: Props) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let cancelled = false;
    void loadPortfolio(locale).then((next) => {
      if (!cancelled) setData(next);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const project = useMemo(() => findProject(data, projectId), [data, projectId]);
  const { works } = data.template;
  const { prevId, nextId } = useMemo(
    () => getAdjacentProjectIds(data, projectId),
    [data, projectId],
  );
  const prevProject = useMemo(
    () => (prevId ? findProject(data, prevId) : undefined),
    [data, prevId],
  );
  const nextProject = useMemo(
    () => (nextId ? findProject(data, nextId) : undefined),
    [data, nextId],
  );
  const reduceMotion = useReducedMotion() ?? false;
  const motion = useMotionProfile(reduceMotion);

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

  const headerLinks = project.links ?? [];

  return (
    <LenisProvider disabled={motion.disableScrollSmoothing}>
      <BackgroundGrid />
      <TopNav data={data} />
      <main className="relative z-10 pt-28 md:pt-32">
        <article className="mx-auto max-w-[900px] px-4 pb-24 sm:px-8 lg:px-12">
          {/* Section 1 — Header */}
          <header className="border-b border-current/10 pb-10">
            <h1 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <div className="mt-5">
              <TechPills items={project.tech} />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--lime)]">
              {project.badge}
            </p>
            {headerLinks.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {headerLinks.map((link) => {
                  const ext = link.external !== false;
                  return (
                    <a
                      key={link.url + link.label}
                      href={link.url}
                      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-1.5 rounded-full border border-current/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--fg)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--violet-soft)]"
                    >
                      {linkButtonLabel(link, works)}
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden>
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
            ) : null}
          </header>

          <ProjectHero project={project} />

          <ProseSection id="project-what-is" heading={works.detailWhatIsHeading}>
            <p>{project.whatIs}</p>
          </ProseSection>

          <ProseSection id="project-what-built" heading={works.detailWhatBuiltHeading}>
            <p>{project.whatBuilt}</p>
          </ProseSection>

          {project.gallery?.length ? (
            <ProjectGallery images={project.gallery} heading={works.detailFiguresHeading} />
          ) : null}

          {project.mechanics?.length ? (
            <section className="mt-16 md:mt-20" aria-labelledby="project-mechanics">
              <h2
                id="project-mechanics"
                className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
              >
                {works.detailMechanicsHeading}
              </h2>
              <div className="mt-5 space-y-10">
                {project.mechanics.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--lime)]">
                      {group.title}
                    </h3>
                    <ul className="mt-3 list-inside list-disc space-y-1.5 font-mono text-[13px] leading-relaxed text-[color:var(--muted)]">
                      {group.items.map((item) => (
                        <li key={item.slice(0, 40)}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.teamRoles?.length ? (
            <section className="mt-16 md:mt-20" aria-labelledby="project-team">
              <h2
                id="project-team"
                className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
              >
                {works.detailTeamHeading}
              </h2>
              <ul className="mt-5 space-y-8">
                {project.teamRoles.map((role) => (
                  <li key={role.member}>
                    <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--fg)]">
                      {role.member}
                    </h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 font-mono text-[13px] leading-relaxed text-[color:var(--muted)]">
                      {role.tasks.map((task) => (
                        <li key={task.slice(0, 40)}>{task}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.challenges ? (
            <ProseSection id="project-challenges" heading={works.detailChallengesHeading}>
              <p>{project.challenges}</p>
            </ProseSection>
          ) : null}

          {project.solutions ? (
            <ProseSection id="project-solutions" heading={works.detailSolutionsHeading}>
              <p>{project.solutions}</p>
            </ProseSection>
          ) : null}

          {project.highlights?.length ? (
            <section className="mt-16 md:mt-20" aria-labelledby="project-highlights">
              <h2
                id="project-highlights"
                className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
              >
                {works.detailHighlightsHeading}
              </h2>
              <ul className="mt-5 space-y-6">
                {project.highlights.map((item) => (
                  <li
                    key={item.title}
                    className="border border-current/10 bg-white/[0.03] px-4 py-4 sm:px-5"
                  >
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--lime)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-mono text-[13px] leading-relaxed text-[color:var(--muted)]">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <ProseSection id="project-key-decisions" heading={works.detailKeyDecisionsHeading}>
            <div className="space-y-4">
              {project.keyDecisions.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </ProseSection>

          {/* Section 5 — Built with */}
          <section className="mt-16 md:mt-20" aria-labelledby="project-built-with">
            <h2
              id="project-built-with"
              className="font-display text-xl uppercase tracking-wide text-[color:var(--fg)]"
            >
              {works.detailBuiltWithHeading}
            </h2>
            <div className="mt-5">
              <TechPills items={project.tech} />
            </div>
          </section>

          {/* Section 6 — Navigation */}
          <nav
            className="mt-20 flex flex-col gap-6 border-t border-current/10 pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
            aria-label="Project navigation"
          >
            <div className="flex flex-wrap gap-3">
              {prevId && prevProject ? (
                <Link
                  href={`/proyecto/${prevId}`}
                  className="inline-flex items-center border border-current/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--fg)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--violet-soft)]"
                >
                  ← {works.previousProject}
                </Link>
              ) : null}
              {nextId && nextProject ? (
                <Link
                  href={`/proyecto/${nextId}`}
                  className="inline-flex items-center border border-current/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--fg)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--violet-soft)]"
                >
                  {works.nextProject} →
                </Link>
              ) : null}
            </div>
            <Link
              href="/#works"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--violet-soft)]"
            >
              {works.backToAllWork}
            </Link>
          </nav>
        </article>
      </main>
      <Footer data={data} />
    </LenisProvider>
  );
}
