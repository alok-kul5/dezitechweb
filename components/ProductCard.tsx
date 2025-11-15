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

const CARD_EASE: [number, number, number, number] = [0.2, 0.9, 0.2, 1];

const ProductCard = ({ title, summary, href, motionDelay = 0 }: ProductCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionReveal
      as="article"
      direction="up"
      distance={18}
      duration={0.55}
      delay={motionDelay}
      className="group flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-[box-shadow] duration-300 ease-[cubic-bezier(.2,.9,.2,1)]"
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -8,
              scale: 1.02,
              transition: { duration: 0.32, ease: CARD_EASE },
            }
      }
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {summary ? <p className="mt-3 text-sm text-gray-600">{summary}</p> : null}
      </div>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gray-900 transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] group-hover:gap-2 group-hover:text-dezitech-500"
      >
        <span>View details</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)] group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </MotionReveal>
  );
};

export default ProductCard;
