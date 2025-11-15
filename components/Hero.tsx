import Link from "next/link";
import { ReactNode } from "react";

import MotionReveal from "./MotionReveal";

export type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const Hero = ({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) => {
  return (
    <section className="bg-neutral-50 px-6 pb-20 pt-16">
      <div className="container grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          {eyebrow ? (
            <MotionReveal delay={0.05}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dezitech-500">{eyebrow}</p>
            </MotionReveal>
          ) : null}

          <MotionReveal delay={0.15}>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
          </MotionReveal>

          {description ? (
            <MotionReveal delay={0.27}>
              <p className="text-lg text-neutral-600">{description}</p>
            </MotionReveal>
          ) : null}

          {primaryCta || secondaryCta ? (
            <MotionReveal delay={0.38}>
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

        <MotionReveal delay={0.22} className="md:justify-self-end">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white/80 p-8 shadow-[0_30px_60px_rgba(17,24,39,0.08)] backdrop-blur transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)] hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_35px_70px_rgba(17,24,39,0.12)]">
            <div className="text-xs font-semibold uppercase tracking-[0.4em] text-dezitech-500">DEZITECH_IMAGE_01</div>
            <div className="mt-6 flex h-72 items-center justify-center rounded-2xl border border-dashed border-dezitech-500/60 bg-dezitech-50 text-sm font-semibold tracking-[0.4em] text-dezitech-500">
              DEZITECH_IMAGE_01
            </div>
            <p className="mt-4 text-xs text-neutral-500">Placeholder for hero imagery and technical schematics.</p>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default Hero;
