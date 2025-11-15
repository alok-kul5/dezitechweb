"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

import { useReducedMotion } from "./useReducedMotion";

type Direction = "up" | "down" | "left" | "right";

type MotionRevealProps = {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
} & HTMLMotionProps<"div">;

const easing: [number, number, number, number] = [0.2, 0.9, 0.2, 1];

const MotionReveal = ({
  children,
  className,
  direction = "up",
  distance = 18,
  delay = 0,
  duration = 0.7,
  stagger = 0,
  once = true,
  amount = 0.35,
  ...rest
}: MotionRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  const offsets: Record<Direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initial = shouldAnimate ? { opacity: 0, ...offsets[direction] } : false;
  const animate = { opacity: 1, x: 0, y: 0 };

  const transition = shouldAnimate
    ? {
        duration,
        delay,
        ease: easing,
        ...(stagger > 0 ? { staggerChildren: stagger, delayChildren: delay } : {}),
      }
    : { duration: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={shouldAnimate ? animate : undefined}
      viewport={shouldAnimate ? { once, amount } : undefined}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MotionReveal;
