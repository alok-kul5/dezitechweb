// components/LenisProvider.tsx
"use client";

import React, { ReactNode, useEffect } from "react";
import { canUseLenis, initLenis, destroyLenis, resizeLenis } from "@/lib/lenis";

type LenisProviderProps = {
  children: ReactNode;
};

/**
 * LenisProvider mounts Lenis (smooth scroll) on the client.
 * It ensures Lenis only runs in browser, respects reduced-motion and cleans up.
 */
export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    if (!canUseLenis()) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = initLenis({
      // Tuned for snappy but smooth feel. Adjust if needed.
      lerp: 0.08,
      wheelMultiplier: 1.2,
      gestureOrientation: "vertical",
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    // Ensure Lenis resizes on window resize
    const onResize = () => resizeLenis();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}
