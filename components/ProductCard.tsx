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
  tone?: "dark" | "light";
};

const FALLBACK_MEDIA = "/images/DEZITECH_IMG_03.jpg";

const toneTokens = {
  dark: {
    card: "bg-white/5 border-white/10 text-white shadow-[0_30px_90px_rgba(3,6,15,0.55)]",
    summary: "text-white/75",
    accent: "text-white/50",
    thumbnailBorder: "border-white/15",
    chevronBg: "bg-[#C8102E]/15 text-[#C8102E]",
    cta: "border border-[#C8102E]/70 text-[#C8102E] hover:bg-[#C8102E]/10",
  },
  light: {
    card: "bg-white border-black/5 text-[#0F1724] shadow-[0_28px_75px_rgba(15,23,36,0.12)]",
    summary: "text-[#4B5563]",
    accent: "text-[#94A3B8]",
    thumbnailBorder: "border-black/10",
    chevronBg: "bg-white/20 text-white",
    cta: "bg-[#C8102E] text-white border border-[#C8102E] hover:bg-[#C8102E]/90",
  },
} as const;

const ProductCard = ({
  title,
  summary,
  href,
  mediaSrc,
  mediaAlt,
  motionDelay = 0,
  icon,
  tone = "dark",
}: ProductCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const styles = toneTokens[tone];

  return (
    <MotionReveal
      as="article"
      direction="up"
      distance={22}
      duration={0.72}
      delay={motionDelay}
      className="group flex h-full flex-col"
      variant={tone}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -10,
              scale: 1.015,
              transition: { duration: 0.35, ease: [0.2, 0.9, 0.2, 1] },
            }
      }
    >
      <div className={`relative flex h-full flex-col justify-between rounded-[18px] border p-6 transition-colors ${styles.card}`}>
        <div className="flex items-start gap-4">
          <div className={`relative h-16 w-16 overflow-hidden rounded-2xl border ${styles.thumbnailBorder}`}>
            <Image
              src={mediaSrc ?? FALLBACK_MEDIA}
              alt={mediaAlt ?? `${title} visual`}
              fill
              className="object-cover"
              sizes="64px"
              loading="lazy"
            />
            {icon ? (
              <span className="absolute -bottom-1.5 -right-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0F1724] shadow-lg">
                <Image src={icon} alt={`${title} icon`} width={20} height={20} loading="lazy" className="h-4 w-4 object-contain" />
              </span>
            ) : null}
          </div>
          <div>
            <p className={`text-[0.62rem] uppercase tracking-[0.32em] ${styles.accent}`}>Capability</p>
            <h3 className="mt-1 text-xl font-semibold leading-tight">{title}</h3>
          </div>
        </div>

        {summary ? <p className={`mt-5 text-sm leading-relaxed ${styles.summary}`}>{summary}</p> : null}

        <div className="mt-8 flex items-center justify-between">
          <Link
            href={href}
            className={`interactive-cta inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.3em] transition-colors ${styles.cta}`}
          >
            <span>View</span>
            <span
              aria-hidden="true"
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors ${styles.chevronBg}`}
            >
              →
            </span>
          </Link>
          <div className="relative h-px w-16 overflow-hidden bg-[#C8102E]/30">
            <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#C8102E] transition-transform duration-[450ms] ease-[cubic-bezier(.2,.9,.2,1)] group-hover:scale-x-100" />
          </div>
        </div>
      </div>
    </MotionReveal>
  );
};

export default ProductCard;
