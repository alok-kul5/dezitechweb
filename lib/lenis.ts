// lib/lenis.ts
// FINAL CLEAN VERSION – works with LenisProvider.tsx and removes ALL merge conflicts

"use client";

import Lenis from "@studio-freight/lenis";

let lenisInstance: ReturnType<typeof Lenis> | null = null;
let rafId: number | null = null;

/** Can run Lenis only in browser and if motion isn't reduced */
export function canUseLenis(): boolean {
  if (typeof window === "undefined") return false;
  const reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !reduce;
}

/** Initialize Lenis (snappy Meridian-style scroll) */
export function initLenis(options?: {
  lerp?: number;
  wheelMultiplier?: number;
  gestureOrientation?: "vertical" | "horizontal";
  smoothTouch?: boolean;
  touchMultiplier?: number;
}) {
  if (!canUseLenis()) return null;

  // Already exists, return it
  if (lenisInstance) return lenisInstance;

  const cfg = {
    lerp: 0.045, // snappy smoothness
    wheelMultiplier: 1.5, // speed up wheel scroll
    gestureOrientation: "vertical",
    smoothTouch: false,
    touchMultiplier: 1.4,
    ...(options || {}),
  };

  lenisInstance = new Lenis(cfg);

  /** Start RAF loop */
  function raf(time: number) {
    if (!lenisInstance) return;
    lenisInstance.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

/** Resize handler */
export function resizeLenis() {
  if (!lenisInstance) return;
  try {
    (lenisInstance as any).onResize?.();
  } catch {}
}

/** Destroy instance safely */
export function destroyLenis() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  try {
    lenisInstance?.destroy();
  } catch {}
  lenisInstance = null;
}

/** Get instance (careful, not SSR-safe) */
export function getLenisInstance() {
  return lenisInstance;
}
