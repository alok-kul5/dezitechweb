"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

import { motionConfig } from "@/motion.config";

import { useReducedMotion } from "./useReducedMotion";

type SiteEntryRevealProps = {
  children: ReactNode;
};

const STORAGE_KEY = "dezitech-entry-played";

const SiteEntryReveal = ({ children }: SiteEntryRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") {
      return;
    }

    const hasPlayed = window.sessionStorage.getItem(STORAGE_KEY);
    if (!hasPlayed) {
      const frame = requestAnimationFrame(() => {
        setShouldAnimate(true);
        setShowOverlay(true);
      });
      window.sessionStorage.setItem(STORAGE_KEY, "true");
      return () => cancelAnimationFrame(frame);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => {
        setShouldAnimate(false);
        setShowOverlay(false);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !shouldAnimate) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.85, scale: 1.015 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: motionConfig.ease }}
      className="site-entry"
    >
      {children}
      {showOverlay ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70] bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: motionConfig.ease }}
          onAnimationComplete={() => setShowOverlay(false)}
        />
      ) : null}
    </motion.div>
  );
};

export default SiteEntryReveal;
