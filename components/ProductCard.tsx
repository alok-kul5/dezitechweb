"use client";

import Image from "next/image";
import Link from "next/link";

import MotionReveal from "./MotionReveal";
import { useReducedMotion } from "./useReducedMotion";

export type ProductCardProps = {
  title: string;
  summary?: string;
  href: string;
  mediaSrc?: string;
  mediaAlt?: string;
  motionDelay?: number;
};

const FALLBACK_MEDIA = "/images/DEZITECH_IMG_03.jpg";

const ProductCard = ({ title, summary, href, mediaSrc, mediaAlt, motionDelay = 0 }: ProductCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionReveal
      as="article"
      direction="up"
      distance={20}
      duration={0.65}
      delay={motionDelay}
      className="group flex h-full flex-col"
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              transition: { duration: 0.4, ease: [0.21, 0.8, 0.32, 1] },
            }
      }
    >
      <div className="interactive-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-carbon-800/80 p-6 shadow-[0_25px_65px_rgba(3,6,15,0.45)]">
        <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-carbon-700/40">
          <Image
            src={mediaSrc ?? FALLBACK_MEDIA}
            alt={mediaAlt ?? `${title} visual`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-white/80">
            Capability
          </span>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          {summary ? (
            <p className="mt-3 text-sm text-white/70">{summary}</p>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            href={href}
            className="interactive-cta inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all group-hover:text-dezitech-400"
          >
            <span>View</span>
            <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              →
            </span>
          </Link>
          <div className="relative h-1 w-16 overflow-hidden rounded-full bg-white/10">
            <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-dezitech-500 transition-transform duration-[450ms] ease-[cubic-bezier(.21,.8,.32,1)] group-hover:scale-x-100" />
          </div>
        </div>
      </div>
    </MotionReveal>
  );
};

export default ProductCard;
