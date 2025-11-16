// components/LenisProvider.tsx
"use client";

import React, { ReactNode, useEffect } from "react";
import { canUseLenis, initLenis, destroyLenis, resizeLenis, LenisPreset } from "@/lib/lenis";
import useReducedMotion from "./useReducedMotion";

type LenisProviderProps = {
  children: ReactNode;
  mode?: LenisPreset;
};

/**
 * LenisProvider mounts Lenis (smooth scroll) on the client.
 * It ensures Lenis only runs in browser, respects reduced-motion and cleans up.
 */
export default function LenisProvider({ children, mode = "snappy" }: LenisProviderProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Only run on client and when user doesn't prefer reduced motion
    if (!canUseLenis() || prefersReduced) return;

    // Init Lenis (idempotent in lib/lenis.ts)
    const lenis = initLenis(mode);

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
  }, [mode, prefersReduced]);

  return <>{children}</>;
}
