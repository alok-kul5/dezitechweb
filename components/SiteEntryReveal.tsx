"use client";

import { motion } from "framer-motion";
import { cinematicMotion } from "@/motion.config";
import { useEffect, useState } from "react";

import { useReducedMotion } from "./useReducedMotion";

const COOKIE_NAME = "dezitech-entry-reveal";

const SiteEntryReveal = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (prefersReducedMotion) return;
    const hasSeen = document.cookie.includes(`${COOKIE_NAME}=true`);
    if (hasSeen) return;

    document.cookie = `${COOKIE_NAME}=true; path=/; max-age=86400; SameSite=Lax`;
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  if (!isVisible || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: cinematicMotion.overlay.duration, ease: cinematicMotion.ease }}
      onAnimationComplete={() => setIsVisible(false)}
    >
      <motion.div
        className="h-full w-full bg-white"
        initial={{ scale: 1.015 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: cinematicMotion.ease }}
      />
    </motion.div>
  );
};

export default SiteEntryReveal;
