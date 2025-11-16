"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";

import SectionWrapper from "@/components/SectionWrapper";
import { motionConfig } from "@/motion.config";

import AmbientStage from "./AmbientStage";
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
  mediaSrc?: string;
};

const HERO_EASE = motionConfig.ease;
const HEADLINE_WORD_LIMIT = 14;
const SUBLINE_WORD_LIMIT = 14;
const WORD_STAGGER = motionConfig.hero.wordStagger;
const HEADLINE_DURATION = motionConfig.hero.headlineDur;

const condenseHeadline = (lines: string[]): string[] => {
  const cleanedWords = lines.join(" ").trim().split(/\s+/).filter(Boolean);
  if (!cleanedWords.length) {
    return [];
  }
  const trimmedWords = cleanedWords.slice(0, HEADLINE_WORD_LIMIT);
  const lineCount = trimmedWords.length > 8 ? 3 : 2;
  const perLine = Math.max(1, Math.ceil(trimmedWords.length / lineCount));

  const segments: string[] = [];
  for (let index = 0; index < trimmedWords.length; index += perLine) {
    segments.push(trimmedWords.slice(index, index + perLine).join(" "));
  }
  return segments;
};

const condenseDescription = (text: string): string => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= SUBLINE_WORD_LIMIT) {
    return text.trim();
  }
  return `${words.slice(0, SUBLINE_WORD_LIMIT).join(" ")}...`;
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

  const normalizedHeadline = useMemo(() => {
    const condensed = condenseHeadline(headline);
    return condensed.length > 0
      ? condensed
      : ["Engineering supply chains engineered for OEM success."];
  }, [headline]);
  const condensedDescription = useMemo(() => condenseDescription(description), [description]);
  const headlineWordMatrix = useMemo(() => {
    const groups = normalizedHeadline.map((line) => line.split(/\s+/).filter(Boolean));
    const offsets = groups.map((_, index) =>
      index === 0 ? 0 : groups.slice(0, index).reduce((sum, group) => sum + group.length, 0),
    );

    return groups.map((words, lineIndex) =>
      words.map((word, wordIndex) => ({
        key: `${lineIndex}-${wordIndex}-${word}`,
        word,
        delay: 0.25 + (offsets[lineIndex] + wordIndex) * WORD_STAGGER,
      })),
    );
  }, [normalizedHeadline]);

  const heroImageSrc = mediaSrc ?? "/images/DEZITECH_IMG_HERO.jpg";
  const descriptionDelay = 0.45;
  const primaryDelay = 0.55;
  const secondaryDelay = 0.65;

  const eyebrowClass =
    "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/70";
  const headlineLineClass =
    "font-heading text-[2.5rem] leading-[1.05] text-white md:text-[3.5rem] lg:text-[4.5rem]";
  const descriptionClass = "max-w-xl text-base text-white/80 md:text-lg";
  const primaryCtaClass =
    "hero-cta inline-flex items-center justify-center rounded-full bg-[#C8102E] px-8 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_25px_60px_rgba(200,16,46,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60";
  const secondaryCtaClass =
    "hero-cta inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60";

  const renderWord = (wordMeta: { key: string; word: string; delay: number }) => {
    if (!shouldAnimate) {
      return (
        <span key={wordMeta.key} className="inline-block align-top">
          {wordMeta.word}
          <span aria-hidden="true">&nbsp;</span>
        </span>
      );
    }

    return (
      <span key={wordMeta.key} className="inline-flex overflow-hidden align-top">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ delay: wordMeta.delay, duration: HEADLINE_DURATION, ease: HERO_EASE }}
            className="inline-block"
          >
          {wordMeta.word}
          <span aria-hidden="true">&nbsp;</span>
        </motion.span>
      </span>
    );
  };

  return (
    <SectionWrapper variant="dark" className="hero-section">
      <div className="relative overflow-hidden rounded-[48px] border border-white/10 bg-[#05080D] px-6 py-16 shadow-[0_60px_160px_rgba(2,3,9,0.8)] sm:px-8 lg:px-12">
        <motion.div
          className="absolute inset-0"
          initial={shouldAnimate ? { opacity: 0 } : undefined}
          animate={shouldAnimate ? { opacity: 0.9 } : undefined}
          transition={shouldAnimate ? { duration: 0.4, ease: HERO_EASE } : undefined}
        >
          <AmbientStage variant="hero" className="opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0b0f14,transparent_60%)]" />
        </motion.div>

        <ParallaxWrapper
          speed={0.05}
          className="pointer-events-none absolute -left-10 top-6 hidden w-64 opacity-30 lg:block"
        >
          <Image src="/ambient/ambient-lines.svg" alt="Line art" width={320} height={220} loading="lazy" />
        </ParallaxWrapper>

        <ParallaxWrapper
          speed={0.07}
          className="pointer-events-none absolute -right-16 bottom-10 hidden w-72 opacity-25 lg:block"
        >
          <Image src="/ambient/ambient-grid.svg" alt="Grid art" width={340} height={240} loading="lazy" />
        </ParallaxWrapper>

        <div className="relative grid gap-12 text-balance lg:grid-cols-[3fr_2fr] lg:items-center">
          <div className="space-y-8">
            {eyebrow ? (
              <motion.p
                className={eyebrowClass}
                initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={shouldAnimate ? { duration: 0.4, delay: 0.2, ease: HERO_EASE } : undefined}
              >
                {eyebrow}
              </motion.p>
            ) : null}

            <div className="space-y-3">
              {headlineWordMatrix.map((words, lineIndex) => (
                <div key={`hero-line-${lineIndex}`} className={headlineLineClass}>
                  {words.map(renderWord)}
                </div>
              ))}
            </div>

            <motion.p
              className={descriptionClass}
              initial={shouldAnimate ? { opacity: 0, y: 18 } : undefined}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={shouldAnimate ? { duration: 0.55, delay: descriptionDelay, ease: HERO_EASE } : undefined}
            >
              {condensedDescription}
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.div
                initial={shouldAnimate ? { opacity: 0, scale: 0.92 } : undefined}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
                transition={shouldAnimate ? { duration: 0.45, delay: primaryDelay, ease: HERO_EASE } : undefined}
              >
                <Link href={primaryCta.href} className={primaryCtaClass}>
                  {primaryCta.label}
                </Link>
              </motion.div>

              {secondaryCta ? (
                <motion.div
                  initial={shouldAnimate ? { opacity: 0, y: 16 } : undefined}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  transition={shouldAnimate ? { duration: 0.45, delay: secondaryDelay, ease: HERO_EASE } : undefined}
                >
                  <Link href={secondaryCta.href} className={secondaryCtaClass}>
                    {secondaryCta.label}
                  </Link>
                </motion.div>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle,_rgba(200,16,46,0.4),_transparent_65%)] blur-3xl opacity-90" />
            <ParallaxWrapper
              speed={0.12}
              range={140}
              className="relative"
            >
              <motion.div
                className="interactive-media relative overflow-hidden rounded-[32px] border border-white/12 bg-gradient-to-br from-white/5 via-white/0 to-transparent p-6 shadow-[0_50px_120px_rgba(3,6,15,0.65)] backdrop-blur-xl"
                initial={shouldAnimate ? { opacity: 0, scale: 1.04 } : undefined}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
                transition={shouldAnimate ? { duration: 0.9, delay: 0.5, ease: HERO_EASE } : undefined}
              >
                <div className="mb-5 flex items-center justify-between text-[0.55rem] uppercase tracking-[0.35em] text-white/55">
                  <span>Dezitech Systems</span>
                  <span>Verified</span>
                </div>
                <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-white/15">
                  <Image
                    src={heroImageSrc}
                    alt="Dezitech engineering visual"
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 540px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#030712]/85 via-transparent to-transparent" />
                </div>
                <div className="mt-6 grid gap-4 text-xs text-white/70 sm:grid-cols-3">
                  {[
                    { label: "Integrity", value: "99.982%" },
                    { label: "Latency", value: "14 ms" },
                    { label: "Thermals", value: "Optimal" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/40">{metric.label}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </ParallaxWrapper>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AnimatedHero;
