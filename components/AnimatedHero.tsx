"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import AmbientStage from "./AmbientStage";
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
  mediaSrc?: string;
};

const HERO_EASE: [number, number, number, number] = [0.21, 0.8, 0.32, 1];
const HEADLINE_WORD_LIMIT = 12;

const normalizeHeadline = (lines: string[]): string[] => {
  const cleaned = lines.map((line) => line.trim()).filter(Boolean);
  if (!cleaned.length) {
    return [];
  }

  const flattened = cleaned.join(" ").trim();
  const words = flattened.split(/\s+/);
  if (words.length > HEADLINE_WORD_LIMIT) {
    const truncated = `${words.slice(0, HEADLINE_WORD_LIMIT).join(" ")} & more`;
    return chunkHeadline(truncated);
  }

  return cleaned.slice(0, 3);
};

const chunkHeadline = (text: string, maxLines = 3): string[] => {
  const words = text.split(/\s+/);
  const perLine = Math.max(1, Math.ceil(words.length / maxLines));
  const segments: string[][] = [];

  for (let index = 0; index < words.length; index += perLine) {
    if (segments.length === maxLines) break;
    segments.push(words.slice(index, index + perLine));
  }

  return segments.map((segment) => segment.join(" "));
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
  const resolvedHeadline = normalizeHeadline(headline);
  const heroImageSrc = mediaSrc ?? "/images/DEZITECH_IMG_HERO.jpg";
  const heroEyebrowClass =
    "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/60";
  const primaryCtaClass =
    "hero-cta inline-flex items-center justify-center rounded-full bg-[#C8102E] px-9 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_22px_55px_rgba(200,16,46,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";
  const secondaryCtaClass =
    "hero-cta inline-flex items-center justify-center rounded-full border border-white/30 px-9 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";

  return (
    <section className="relative isolate overflow-hidden bg-carbon-900 py-20 text-white sm:py-28 lg:py-32">
      <AmbientStage variant="hero" className="opacity-10" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 text-balance lg:grid-cols-[3fr_2fr] lg:items-center">
        <div className="space-y-10">
          {eyebrow ? (
            <MotionReveal
              as="p"
              direction="up"
              distance={18}
              splitText
              stagger={0.045}
              className={heroEyebrowClass}
              disableWhileInView={shouldAnimate}
            >
              {eyebrow}
            </MotionReveal>
          ) : null}

          <div className="space-y-3">
            {resolvedHeadline.map((line) => (
              <MotionReveal
                key={line}
                as="h1"
                direction="up"
                distance={28}
                className="font-heading text-[2.5rem] leading-[1.05] text-white md:text-[3.75rem] lg:text-[4.75rem]"
                disableWhileInView={shouldAnimate}
              >
                {line}
              </MotionReveal>
            ))}
          </div>

          <MotionReveal
            as="p"
            direction="up"
            distance={24}
            delay={0.2}
            className="max-w-xl text-base text-white/80 md:text-lg"
            disableWhileInView={shouldAnimate}
          >
            {description}
          </MotionReveal>

          <div className="flex flex-wrap gap-4">
            <Link href={primaryCta.href} className={primaryCtaClass}>
              {primaryCta.label}
            </Link>

            {secondaryCta ? (
              <Link href={secondaryCta.href} className={secondaryCtaClass}>
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl">
            <Image src="/ambient/ambient-glow.png" alt="" fill priority className="object-cover" />
          </div>

          <ParallaxWrapper
            speed={0.05}
            className="pointer-events-none absolute -right-6 top-6 hidden w-64 opacity-25 lg:block"
          >
            <Image src="/ambient/ambient-lines.svg" alt="Ambient line work" width={320} height={220} loading="lazy" />
          </ParallaxWrapper>

          <ParallaxWrapper
            speed={0.08}
            className="pointer-events-none absolute -left-8 bottom-4 hidden w-60 opacity-20 lg:block"
          >
            <Image src="/ambient/ambient-grid.svg" alt="Ambient grid" width={310} height={230} loading="lazy" />
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.12} range={180}>
            <motion.div className="interactive-media relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_45px_90px_rgba(3,6,15,0.65)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between text-[0.55rem] uppercase tracking-[0.35em] text-white/55">
                <span>Dezitech Core Systems</span>
                <span>Verified</span>
              </div>
              <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={heroImageSrc}
                  alt="Dezitech engineering visual"
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
                    <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/40">{metric.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </ParallaxWrapper>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;
