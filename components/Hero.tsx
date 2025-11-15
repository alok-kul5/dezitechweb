"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CSSProperties, ReactNode, useEffect, useRef } from "react";

import MotionReveal from "./MotionReveal";
import { useReducedMotion } from "./useReducedMotion";

export type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const HERO_EASE: [number, number, number, number] = [0.2, 0.9, 0.2, 1];

const Hero = ({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = imageRef.current;
    if (!node) return;

    let rafId: number | null = null;
    const maxTranslate = 20;

    const update = () => {
      rafId = null;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.min(Math.max((viewport - rect.top) / (viewport + rect.height), 0), 1);
      const offset = (progress - 0.5) * maxTranslate;
      node.style.setProperty("--hero-parallax-y", `${offset.toFixed(2)}px`);
    };

    const requestTick = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="bg-neutral-50 px-6 pb-20 pt-16">
      <div className="container grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          {eyebrow ? (
            <MotionReveal direction="up" delay={0.05} distance={18} duration={0.55}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dezitech-500">{eyebrow}</p>
            </MotionReveal>
          ) : null}

          <MotionReveal direction="up" delay={0.17} distance={28} duration={0.7}>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
          </MotionReveal>

          {description ? (
            <MotionReveal direction="up" delay={0.25} distance={24} duration={0.65}>
              <p className="text-lg text-neutral-600">{description}</p>
            </MotionReveal>
          ) : null}

          {primaryCta || secondaryCta ? (
            <MotionReveal direction="up" delay={0.33} stagger={0.07} distance={20} duration={0.65}>
              <div className="flex flex-wrap gap-4">
                {primaryCta ? (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center rounded-full bg-dezitech-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-dezitech-500/30 transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-dezitech-600 hover:shadow-[0_25px_50px_rgba(200,16,46,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dezitech-500"
                  >
                    {primaryCta.label}
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:border-neutral-500 hover:shadow-[0_18px_35px_rgba(15,23,42,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800"
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </MotionReveal>
          ) : null}
        </div>

        <div className="md:justify-self-end">
          <motion.div
            ref={imageRef}
            className="group relative overflow-hidden rounded-3xl border border-neutral-100 bg-white/85 p-8 shadow-[0_30px_60px_rgba(17,24,39,0.08)] backdrop-blur"
              style={
                prefersReducedMotion
                  ? undefined
                  : ({
                      transform: "translateY(var(--hero-parallax-y, 0px))",
                    } as CSSProperties)
              }
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32, scale: 0.985 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1.015 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.75, delay: 0.4, ease: HERO_EASE }}
            whileHover={prefersReducedMotion ? undefined : { y: -8, boxShadow: "0 35px 70px rgba(17,24,39,0.12)" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.4em] text-dezitech-500">DEZITECH_IMAGE_01</div>
            <div className="mt-6 flex h-72 items-center justify-center rounded-2xl border border-dashed border-dezitech-500/60 bg-dezitech-50 text-sm font-semibold tracking-[0.4em] text-dezitech-500">
              DEZITECH_IMAGE_01
            </div>
            <p className="mt-4 text-xs text-neutral-500">Placeholder for hero imagery and technical schematics.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
