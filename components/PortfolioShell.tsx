"use client";



import { useReducedMotion } from "framer-motion";

import type { Portfolio } from "@/types/portfolio";

import { LenisProvider } from "@/lib/lenis";

import { useMotionProfile } from "@/lib/useMotionProfile";

import { TopNav } from "@/components/ui/TopNav";

import { BackgroundGrid } from "@/components/ui/BackgroundGrid";

import { Hero } from "@/components/sections/Hero";

import { About } from "@/components/sections/About";

import { Skills } from "@/components/sections/Skills";

import { Works } from "@/components/sections/Works";

import { Technologies } from "@/components/sections/Technologies";

import { Experience } from "@/components/sections/Experience";

import { CTA } from "@/components/sections/CTA";

import { Footer } from "@/components/sections/Footer";



type Props = { data: Portfolio };



export function PortfolioShell({ data }: Props) {

  const reduceMotion = useReducedMotion() ?? false;

  const motion = useMotionProfile(reduceMotion);



  return (

    <LenisProvider disabled={motion.disableScrollSmoothing}>

      <BackgroundGrid />

      <TopNav data={data} />

      <main className="relative z-10">

        <Hero data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />

        <About data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />

        <Skills data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />

        <Works data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />

        <Technologies data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />

        <Experience data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />

        <CTA data={data} reduceMotion={motion.reduceMotion} liteMotion={motion.liteMotion} />

      </main>

      <Footer data={data} />

    </LenisProvider>

  );

}

