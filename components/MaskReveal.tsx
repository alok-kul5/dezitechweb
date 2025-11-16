"use client";

import { motion } from "framer-motion";
import { cinematicMotion } from "@/motion.config";
import { Children, ReactNode } from "react";

import { useReducedMotion } from "./useReducedMotion";

type MaskRevealProps = {
  children: ReactNode;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  distance?: number;
  direction?: "up" | "down";
  splitText?: boolean;
  pop?: boolean;
  variant?: "dark" | "light";
};

const MaskReveal = ({
  children,
  as = "span",
  className,
  delay = 0,
  duration = 0.6,
  stagger = 0.07,
  distance = cinematicMotion.section.distance,
  direction = "up",
  splitText = true,
  pop = false,
  variant,
}: MaskRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  const travel = direction === "up" ? distance : -distance;
  const tokens = splitText
    ? Children.toArray(children).flatMap((child) => {
        if (typeof child === "string") {
          return child.split(/(\s+)/);
        }
        return [child];
      })
    : Children.toArray(children);

  const MotionTag = motion[as] ?? motion.span;

  if (!shouldAnimate) {
    return (
      <MotionTag className={className} data-mask-variant={variant}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag className={className} data-mask-variant={variant}>
      {tokens.map((token, index) => {
        if (typeof token === "string" && !token.trim()) {
          return (
            <span key={`mask-token-${index}`} aria-hidden="true">
              {token}
            </span>
          );
        }

        return (
          <span
            key={`mask-token-${index}`}
            style={{
              display: "inline-flex",
              overflow: "hidden",
            }}
          >
            <motion.span
              initial={{
                y: splitText ? travel : 0,
                opacity: 0,
                scale: pop ? cinematicMotion.pop.scaleFrom : 1,
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: pop ? 1 : 1,
              }}
              transition={{
                duration,
                delay: delay + index * stagger,
                ease: cinematicMotion.ease,
              }}
              style={{
                display: "inline-flex",
                transform: "translateZ(0)",
              }}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
};

export default MaskReveal;
