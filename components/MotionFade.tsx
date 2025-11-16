"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "./useReducedMotion";

type MotionFadeProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const MotionFade = ({ children, delay = 0, className = "" }: MotionFadeProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default MotionFade;
