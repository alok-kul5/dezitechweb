"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import ParallaxWrapper from "./ParallaxWrapper";
import { useReducedMotion } from "./useReducedMotion";

const AmbientStage = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(80,201,206,0.3),_transparent_70%)] blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: [0.2, 0.4, 0.2],
                scale: [0.9, 1.05, 0.9],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <ParallaxWrapper
        speed={0.08}
        className="absolute -left-20 top-32 hidden w-[620px] opacity-25 lg:block"
      >
        <Image
          src="/ambient/ambient-grid.svg"
          alt="Ambient grid"
          width={620}
          height={420}
          className="w-full mix-blend-screen"
        />
      </ParallaxWrapper>

      <ParallaxWrapper
        speed={0.05}
        className="absolute -right-16 top-12 hidden w-[780px] opacity-30 xl:block"
      >
        <Image
          src="/ambient/ambient-lines.svg"
          alt="Ambient technical lines"
          width={780}
          height={400}
          className="w-full"
        />
      </ParallaxWrapper>

      <ParallaxWrapper
        speed={0.12}
        className="absolute left-6 bottom-12 hidden w-64 opacity-40 md:block"
      >
        <Image
          src="/ambient/ambient-gear-outline.svg"
          alt="Ambient gear outline"
          width={256}
          height={256}
          className="w-full"
        />
      </ParallaxWrapper>

      <ParallaxWrapper
        speed={0.1}
        axis="x"
        className="absolute right-10 bottom-4 hidden w-72 opacity-35 md:block"
      >
        <Image
          src="/ambient/ambient-glow.png"
          alt="Ambient glow"
          width={288}
          height={288}
          className="w-full"
        />
      </ParallaxWrapper>
    </div>
  );
};

export default AmbientStage;
