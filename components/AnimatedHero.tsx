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
    <section className="relative isolate overflow-hidden bg-[#03060f] px-6 pb-24 pt-28 text-white">
      <AmbientStage variant="hero" />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[url(/ambient/ambient-grid.svg)] bg-center bg-contain opacity-10"
        initial={shouldAnimate ? { opacity: 0 } : undefined}
        animate={shouldAnimate ? { opacity: 0.12 } : undefined}
        transition={shouldAnimate ? { duration: 1.2, ease: HERO_EASE } : undefined}
      />

      <div className="container relative grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-8 text-balance">
          {eyebrow ? (
            <MotionReveal
              as="p"
              direction="up"
              distance={18}
              className="text-xs font-semibold uppercase tracking-[0.45em] text-teal-200/80"
              splitText
              stagger={0.045}
            >
              {eyebrow}
            </MotionReveal>
          ) : null}

          <div className="space-y-3">
            {headline.map((line, index) => (
              <MaskReveal
                key={line}
                as="h1"
                delay={0.12 + index * 0.08}
                className="font-heading text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[3.8rem]"
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
            className="max-w-2xl text-lg text-white/70 md:text-xl"
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
              initial={shouldAnimate ? { scale: 0.96, opacity: 0 } : undefined}
              animate={shouldAnimate ? { scale: 1, opacity: 1 } : undefined}
              transition={
                shouldAnimate
                  ? { duration: 0.55, delay: 0.5, ease: HERO_EASE }
                  : undefined
              }
            >
              <Link
                href={primaryCta.href}
                className="interactive-cta inline-flex items-center rounded-full bg-dezitech-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_20px_45px_rgba(200,16,46,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dezitech-300"
              >
                {primaryCta.label}
              </Link>
            </motion.div>

            {secondaryCta ? (
              <motion.div
                className="inline-flex"
                initial={shouldAnimate ? { scale: 0.96, opacity: 0 } : undefined}
                animate={shouldAnimate ? { scale: 1, opacity: 1 } : undefined}
                transition={
                  shouldAnimate
                    ? { duration: 0.55, delay: 0.58, ease: HERO_EASE }
                    : undefined
                }
              >
                <Link
                  href={secondaryCta.href}
                  className="interactive-cta inline-flex items-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                >
                  {secondaryCta.label}
                </Link>
              </motion.div>
            ) : null}
          </motion.div>

          <MotionReveal
            className="flex flex-wrap gap-6 text-sm text-white/70"
            direction="up"
            distance={20}
            delay={0.6}
            stagger={0.08}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Response SLA</p>
              <p className="text-2xl font-semibold text-white">2h avg</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Active Deployments</p>
              <p className="text-2xl font-semibold text-white">58</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Global Sites</p>
              <p className="text-2xl font-semibold text-white">14</p>
            </div>
          </MotionReveal>
        </div>

        <div className="relative">
          <ParallaxWrapper
            speed={0.08}
            range={120}
            className="pointer-events-none absolute -left-12 top-6 hidden w-72 opacity-60 lg:block"
          >
            <Image
              src="/ambient/ambient-glow.png"
              alt="Ambient glow"
              width={288}
              height={288}
              className="w-full blur-3xl"
            />
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.12} range={160}>
            <motion.div
              className="interactive-media relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_45px_90px_rgba(3,6,15,0.65)] backdrop-blur-xl"
              initial={
                shouldAnimate ? { opacity: 0, y: 60, scale: 0.95 } : undefined
              }
              animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.95, delay: 0.55, ease: HERO_EASE }}
            >
              <div className="mb-4 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.45em] text-white/60">
                <span>Dezitech Core</span>
                <span>Verified</span>
              </div>
              <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/DEZITECH_MACHINERY_PLACEHOLDER.jpg"
                  alt="Industrial control systems"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 540px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#040915]/80 via-transparent to-transparent" />
              </div>
              <div className="mt-6 grid gap-3 text-xs text-white/70 md:grid-cols-3">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/40">Integrity</p>
                  <p className="text-lg font-semibold text-white">99.982%</p>
                </div>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/40">Latency</p>
                  <p className="text-lg font-semibold text-white">14 ms</p>
                </div>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/40">Thermals</p>
                  <p className="text-lg font-semibold text-white">Optimal</p>
                </div>
              </div>
            </motion.div>
          </ParallaxWrapper>

          <ParallaxWrapper
            speed={0.05}
            axis="x"
            className="pointer-events-none absolute -right-10 bottom-4 hidden w-64 opacity-30 lg:block"
          >
            <Image
              src="/ambient/ambient-lines.svg"
              alt="Technical lines"
              width={320}
              height={220}
              className="w-full"
            />
          </ParallaxWrapper>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;
