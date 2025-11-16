"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import AmbientStage from "./AmbientStage";
import MaskReveal from "./MaskReveal";
import MotionReveal from "./MotionReveal";
import ParallaxWrapper from "./ParallaxWrapper";
import { useReducedMotion } from "./useReducedMotion";

type Cta = {
  label: string;
  href: string;
};

type AnimatedHeroProps = {
  eyebrow?: string;
  headline: string[];
  description: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
};

const HERO_EASE: [number, number, number, number] = [0.21, 0.8, 0.32, 1];

const AnimatedHero = ({
  eyebrow,
  headline,
  description,
  primaryCta,
  secondaryCta,
}: AnimatedHeroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  return (
    <section className="relative isolate overflow-hidden bg-carbon-900 pb-20 pt-24 text-white sm:pb-28 sm:pt-28 lg:pb-32">
      <AmbientStage variant="hero" className="opacity-80" />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-9 text-balance lg:col-span-7">
            {eyebrow ? (
              <MotionReveal
                as="p"
                direction="up"
                distance={18}
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/60"
                splitText
                stagger={0.045}
              >
                {eyebrow}
              </MotionReveal>
            ) : null}

            <div className="space-y-4">
              {headline.map((line, index) => (
                <MaskReveal
                  key={line}
                  as="h1"
                  delay={0.12 + index * 0.08}
                  className="font-heading text-[2.75rem] font-semibold leading-[1.05] text-white md:text-[48px] lg:text-[72px] xl:text-[88px]"
                >
                  {line}
                </MaskReveal>
              ))}
            </div>

            <MotionReveal
              as="p"
              direction="up"
              distance={24}
              delay={0.35}
              className="max-w-2xl text-base text-white/80 md:text-lg"
            >
              {description}
            </MotionReveal>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={
                shouldAnimate
                  ? { duration: 0.65, ease: HERO_EASE, delay: 0.45, staggerChildren: 0.08 }
                  : undefined
              }
            >
              <motion.div
                className="inline-flex"
                initial={shouldAnimate ? { opacity: 0, y: 12 } : undefined}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={
                  shouldAnimate ? { duration: 0.5, delay: 0.5, ease: HERO_EASE } : undefined
                }
              >
                <Link
                  href={primaryCta.href}
                  className="interactive-cta inline-flex items-center rounded-full bg-dezitech-500 px-8 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                >
                  {primaryCta.label}
                </Link>
              </motion.div>

              {secondaryCta ? (
                <motion.div
                  className="inline-flex"
                  initial={shouldAnimate ? { opacity: 0, y: 12 } : undefined}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  transition={
                    shouldAnimate ? { duration: 0.5, delay: 0.55, ease: HERO_EASE } : undefined
                  }
                >
                  <Link
                    href={secondaryCta.href}
                    className="interactive-cta inline-flex items-center rounded-full border border-white/30 px-8 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                  >
                    {secondaryCta.label}
                  </Link>
                </motion.div>
              ) : null}
            </motion.div>

            <MotionReveal
              className="grid gap-6 text-sm text-white/80 sm:grid-cols-3"
              direction="up"
              distance={20}
              delay={0.6}
              stagger={0.08}
            >
              {[
                { label: "Response SLA", value: "2h avg" },
                { label: "Active Deployments", value: "58" },
                { label: "Global Sites", value: "14" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/40">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </MotionReveal>
          </div>

          <div className="relative lg:col-span-5">
            <ParallaxWrapper
              speed={0.06}
              axis="x"
              className="pointer-events-none absolute -right-10 top-10 hidden w-72 opacity-30 lg:block"
            >
              <Image
                src="/ambient/ambient-lines.svg"
                alt="Ambient line work"
                width={320}
                height={220}
                loading="lazy"
                className="w-full"
              />
            </ParallaxWrapper>

            <ParallaxWrapper
              speed={0.04}
              className="pointer-events-none absolute -left-12 bottom-10 hidden w-64 opacity-25 lg:block"
            >
              <Image
                src="/ambient/ambient-grid.svg"
                alt="Ambient grid"
                width={310}
                height={230}
                loading="lazy"
                className="w-full"
              />
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.12} range={180}>
              <motion.article
                className="interactive-media relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_45px_90px_rgba(3,6,15,0.65)] backdrop-blur-xl"
                initial={shouldAnimate ? { opacity: 0, y: 60 } : undefined}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.85, delay: 0.55, ease: HERO_EASE }}
              >
                <div className="mb-5 flex items-center justify-between text-[0.55rem] uppercase tracking-[0.35em] text-white/55">
                  <span>Dezitech Core Systems</span>
                  <span>Verified</span>
                </div>
                <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/images/DEZITECH_IMG_01.jpg"
                    alt="Dezitech industrial control render"
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 540px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#040915]/85 via-transparent to-transparent" />
                </div>
                <div className="mt-6 grid gap-4 text-xs text-white/70 sm:grid-cols-3">
                  {[
                    { label: "Integrity", value: "99.982%" },
                    { label: "Latency", value: "14 ms" },
                    { label: "Thermals", value: "Optimal" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/40">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            </ParallaxWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;
