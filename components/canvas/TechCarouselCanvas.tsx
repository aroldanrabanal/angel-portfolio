"use client";

import { Suspense } from "react";
import { WebGLCanvas } from "@/components/canvas/WebGLCanvas";
import { TechCarouselScene } from "@/components/canvas/TechCarouselScene";
import { TechCarouselStaticGrid } from "@/components/canvas/TechCarouselStaticGrid";

type Props = {
  active: boolean;
  className?: string;
};

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
