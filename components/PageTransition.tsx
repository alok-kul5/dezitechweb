"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { useReducedMotion } from "./useReducedMotion";

type PageTransitionProps = {
  children: ReactNode;
};

const easing: [number, number, number, number] = [0.2, 0.9, 0.2, 1];

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div key={pathname ?? "/"} className="min-h-full">
        {children}
      </div>
    );
  }

    return (
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={pathname ?? "/"}
          initial={{ opacity: 0.8, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: easing }}
          className="min-h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
};

export default PageTransition;
