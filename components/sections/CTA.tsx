"use client";

import { useEffect, useRef, useState } from "react";
import type { Portfolio } from "@/types/portfolio";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionFrame } from "@/components/ui/SectionFrame";

type Props = { data: Portfolio; reduceMotion: boolean; liteMotion: boolean };

type FormStatus = "idle" | "loading" | "success" | "error";

const btnPrimaryClass =
  "inline-flex items-center justify-center gap-2 bg-[color:var(--lime)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:text-[12px]";

const fieldClass =
  "w-full rounded-sm border border-white/15 bg-black/25 px-4 py-3 font-mono text-[13px] text-white placeholder:text-white/40 transition-colors focus:border-[color:var(--lime)] focus:outline-none";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function CTA({ data, reduceMotion, liteMotion }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const { cta } = data.template;
  const { form } = cta;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (reduceMotion || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".cta-col", { opacity: 0, y: 24 });

      ScrollTrigger.create({
        trigger: root.current!,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.to(".cta-col", {
            opacity: 1,
            y: 0,
            duration: liteMotion ? 0.55 : 0.75,
            stagger: 0.12,
            ease: "power2.out",
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, liteMotion]);

  const handleSend = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      return;
    }

    if (!EMAIL_RE.test(trimmedEmail)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const phoneHref = `tel:${data.personal.phone.replace(/\s+/g, "")}`;
  const headingSecond = cta.heading[1]?.trim();

  return (
    <SectionFrame
      id="contact"
      theme="ink"
      indexLabel={cta.indexLabel}
      kicker={cta.kicker ?? ""}
      fill={false}
    >
      <div
        ref={root}
        className="relative w-full px-4 pb-32 pt-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[45fr_55fr] lg:gap-16 lg:items-start">
          {/* Left column — copy + contact links */}
          <div className="cta-col flex flex-col gap-6">
            <h2 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.92] uppercase">
              <span className="block">{cta.heading[0]}</span>
              {headingSecond ? (
                <span className="block text-display-fill">{headingSecond}</span>
              ) : null}
            </h2>

            <p className="max-w-md font-mono text-[13px] leading-relaxed text-white/80 sm:text-[14px]">
              {cta.body}
            </p>

            <AvailabilityBadge label={cta.availabilityLine} />

            <ul className="mt-2 space-y-3 font-mono text-[13px]">
              <li>
                <a
                  href={`mailto:${data.personal.email}`}
                  className="inline-flex items-center gap-2 text-white/85 transition-colors hover:text-[color:var(--lime)]"
                >
                  <span aria-hidden>📧</span>
                  {data.personal.email}
                </a>
              </li>
              <li>
                <a
                  href={data.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/85 transition-colors hover:text-[color:var(--lime)]"
                >
                  <span aria-hidden>💼</span>
                  {cta.linkedinLabel}
                </a>
              </li>
              <li>
                <a
                  href={data.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/85 transition-colors hover:text-[color:var(--lime)]"
                >
                  <span aria-hidden>🐙</span>
                  {cta.githubDisplay}
                </a>
              </li>
              <li>
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 text-white/85 transition-colors hover:text-[color:var(--lime)]"
                >
                  <span aria-hidden>📞</span>
                  {data.personal.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Right column — form */}
          <div className="cta-col">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-8">
                <span
                  className="font-mono text-2xl text-emerald-400"
                  aria-hidden
                >
                  ✓
                </span>
                <p className="font-mono text-[14px] leading-relaxed text-emerald-400/95">
                  {form.success}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50"
                  >
                    {form.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={form.namePlaceholder}
                    className={fieldClass}
                    disabled={status === "loading"}
                    autoComplete="name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50"
                  >
                    {form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={form.emailPlaceholder}
                    className={fieldClass}
                    disabled={status === "loading"}
                    autoComplete="email"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50"
                  >
                    {form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={form.messagePlaceholder}
                    rows={4}
                    className={`${fieldClass} min-h-[120px] resize-y`}
                    disabled={status === "loading"}
                  />
                </div>

                {status === "error" ? (
                  <p className="font-mono text-[12px] text-red-400" role="alert">
                    {form.error}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={status === "loading"}
                  className={btnPrimaryClass}
                >
                  {status === "loading" ? form.sending : form.submit}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
