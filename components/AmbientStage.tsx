 "use client";

 import Image from "next/image";
 import { motion } from "framer-motion";
 
 import ParallaxWrapper from "./ParallaxWrapper";
 import { useReducedMotion } from "./useReducedMotion";
 
 type AmbientStageProps = {
   variant?: "global" | "hero" | "section";
   className?: string;
 };
 
const glowAnimation = {
  opacity: [0.25, 0.4, 0.25],
  scale: [0.94, 1.02, 0.94],
};

const gradientAnimation = {
  opacity: [0.15, 0.35, 0.15],
  rotate: [0, 2.5, -1.5, 0],
};
 
 const AmbientStage = ({ variant = "global", className = "" }: AmbientStageProps) => {
   const prefersReducedMotion = useReducedMotion();
   const shouldAnimate = !prefersReducedMotion;
 
    const sizing =
      variant === "hero"
        ? "absolute inset-0"
        : "absolute inset-0 rounded-[48px] lg:rounded-[64px]";
 
   return (
     <div className={`pointer-events-none -z-10 overflow-hidden ${sizing} ${className}`}>
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(200,16,46,0.14),_transparent_68%)]"
          animate={shouldAnimate ? gradientAnimation : undefined}
          transition={
            shouldAnimate ? { duration: 16, repeat: Infinity, ease: "easeInOut" } : undefined
          }
        />

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(11,15,20,0.85),_transparent_70%)] mix-blend-screen"
          animate={shouldAnimate ? { opacity: [0.2, 0.32, 0.2] } : undefined}
          transition={
            shouldAnimate ? { duration: 18, repeat: Infinity, ease: "easeInOut" } : undefined
          }
        />

       <ParallaxWrapper
         speed={0.05}
          className="absolute -left-24 top-20 hidden w-[640px] max-w-none opacity-20 md:block"
        >
          <Image
            src="/ambient/ambient-grid.svg"
            alt="Ambient grid"
            width={640}
            height={400}
            priority={variant === "hero"}
            className="w-full max-w-none"
          />
        </ParallaxWrapper>

        <ParallaxWrapper
          speed={0.035}
          className="absolute -right-16 top-6 hidden w-[780px] max-w-none opacity-25 lg:block"
        >
          <Image
            src="/ambient/ambient-lines.svg"
            alt="Ambient lines"
            width={780}
            height={440}
            className="w-full max-w-none"
          />
        </ParallaxWrapper>

        <ParallaxWrapper
          speed={0.08}
          className="absolute left-6 bottom-8 hidden w-52 opacity-35 md:block"
       >
         <Image
           src="/ambient/ambient-gear-outline.svg"
           alt="Ambient gear outline"
           width={208}
           height={208}
         />
       </ParallaxWrapper>

       <ParallaxWrapper
         speed={0.06}
         axis="x"
          className="absolute right-8 bottom-6 hidden w-64 opacity-30 lg:block"
        >
          <Image
            src="/ambient/ambient-glow.png"
            alt="Ambient glow"
            width={256}
            height={256}
            className="w-full blur-3xl"
          />
        </ParallaxWrapper>

        {variant === "hero" ? (
          <>
            <ParallaxWrapper
              speed={0.045}
              className="absolute left-1/2 top-4 hidden w-[520px] -translate-x-1/2 opacity-30 xl:block"
            >
              <Image src="/ambient/ambient-lines.svg" alt="Ambient overlay" width={520} height={320} />
            </ParallaxWrapper>
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(200,16,46,0.24),_transparent_70%)] blur-3xl"
              animate={shouldAnimate ? glowAnimation : undefined}
              transition={
                shouldAnimate ? { duration: 20, repeat: Infinity, ease: "easeInOut", delay: 0.5 } : undefined
              }
            />
            <ParallaxWrapper
              speed={0.065}
              className="absolute right-1/4 bottom-0 hidden w-[380px] translate-x-1/2 opacity-35 lg:block"
            >
              <Image
                src="/ambient/ambient-glow.png"
                alt="Hero ambient glow"
                width={380}
                height={380}
                priority
                className="w-full blur-[120px]"
              />
            </ParallaxWrapper>
          </>
        ) : null}
     </div>
   );
 };

 export default AmbientStage;
