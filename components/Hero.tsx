"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

import MotionReveal from "./MotionReveal";
import ParallaxWrapper from "./ParallaxWrapper";
import { useReducedMotion } from "./useReducedMotion";

export type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const HERO_EASE: [number, number, number, number] = [0.21, 0.8, 0.32, 1];
const CTA_WRAPPER = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: HERO_EASE,
      duration: 0.6,
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};
const CTA_ITEM = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: HERO_EASE, duration: 0.6 } },
};

const MotionLink = motion(Link);

const Hero = ({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  return (
    <section className="relative overflow-hidden bg-[#03060f] px-6 pb-28 pt-24 text-neutral-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(80,201,206,0.18),_rgba(3,6,15,0))]" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(80,201,206,0.15) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url(/images/DEZITECH_TECH_GRID.svg)",
            backgroundSize: "640px",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="container relative grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-8 text-balance">
          {eyebrow ? (
            <MotionReveal
              as="p"
              className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-200/70"
              direction="up"
              distance={20}
              duration={0.6}
              stagger={0.04}
              splitText
              amount={0.4}
            >
              {eyebrow}
            </MotionReveal>
          ) : null}

          <MotionReveal
            as="h1"
            className="font-heading text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[3.65rem]"
            direction="up"
            distance={38}
            duration={0.75}
            stagger={0.05}
            splitText
            amount={0.35}
          >
            {title}
          </MotionReveal>

          {description ? (
            <MotionReveal
              as="p"
              className="max-w-2xl text-lg text-neutral-300 md:text-xl"
              direction="up"
              distance={28}
              duration={0.7}
              stagger={0.04}
              splitText
              amount={0.3}
            >
              {description}
            </MotionReveal>
          ) : null}

          {primaryCta || secondaryCta ? (
            <motion.div
              className="flex flex-wrap gap-4"
              initial={shouldAnimate ? "hidden" : undefined}
              animate={shouldAnimate ? "visible" : undefined}
              variants={CTA_WRAPPER}
            >
              {primaryCta ? (
                <motion.div variants={CTA_ITEM}>
                  <MotionLink
                    href={primaryCta.href}
                    className="inline-flex items-center rounded-full bg-dezitech-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_20px_40px_rgba(200,16,46,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dezitech-300"
                    whileHover={
                      shouldAnimate ? { scale: 1.05, y: -6, transition: { duration: 0.35, ease: HERO_EASE } } : undefined
                    }
                    whileTap={shouldAnimate ? { scale: 0.98, y: 0 } : undefined}
                  >
                    {primaryCta.label}
                  </MotionLink>
                </motion.div>
              ) : null}
              {secondaryCta ? (
                <motion.div variants={CTA_ITEM}>
                  <MotionLink
                    href={secondaryCta.href}
                    className="inline-flex items-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                    whileHover={
                      shouldAnimate ? { scale: 1.04, y: -4, transition: { duration: 0.35, ease: HERO_EASE } } : undefined
                    }
                    whileTap={shouldAnimate ? { scale: 0.99, y: 0 } : undefined}
                  >
                    {secondaryCta.label}
                  </MotionLink>
                </motion.div>
              ) : null}
            </motion.div>
          ) : null}

          <MotionReveal
            className="flex flex-wrap gap-6 text-sm text-white/70"
            direction="up"
            distance={24}
            duration={0.85}
            stagger={0.08}
            amount={0.4}
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
          <div className="pointer-events-none absolute -left-16 top-14 hidden h-56 w-56 rounded-full bg-teal-500/20 blur-3xl lg:block" />

          <ParallaxWrapper speed={0.26} range={140}>
            <motion.div
              className="relative overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_45px_90px_rgba(3,6,15,0.65)] backdrop-blur-xl"
              initial={
                shouldAnimate ? { opacity: 0, y: 60, scale: 0.95 } : undefined
              }
              animate={
                shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined
              }
              transition={{ duration: 1.05, delay: 0.35, ease: HERO_EASE }}
              whileHover={
                shouldAnimate ? { y: -12, scale: 1.01, transition: { duration: 0.6, ease: HERO_EASE } } : undefined
              }
            >
              <div className="mb-4 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.45em] text-white/60">
                <span>DEZITECH CORE SYSTEMS</span>
                <span>VERIFIED</span>
              </div>

              <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/DEZITECH_MACHINERY_PLACEHOLDER.jpg"
                  fill
                  alt="Placeholder industrial system visualization"
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 540px, 100vw"
                />
                <div className="absolute inset-3 rounded-xl border border-white/10 bg-gradient-to-tr from-[#061228]/70 via-transparent to-transparent" />
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

          <ParallaxWrapper speed={0.18} range={120} className="pointer-events-none absolute -right-10 -top-12 hidden w-80 lg:block">
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 opacity-70"
              initial={
                shouldAnimate ? { opacity: 0, x: -60 } : undefined
              }
              animate={
                shouldAnimate ? { opacity: 0.7, x: 0 } : undefined
              }
              transition={{ duration: 1.1, delay: 0.48, ease: HERO_EASE }}
            >
              <Image
                src="/images/DEZITECH_TECH_GRID.svg"
                fill
                alt="Technical grid overlay"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/5 mix-blend-screen" />
            </motion.div>
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.14} axis="x" range={100} className="pointer-events-none absolute -left-12 bottom-0 hidden lg:block">
            <motion.div
              className="h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(80,201,206,0.4),_transparent_70%)] blur-2xl"
              initial={
                shouldAnimate ? { opacity: 0, scale: 0.8 } : undefined
              }
              animate={
                shouldAnimate ? { opacity: 0.7, scale: 1 } : undefined
              }
              transition={{ duration: 1.2, delay: 0.52, ease: HERO_EASE }}
            />
          </ParallaxWrapper>

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[42px] bg-[url(/images/DEZITECH_BG_SHAPE.png)] bg-cover bg-center opacity-20 blur-3xl"
            initial={
              shouldAnimate ? { opacity: 0, scale: 0.9 } : undefined
            }
            animate={
              shouldAnimate ? { opacity: 0.2, scale: 1 } : undefined
            }
            transition={{ duration: 1, delay: 0.55, ease: HERO_EASE }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
