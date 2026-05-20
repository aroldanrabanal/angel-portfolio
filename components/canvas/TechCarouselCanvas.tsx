"use client";

import { Suspense } from "react";
import { WebGLCanvas } from "@/components/canvas/WebGLCanvas";
import { TechCarouselScene } from "@/components/canvas/TechCarouselScene";
import { TECH_CAROUSEL_ITEMS } from "@/lib/techCarouselItems";

type Props = {
  active: boolean;
  className?: string;
};

export function TechCarouselStaticGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-[500px] flex-wrap items-center justify-center gap-2 px-4 py-12 ${className}`}
      aria-hidden
    >
      {TECH_CAROUSEL_ITEMS.map((item) => (
        <span
          key={item.name}
          className="rounded-full border border-[color:var(--violet-soft)]/35 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm"
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}

export function TechCarouselCanvas({ active, className = "" }: Props) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative h-[min(560px,70vh)] w-full min-h-[500px]">
        <WebGLCanvas
          fallback={<TechCarouselStaticGrid className="h-full" />}
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          dpr={[1, 1.25]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: "transparent", touchAction: "none" }}
          className="!h-full !w-full"
        >
          <Suspense fallback={null}>
            <TechCarouselScene active={active} />
          </Suspense>
        </WebGLCanvas>
      </div>
    </div>
  );
}
