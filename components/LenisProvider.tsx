// components/LenisProvider.tsx
"use client";

import React, { ReactNode, useEffect } from "react";
import { canUseLenis, initLenis, destroyLenis, resizeLenis } from "@/lib/lenis";
import useReducedMotion from "./useReducedMotion";

type LenisProviderProps = {
  children: ReactNode;
};

/**
 * LenisProvider mounts Lenis (smooth scroll) on the client.
 * It ensures Lenis only runs in browser, respects reduced-motion and cleans up.
 */
export default function LenisProvider({ children }: LenisProviderProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Only run on client and when user doesn't prefer reduced motion
    if (!canUseLenis() || prefersReduced) return;

    // Init Lenis (idempotent in lib/lenis.ts)
    initLenis({
      lerp: 0.045,
      wheelMultiplier: 1.5,
      gestureOrientation: "vertical",
      touchMultiplier: 1.4,
    });

    // Resize handler
    const handleResize = () => {
      try {
        resizeLenis();
      } catch {}
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      try {
        destroyLenis();
      } catch {}
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
