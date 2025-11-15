"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      orientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true,
      lerp: 0.09,
      gestureOrientation: "vertical",
    });

    let frameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
