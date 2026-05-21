"use client";

import dynamic from "next/dynamic";
import type { Portfolio } from "@/types/portfolio";
import { LenisProvider } from "@/lib/lenis";
import { useMotionProfile } from "@/lib/useMotionProfile";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SectionThemeCoordinator } from "@/components/SectionThemeCoordinator";
import { TopNav } from "@/components/ui/TopNav";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";

const About = dynamic(
  () => import("@/components/sections/About").then((m) => m.About),
  { ssr: false, loading: () => <SectionPlaceholder minHeight="min-h-[720px]" /> },
);

const Skills = dynamic(
  () => import("@/components/sections/Skills").then((m) => m.Skills),
  { ssr: false, loading: () => <SectionPlaceholder minHeight="min-h-[520px]" /> },
);

const Works = dynamic(
  () => import("@/components/sections/Works").then((m) => m.Works),
  { ssr: false, loading: () => <SectionPlaceholder minHeight="min-h-[900px]" /> },
);

const Technologies = dynamic(
  () => import("@/components/sections/Technologies").then((m) => m.Technologies),
  { ssr: false, loading: () => <SectionPlaceholder minHeight="min-h-[640px]" /> },
);

const Experience = dynamic(
  () => import("@/components/sections/Experience").then((m) => m.Experience),
  { ssr: false, loading: () => <SectionPlaceholder minHeight="min-h-[700px]" /> },
);

const CTA = dynamic(
  () => import("@/components/sections/CTA").then((m) => m.CTA),
  { ssr: false, loading: () => <SectionPlaceholder minHeight="min-h-[560px]" /> },
);

function SectionPlaceholder({ minHeight }: { minHeight: string }) {
  return <div className={`w-full ${minHeight}`} aria-hidden />;
}

type Props = { data: Portfolio };

export function PortfolioShell({ data }: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const motion = useMotionProfile(reduceMotion);

  return (
    <LenisProvider disabled={motion.disableScrollSmoothing}>
      <SectionThemeCoordinator>
        <BackgroundGrid />
        <TopNav data={data} />
        <main className="relative z-10">
        <Hero data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />
        <About data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />
        <Skills data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />
        <Works data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />
        <Technologies
          data={data}
          reduceMotion={motion.reduceMotion}
          liteMotion={motion.liteMotion}
        />
        <Experience
          data={data}
          reduceMotion={motion.reduceMotion}
          liteMotion={motion.liteMotion}
        />
        <CTA data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />
        </main>
        <Footer data={data} />
      </SectionThemeCoordinator>
    </LenisProvider>
  );
}
