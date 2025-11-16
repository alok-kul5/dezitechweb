// lib/lenis.ts
// FINAL CLEAN VERSION – works with LenisProvider.tsx and removes ALL merge conflicts

"use client";

import Lenis, { LenisOptions } from "@studio-freight/lenis";

let lenisInstance: InstanceType<typeof Lenis> | null = null;
let rafId: number | null = null;

type LenisPreset = "snappy" | "cinematic";

const lenisPresets: Record<LenisPreset, LenisOptions> = {
  snappy: { lerp: 0.045, wheelMultiplier: 1.5 },
  cinematic: { lerp: 0.08, wheelMultiplier: 1.2 },
};

/** Can run Lenis only in browser and if motion isn't reduced */
export function canUseLenis(): boolean {
  if (typeof window === "undefined") return false;
  const reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !reduce;
}

/** Initialize Lenis with presets (snappy default, cinematic optional) */
export function initLenis(preset: LenisPreset = "snappy", options?: LenisOptions) {
  if (!canUseLenis()) return null;
  if (lenisInstance) return lenisInstance;

  const cfg: LenisOptions = {
    gestureOrientation: "vertical",
    touchMultiplier: 1.4,
    ...lenisPresets[preset],
    ...(options || {}),
  };

  lenisInstance = new Lenis(cfg);

  const raf = (time: number) => {
    if (!lenisInstance) return;
    lenisInstance.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

/** Resize handler */
export function resizeLenis() {
  if (!lenisInstance) return;
  try {
    (lenisInstance as any).onResize?.();
  } catch {
    lenisInstance?.resize?.();
  }
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

export type { LenisPreset };
