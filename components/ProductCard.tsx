"use client";

import Link from "next/link";

import MotionReveal from "./MotionReveal";
import { useReducedMotion } from "./useReducedMotion";

export type ProductCardProps = {
  title: string;
  summary?: string;
  href: string;
  motionDelay?: number;
};

const CARD_EASE: [number, number, number, number] = [0.21, 0.8, 0.32, 1];

const ProductCard = ({
  title,
  summary,
  href,
  motionDelay = 0,
}: ProductCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionReveal
      as="article"
      direction="up"
      distance={20}
      duration={0.65}
      delay={motionDelay}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/40 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-[480ms] ease-[cubic-bezier(.21,.8,.32,1)] will-change-transform"
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -10,
              scale: 1.03,
              boxShadow: "0 30px 70px rgba(15,23,42,0.18)",
              transition: { duration: 0.5, ease: CARD_EASE },
            }
      }
    >
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-neutral-400">
            Capability
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-neutral-900">
            {title}
          </h3>
          {summary ? (
            <MotionReveal
              as="p"
              direction="up"
              distance={14}
              duration={0.5}
              splitText
              className="mt-3 text-sm text-neutral-600"
            >
              {summary}
            </MotionReveal>
          ) : null}
        </div>
      <div className="mt-8 flex items-center justify-between">
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 transition-all duration-[400ms] ease-[cubic-bezier(.21,.8,.32,1)] group-hover:gap-2 group-hover:text-dezitech-500"
        >
          <span>View details</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-[400ms] ease-[cubic-bezier(.21,.8,.32,1)] group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
        <div className="relative h-1 w-16 overflow-hidden rounded-full bg-neutral-200">
          <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-dezitech-500 transition-transform duration-[600ms] ease-[cubic-bezier(.21,.8,.32,1)] group-hover:scale-x-100" />
        </div>
      </div>
    </MotionReveal>
  );
};

export default ProductCard;
