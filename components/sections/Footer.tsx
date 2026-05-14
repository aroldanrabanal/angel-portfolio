"use client";

import type { Portfolio } from "@/types/portfolio";
import { Monogram } from "@/components/ui/Monogram";
import { Marquee } from "@/components/ui/Marquee";

type Props = { data: Portfolio };

function PlanetGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48" className={className} aria-hidden>
      <circle cx="32" cy="32" r="14" fill="currentColor" />
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(-18 32 32)"
      />
    </svg>
  );
}

export function Footer({ data }: Props) {
  const { footer, brand } = data.template;

  return (
    <footer
      id="site-footer"
      data-theme="ink"
      className="relative z-10 w-full bg-[color:var(--ink)] text-white"
    >
      <div className="border-y border-white/10 py-4">
        <Marquee
          items={footer.marqueeItems}
          speed={42}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 lg:px-12">
        {/* Top: monogram + columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-[color:var(--violet-soft)]">
              <Monogram size={56} color="currentColor" />
              <p className="font-display text-3xl uppercase tracking-tight text-white">
                {brand.name}
              </p>
            </div>
            <p className="mt-4 max-w-xs font-mono text-[12px] leading-relaxed text-white/60">
              {brand.tagline}. {data.personal.name} — {data.personal.location}.
            </p>
            <PlanetGlyph className="mt-10 text-[color:var(--violet-soft)]" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href ? (
                        <a
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-mono text-[12px] text-white/85 transition-colors hover:text-[color:var(--lime)]"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <span className="font-mono text-[12px] text-white/85">{l.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education + Languages explicit (real data) */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              {data.ui.footer.educationTitle}
            </h4>
            <ul className="mt-4 space-y-4">
              {data.education.map((ed) => (
                <li key={ed.degree}>
                  <p className="font-display text-base uppercase leading-tight text-white">
                    {ed.degree}
                  </p>
                  <p className="font-mono text-[11px] text-white/60">
                    {ed.school} · {ed.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              {data.ui.footer.languagesTitle}
            </h4>
            <ul className="mt-4 space-y-3">
              {data.languages.map((l) => (
                <li
                  key={l.lang}
                  className="flex items-baseline justify-between border-b border-white/10 pb-2 font-mono text-[12px]"
                >
                  <span className="font-display text-base uppercase text-white">
                    {l.lang}
                  </span>
                  <span className="text-white/70">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {data.personal.name}. {footer.tagline}.
          </span>
          <span>{footer.legal}</span>
        </div>
      </div>
    </footer>
  );
}
