"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";

import ParallaxWrapper from "./ParallaxWrapper";
import SectionWrapper from "./SectionWrapper";
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
  mediaSrc?: string;
};

const HERO_EASE: [number, number, number, number] = [0.2, 0.9, 0.2, 1];
const HEADLINE_WORD_LIMIT = 14;
const HERO_WORD_STAGGER = 0.045;
const HERO_HEADLINE_DURATION = 0.56;
const HERO_TIMINGS = {
  headlineStart: 0.08,
  subline: 0.45,
  primaryCta: 0.55,
  secondaryCta: 0.65,
  mediaDelay: 0.5,
} as const;

const condenseHeadline = (lines: string[]): string[] => {
  const flattened = lines.join(" ").replace(/\s+/g, " ").trim();
  if (!flattened) return [];

  const words = flattened.split(" ");
  if (words.length <= HEADLINE_WORD_LIMIT) {
    return lines.map((line) => line.trim()).filter(Boolean);
  }

  const desiredLines = words.length > 20 ? 3 : 2;
  const perLine = Math.ceil(words.length / desiredLines);
  const condensed: string[] = [];

  for (let index = 0; index < words.length && condensed.length < desiredLines; index += perLine) {
    condensed.push(words.slice(index, index + perLine).join(" "));
  }

  return condensed;
};

const buildWordMatrix = (normalizedLines: string[]) => {
  const groups = normalizedLines.map((line) => line.split(/\s+/).filter(Boolean));
  const offsets = groups.map((_, idx) => groups.slice(0, idx).reduce((sum, group) => sum + group.length, 0));

  return groups.map((words, lineIndex) =>
    words.map((word, wordIndex) => ({
      key: `${lineIndex}-${wordIndex}-${word}`,
      word,
      delay: HERO_TIMINGS.headlineStart + (offsets[lineIndex] + wordIndex) * HERO_WORD_STAGGER,
    })),
  );
};

const AnimatedHero = ({
  eyebrow,
  headline,
  description,
  primaryCta,
  secondaryCta,
  mediaSrc,
}: AnimatedHeroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const normalizedHeadline = useMemo(() => condenseHeadline(headline), [headline]);
  const wordMatrix = useMemo(() => buildWordMatrix(normalizedHeadline), [normalizedHeadline]);
  const heroImageSrc = mediaSrc ?? "/images/DEZITECH_IMG_HERO.jpg";

  const primaryCtaClass =
    "hero-cta inline-flex items-center justify-center rounded-full bg-[#C8102E] px-8 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_18px_45px_rgba(200,16,46,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";
  const secondaryCtaClass =
    "hero-cta inline-flex items-center justify-center rounded-full border border-white/35 px-8 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";

  const renderWord = (word: { key: string; word: string; delay: number }) => {
    if (!shouldAnimate) {
      return (
        <span key={word.key} className="inline-flex align-top">
          {word.word}
          <span aria-hidden="true">&nbsp;</span>
        </span>
      );
    }

    return (
      <span key={word.key} className="inline-flex overflow-hidden align-top">
        <motion.span
          className="inline-flex"
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: word.delay, duration: HERO_HEADLINE_DURATION, ease: HERO_EASE }}
        >
          {word.word}
          <span aria-hidden="true">&nbsp;</span>
        </motion.span>
      </span>
    );
  };

  return (
    <SectionWrapper
      variant="dark"
      className="pt-28 pb-24 lg:pt-32 lg:pb-32"
      containerClassName="gap-16 lg:flex-row lg:items-center"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={shouldAnimate ? { opacity: 0 } : undefined}
        animate={shouldAnimate ? { opacity: 1 } : undefined}
        transition={shouldAnimate ? { duration: 0.4, ease: HERO_EASE } : undefined}
      >
        <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(200,16,46,0.35),_transparent_70%)] blur-[140px]" />
        <div className="absolute right-[-80px] bottom-[-60px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_70%)] blur-[160px]" />
      </motion.div>

      <div className="relative z-10 flex-1 space-y-8 lg:max-w-2xl">
        {eyebrow ? (
          <motion.p
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/65"
            initial={shouldAnimate ? { opacity: 0, y: 12 } : undefined}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.5, delay: 0.18, ease: HERO_EASE } : undefined}
          >
            <span className="h-px w-10 bg-white/30" aria-hidden="true" />
            {eyebrow}
          </motion.p>
        ) : null}

        <div className="space-y-3 font-heading text-balance text-[2.75rem] leading-[1.04] text-white md:text-[3.75rem] lg:text-[4.5rem]">
          {wordMatrix.map((words, index) => (
            <div key={`hero-line-${index}`}>{words.map((word) => renderWord(word))}</div>
          ))}
        </div>

        <motion.p
          className="max-w-2xl text-lg text-white/80"
          initial={shouldAnimate ? { opacity: 0, y: 16 } : undefined}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={shouldAnimate ? { duration: 0.5, delay: HERO_TIMINGS.subline, ease: HERO_EASE } : undefined}
        >
          {description}
        </motion.p>

        <div className="flex flex-wrap gap-4">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, scale: 0.92 } : undefined}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
            transition={shouldAnimate ? { delay: HERO_TIMINGS.primaryCta, duration: 0.45, ease: HERO_EASE } : undefined}
          >
            <Link href={primaryCta.href} className={primaryCtaClass}>
              {primaryCta.label}
            </Link>
          </motion.div>

          {secondaryCta ? (
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 14 } : undefined}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={
                shouldAnimate ? { delay: HERO_TIMINGS.secondaryCta, duration: 0.45, ease: HERO_EASE } : undefined
              }
            >
              <Link href={secondaryCta.href} className={secondaryCtaClass}>
                {secondaryCta.label}
              </Link>
            </motion.div>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 flex-1 w-full max-w-xl lg:max-w-none">
        <div className="pointer-events-none absolute -inset-20 -z-10">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(200,16,46,0.28),_transparent_65%)] blur-[180px]" />
        </div>
        <ParallaxWrapper speed={0.12} className="relative">
          <motion.figure
            className="interactive-media relative mx-auto max-w-[520px] overflow-hidden rounded-[32px] border border-white/12 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_45px_90px_rgba(3,6,15,0.65)] backdrop-blur-xl"
            initial={shouldAnimate ? { opacity: 0, scale: 1.04 } : undefined}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
            transition={
              shouldAnimate ? { delay: HERO_TIMINGS.mediaDelay, duration: 0.8, ease: HERO_EASE } : undefined
            }
          >
            <div className="mb-5 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.32em] text-white/65">
              <span>Dezitech Core Systems</span>
              <span>Live Signal</span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-black/40">
              <Image
                src={heroImageSrc}
                alt="Dezitech engineering visual"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 540px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#05070d]/70 via-transparent to-transparent" />
            </div>
            <div className="mt-5 grid gap-4 text-xs text-white/70 sm:grid-cols-3">
              {[
                { label: "Integrity", value: "99.982%" },
                { label: "Latency", value: "14 ms" },
                { label: "Thermals", value: "Optimal" },
              ].map((metric) => (
                <div key={metric.label}>
                  <p className="text-[0.55rem] uppercase tracking-[0.32em] text-white/50">{metric.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </motion.figure>
        </ParallaxWrapper>
      </div>
    </SectionWrapper>
  );
};

export default AnimatedHero;
