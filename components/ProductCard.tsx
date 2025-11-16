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
  icon?: string;
};

const FALLBACK_MEDIA = "/images/engineering-mechanical.jpg";

const ProductCard = ({ title, summary, href, mediaSrc, mediaAlt, motionDelay = 0, icon }: ProductCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const mediaHoverClass = prefersReducedMotion ? "" : "group-hover:scale-[1.03]";

  return (
    <MotionReveal
      as="article"
      direction="up"
      distance={24}
      duration={0.72}
      delay={motionDelay}
      className="group flex h-full flex-col"
      whileHover={prefersReducedMotion ? undefined : { y: -6, transition: { duration: 0.32, ease: [0.2, 0.9, 0.2, 1] } }}
    >
      <div className="relative flex h-full flex-col rounded-[18px] border border-white/10 bg-white/[0.03] p-6 text-white backdrop-blur-xl">
        <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.02]">
          <Image
            src={mediaSrc ?? FALLBACK_MEDIA}
            alt={mediaAlt ?? `${title} visual`}
            fill
            className={`object-cover transition-transform duration-500 ${mediaHoverClass}`}
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          {icon ? (
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.3em] text-white/80">
              <Image src={icon} alt={`${title} icon`} width={24} height={24} loading="lazy" className="h-6 w-6 object-contain" />
              <span>Capability</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">{title}</h3>
              {summary ? <p className="mt-2 text-sm text-white/75">{summary}</p> : null}
            </div>
            {icon ? (
              <div className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 lg:flex">
                <Image src={icon} alt={`${title} icon`} width={32} height={32} loading="lazy" className="h-8 w-8 object-contain" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            href={href}
            className="interactive-cta inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white"
          >
            <span>View</span>
            <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20">
              →
            </span>
          </Link>
          <div className="h-px w-16 bg-white/15" />
        </div>
      </div>
    </MotionReveal>
  );
};

export default ProductCard;
