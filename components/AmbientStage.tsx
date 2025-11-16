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
   opacity: [0.25, 0.45, 0.25],
   scale: [0.92, 1.04, 0.92],
 };
 
 const gradientAnimation = {
   opacity: [0.15, 0.35, 0.15],
   rotate: [0, 3, -2, 0],
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
         className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(87,205,206,0.22),_transparent_65%)]"
         animate={shouldAnimate ? gradientAnimation : undefined}
         transition={
           shouldAnimate
             ? { duration: 16, repeat: Infinity, ease: "easeInOut" }
             : undefined
         }
       />

       <motion.div
         aria-hidden="true"
         className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(5,8,18,0.7),_transparent_70%)] mix-blend-screen"
         animate={shouldAnimate ? { opacity: [0.2, 0.35, 0.2] } : undefined}
         transition={
           shouldAnimate ? { duration: 18, repeat: Infinity, ease: "easeInOut" } : undefined
         }
       />

       <ParallaxWrapper
         speed={0.05}
         className="absolute -left-24 top-24 hidden w-[680px] opacity-30 md:block"
       >
         <Image
           src="/ambient/ambient-grid.svg"
           alt="Ambient grid"
           width={680}
           height={420}
           priority={variant === "hero"}
           className="w-full max-w-none mix-blend-screen"
         />
       </ParallaxWrapper>

       <ParallaxWrapper
         speed={0.035}
         className="absolute -right-16 top-6 hidden w-[760px] opacity-40 lg:block"
       >
         <Image
           src="/ambient/ambient-lines.svg"
           alt="Ambient lines"
           width={760}
           height={420}
           className="w-full max-w-none"
         />
       </ParallaxWrapper>

       <ParallaxWrapper
         speed={0.08}
         className="absolute left-6 bottom-8 hidden w-52 opacity-45 md:block"
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
         className="absolute right-8 bottom-6 hidden w-64 opacity-40 lg:block"
       >
         <Image
           src="/ambient/ambient-glow.png"
           alt="Ambient glow"
           width={256}
           height={256}
           className="w-full blur-xl"
         />
       </ParallaxWrapper>

      {variant === "hero" ? (
        <>
          <ParallaxWrapper
            speed={0.045}
            className="absolute left-1/4 top-6 hidden w-[520px] -translate-x-1/2 opacity-30 xl:block"
          >
            <Image
              src="/ambient/ambient-lines.svg"
              alt="Ambient overlay"
              width={520}
              height={320}
            />
          </ParallaxWrapper>
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(95,186,255,0.15),_transparent_65%)] blur-3xl"
            animate={shouldAnimate ? glowAnimation : undefined}
            transition={
              shouldAnimate
                ? { duration: 20, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                : undefined
            }
          />
        </>
      ) : null}
     </div>
   );
 };

 export default AmbientStage;
