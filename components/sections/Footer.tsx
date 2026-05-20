import type { Portfolio } from "@/types/portfolio";
import { Monogram } from "@/components/ui/Monogram";

type Props = { data: Portfolio };

const socialLinkClass =
  "inline-flex h-9 w-9 items-center justify-center border border-white/12 bg-white/[0.05] text-white/55 transition-[border-color,color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-[color:var(--lime)]";

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4 6h16v12H4V6zm0 0 8 7 8-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M6.5 4h3l1.5 5-2 1.2a11 11 0 005.3 5.3L17.5 14l5 1.5v3a2 2 0 01-2.1 2C9.8 20.5 3.5 14.2 4 6.6A2 2 0 016 4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AvailabilityBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/25 px-3.5 py-2 font-mono text-[11px] tracking-wide text-white/90 backdrop-blur-md sm:text-[12px]">
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span>{label}</span>
    </div>
  );
}

export function Footer({ data }: Props) {
  const { footer, brand, hero } = data.template;
  const { personal } = data;
  const uiFooter = data.ui.footer;
  const phoneHref = `tel:${personal.phone.replace(/\s+/g, "")}`;

  return (
    <footer
      id="site-footer"
      data-theme="ink"
      className="relative z-10 w-full border-t border-white/10 bg-[color:var(--ink)] text-white"
    >
      {/* Zone 2 — main content */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1.5fr_1.5fr] lg:gap-10">
          {/* Column 1 — Identity */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-[color:var(--violet-soft)]">
              <Monogram size={56} color="currentColor" />
              <p className="font-display text-3xl uppercase tracking-tight text-white">
                {brand.name}
              </p>
            </div>
            <p className="max-w-sm font-mono text-[12px] leading-relaxed text-white/60">
              {footer.identitySubtitle}
            </p>
            <AvailabilityBadge label={hero.availabilityLine} />
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={uiFooter.socialAria.github}
                className={socialLinkClass}
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={uiFooter.socialAria.linkedin}
                className={socialLinkClass}
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label={uiFooter.socialAria.email}
                className={socialLinkClass}
              >
                <MailIcon className="h-4 w-4" />
              </a>
              <a
                href={phoneHref}
                aria-label={uiFooter.socialAria.phone}
                className={socialLinkClass}
              >
                <PhoneIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Education */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              {uiFooter.educationTitle}
            </h4>
            <ul className="mt-4 space-y-5">
              {footer.education.map((edu) => (
                <li key={edu.title} className="flex gap-3">
                  <span className="shrink-0 text-lg leading-none" aria-hidden>
                    🎓
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start gap-2">
                      <p className="font-display text-sm uppercase leading-tight text-white sm:text-base">
                        {edu.title}
                      </p>
                      {edu.badge ? (
                        <span className="shrink-0 border border-[color:var(--lime)]/50 bg-[color:var(--lime)]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--lime)]">
                          {edu.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] text-white/75">{edu.subtitle}</p>
                    <p className="mt-1 font-mono text-[10px] text-white/45">{edu.meta}</p>
                  </div>
                </li>
              ))}
              <li className="flex gap-3">
                <span className="shrink-0 text-lg leading-none" aria-hidden>
                  🌍
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[12px] leading-snug text-white/90">
                    {footer.erasmus.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-white/45">{footer.erasmus.meta}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3 — Languages */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              {uiFooter.languagesTitle}
            </h4>
            <ul className="mt-4 space-y-4">
              {footer.languages.map((lang) => (
                <li key={lang.name} className="flex gap-3">
                  <span className="shrink-0 text-xl leading-none" aria-hidden>
                    {lang.flag}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[12px] text-white/85">{lang.name}</p>
                    <p className="mt-1 font-mono text-[11px] text-white/70">{lang.level}</p>
                    {lang.subLevel ? (
                      <p className="mt-0.5 font-mono text-[10px] text-white/45">{lang.subLevel}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-white/45">
              {footer.learningNote}
            </p>
          </div>
        </div>

        {/* Zone 3 — copyright bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
          <span className="shrink-0">{footer.copyrightName}</span>
          <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:justify-center">
            <span>{footer.builtWithPrefix}</span>
            {footer.builtWith.map((item, i) => (
              <span key={item.label} className="inline-flex items-center">
                {i > 0 ? <span className="mx-1 text-white/30">·</span> : null}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:var(--lime)]"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </p>
          <span className="shrink-0">{footer.locationLine}</span>
        </div>
      </div>
    </footer>
  );
}
