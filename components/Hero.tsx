"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

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

const CTA_GROUP = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.07,
    },
  },
};

const CTA_ITEM = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: HERO_EASE },
  },
};

const Hero = ({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) => {
  const prefersReducedMotion = useReducedMotion();

  const stage = (delay: number, extra?: Record<string, unknown>) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: HERO_EASE, delay, ...extra },
        };

  const mediaStage = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 60, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1.015 },
        transition: { duration: 1.1, delay: 0.4, ease: HERO_EASE },
      };

  const accentStage = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -60 },
        animate: { opacity: 0.7, x: 0 },
        transition: { duration: 1.1, delay: 0.48, ease: HERO_EASE },
      };

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
        <div className="space-y-7 text-balance">
          {eyebrow ? (
            <motion.p
              {...stage(0.08)}
              className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-200/70"
            >
              {eyebrow}
            </motion.p>
          ) : null}

          <motion.h1
            {...stage(0.16)}
            className="font-heading text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[3.65rem]"
          >
            {title}
          </motion.h1>

          {description ? (
            <motion.p
              {...stage(0.24)}
              className="max-w-2xl text-lg text-neutral-300 md:text-xl"
            >
              {description}
            </motion.p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <motion.div
              className="flex flex-wrap gap-4"
              {...(prefersReducedMotion
                ? {}
                : { initial: "hidden", animate: "visible", variants: CTA_GROUP })}
            >
              {primaryCta ? (
                <motion.div variants={prefersReducedMotion ? undefined : CTA_ITEM}>
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center rounded-full bg-dezitech-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_20px_40px_rgba(200,16,46,0.25)] transition-transform duration-[400ms] ease-[cubic-bezier(.21,.8,.32,1)] hover:-translate-y-1 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dezitech-300"
                  >
                    {primaryCta.label}
                  </Link>
                </motion.div>
              ) : null}
              {secondaryCta ? (
                <motion.div variants={prefersReducedMotion ? undefined : CTA_ITEM}>
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition-all duration-[400ms] ease-[cubic-bezier(.21,.8,.32,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                  >
                    {secondaryCta.label}
                  </Link>
                </motion.div>
              ) : null}
            </motion.div>
          ) : null}

          <motion.div
            {...stage(0.4, { duration: 1 })}
            className="flex flex-wrap gap-6 text-sm text-white/70"
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
          </motion.div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-16 top-14 hidden h-56 w-56 rounded-full bg-teal-500/20 blur-3xl lg:block" />

          <ParallaxWrapper speed={0.26}>
            <motion.div
              className="relative overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_45px_90px_rgba(3,6,15,0.65)] backdrop-blur-xl"
              {...mediaStage}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -12, transition: { duration: 0.6, ease: HERO_EASE } }
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

          <ParallaxWrapper
            speed={0.18}
            className="pointer-events-none absolute -right-10 -top-12 hidden w-80 lg:block"
          >
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 opacity-70"
              {...accentStage}
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

          <ParallaxWrapper speed={0.14} axis="x" className="pointer-events-none absolute -left-12 bottom-0 hidden lg:block">
            <motion.div
              className="h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(80,201,206,0.4),_transparent_70%)] blur-2xl"
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 0.7, scale: 1 },
                    transition: { duration: 1.2, delay: 0.52, ease: HERO_EASE },
                  })}
            />
          </ParallaxWrapper>

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[42px] bg-[url(/images/DEZITECH_BG_SHAPE.png)] bg-cover bg-center opacity-20 blur-3xl"
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 0.2, scale: 1 },
                  transition: { duration: 1, delay: 0.55, ease: HERO_EASE },
                })}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
