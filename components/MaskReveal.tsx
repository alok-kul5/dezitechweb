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
};

const MaskReveal = ({
  children,
  as = "span",
  className,
  delay = 0,
  duration = 0.6,
  stagger = 0.07,
}: MaskRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  const tokens = Children.toArray(children).flatMap((child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/);
    }
    return [child];
  });

  const MotionTag = motion[as] ?? motion.span;

  if (!shouldAnimate) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag className={className}>
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
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
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
