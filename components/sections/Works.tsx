"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Portfolio, PortfolioRepo, TemplateWorks } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { clearSplitCharsWillChange, splitChars } from "@/lib/splitChars";
import { SectionFrame } from "@/components/ui/SectionFrame";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

const cardSurface =
  "radial-gradient(120% 90% at 100% 0%, rgba(255,255,255,0.11), transparent 55%), linear-gradient(180deg, var(--violet-deep) 0%, color-mix(in srgb, var(--violet-deep) 72%, black) 100%)";

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path
        d="M3 11 L11 3 M4 3 H11 V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function limeBadgeClass() {
  return "border border-[color:var(--lime)]/45 bg-[color:var(--lime)]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--lime)]";
}

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
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-md font-mono text-[12px] leading-relaxed text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline lg:col-span-5"
            >
              {works.subtitle} ↗
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} works={works} />
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function repoCardHref(repo: PortfolioRepo): string {
  if (repo.caseStudyId) return `/proyecto/${repo.caseStudyId}`;
  if (repo.liveUrl && !repo.liveUrl.startsWith("http")) return repo.liveUrl;
  return repo.repoUrl;
}

function stopCardNavigation(e: React.MouseEvent) {
  e.stopPropagation();
}

function RepoCard({ repo, works }: { repo: PortfolioRepo; works: TemplateWorks }) {
  const router = useRouter();
  const githubAria = works.openRepoAria.replace("{name}", repo.name);
  const caseStudyAria = `${works.caseStudyCta} — ${repo.name}`;
  const isCaseStudy = Boolean(repo.caseStudyId);
  const liveBadge = repo.badges?.find((b) => b.type === "live");
  const androidBadge = repo.badges?.find((b) => b.type === "android");
  const isExternalLive = repo.liveUrl?.startsWith("http");

  const navigateCard = useCallback(() => {
    if (repo.caseStudyId) {
      router.push(`/proyecto/${repo.caseStudyId}`);
      return;
    }
    const fallback = repoCardHref(repo);
    if (fallback.startsWith("http")) {
      window.open(fallback, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(fallback);
  }, [repo, router]);

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={isCaseStudy ? caseStudyAria : githubAria}
      onClick={navigateCard}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateCard();
        }
      }}
      className={`repo-card group relative min-h-[240px] cursor-pointer overflow-hidden border transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_0_1px_rgba(138,63,232,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--lime)] ${
        repo.featured
          ? "border-[color:var(--violet-soft)]/40 hover:border-[color:var(--violet-soft)]/55"
          : "border-white/10 hover:border-[color:var(--violet-soft)]/35"
      }`}
    >
      <div
        className="relative flex h-full min-h-[240px] flex-col p-6 sm:p-7"
        style={{ background: cardSurface }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div
          aria-hidden
          className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[color:var(--lime)] transition-transform duration-300 group-hover:scale-y-100"
        />

        <div className="flex items-start justify-between gap-3">
          <a
            href={repo.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={githubAria}
            className="relative z-20 inline-flex h-9 w-9 items-center justify-center border border-white/12 bg-white/[0.05] text-white/55 transition-[border-color,color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--lime)]"
            onClick={stopCardNavigation}
            onMouseDown={stopCardNavigation}
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <div className="flex items-start gap-2">
            <div className="flex flex-wrap justify-end gap-2">
              {repo.featuredBadge ? (
                <span className={accentBadgeClass()}>{repo.featuredBadge}</span>
              ) : null}
              {androidBadge ? (
                <span className={limeBadgeClass()}>{works.androidBadge}</span>
              ) : null}
              {liveBadge?.url ? (
                <a
                  href={liveBadge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative z-20 ${limeBadgeClass()} transition-colors hover:bg-[color:var(--lime)]/20`}
                  onClick={stopCardNavigation}
                  onMouseDown={stopCardNavigation}
                >
                  {works.liveBadge} ↗
                </a>
              ) : null}
              {repo.liveUrl ? (
                <a
                  href={repo.liveUrl}
                  {...(isExternalLive
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`relative z-20 ${limeBadgeClass()} transition-colors hover:bg-[color:var(--lime)]/20`}
                  onClick={stopCardNavigation}
                  onMouseDown={stopCardNavigation}
                >
                  {works.liveBadge} ↗
                </a>
              ) : null}
            </div>
            <ExternalArrow className="mt-0.5 shrink-0 text-white/25 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--lime)]" />
          </div>
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          <h4 className="font-display text-xl uppercase leading-[0.95] tracking-tight text-white">
            {repo.name}
          </h4>
          <p className="mt-3 line-clamp-2 font-mono text-[12px] leading-[1.65] text-white/68">
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
