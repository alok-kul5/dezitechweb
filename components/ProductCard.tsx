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
  const mediaHoverClass = prefersReducedMotion ? "" : "group-hover:scale-[1.04]";
  const badgeVisual = icon ?? mediaSrc ?? FALLBACK_MEDIA;

  return (
    <MotionReveal
      as="article"
      direction="up"
      distance={24}
      duration={0.65}
      delay={motionDelay}
      className="group flex h-full flex-col"
    >
      <div className="product-card relative flex h-full flex-col overflow-hidden rounded-[26px] border p-6 text-[var(--tone-foreground)] backdrop-blur-xl">
        <div className="product-card__badge" aria-hidden="true">
          <Image
            src={badgeVisual}
            alt=""
            fill
            sizes="64px"
            className="rounded-full object-cover opacity-90"
            loading="lazy"
          />
          {icon ? (
            <Image
              src={icon}
              alt=""
              width={28}
              height={28}
              loading="lazy"
              className="absolute inset-0 m-auto h-7 w-7 object-contain drop-shadow-[0_8px_18px_rgba(5,7,15,0.65)]"
            />
          ) : null}
        </div>

        <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.02]">
          <Image
            src={mediaSrc ?? FALLBACK_MEDIA}
            alt={mediaAlt ?? `${title} visual`}
            fill
            className={`object-cover transition-transform duration-700 ${mediaHoverClass}`}
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <h3 className="text-2xl font-semibold text-[var(--tone-foreground)]">{title}</h3>
          {summary ? <p className="text-sm text-[var(--tone-muted)]">{summary}</p> : null}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            href={href}
            className="interactive-cta inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--tone-foreground)]"
          >
            <span>View</span>
            <span
              aria-hidden="true"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--tone-border)]"
            >
              →
            </span>
          </Link>
          <div className="h-px w-16 bg-[var(--tone-border)]/60" aria-hidden="true" />
        </div>
      </div>
    </MotionReveal>
  );
};

export default ProductCard;
