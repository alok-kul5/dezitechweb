import Link from "next/link";
import { ReactNode } from "react";

import Reveal from "./Reveal";

export type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const Hero = ({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) => {
  return (
    <section className="px-6 pb-20 pt-16">
      <div className="container grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal className="space-y-6">
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dezitech-500">{eyebrow}</p> : null}
          <h1 className="font-heading text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {description ? <p className="text-lg text-neutral-600">{description}</p> : null}
          <div className="flex flex-wrap gap-4">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="rounded-full bg-dezitech-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-dezitech-500/30 transition hover:bg-dezitech-700"
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-500"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </Reveal>

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white/80 p-8 shadow-[0_30px_60px_rgba(17,24,39,0.08)] backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-[0.4em] text-dezitech-500">DEZITECH_IMAGE_01</div>
            <div className="mt-6 flex h-72 items-center justify-center rounded-2xl border border-dashed border-dezitech-500/60 bg-dezitech-50 text-sm font-semibold tracking-[0.4em] text-dezitech-500">
              DEZITECH_IMAGE_01
            </div>
            <p className="mt-4 text-xs text-neutral-500">Placeholder for hero imagery and technical schematics.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
