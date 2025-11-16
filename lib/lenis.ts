"use client";

import Lenis from "@studio-freight/lenis";

export type LenisOptions = ConstructorParameters<typeof Lenis>[0];
export type LenisInstance = InstanceType<typeof Lenis>;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const defaultLenisOptions: LenisOptions = {
  lerp: 0.045,
  wheelMultiplier: 1.5,
  gestureOrientation: "vertical",
  smoothWheel: true,
  syncTouch: true,
};

let lenisInstance: LenisInstance | null = null;
let rafId: number | null = null;

const isBrowser = () => typeof window !== "undefined";

export const prefersReducedMotion = () =>
  isBrowser() && window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const canUseLenis = () => isBrowser() && !prefersReducedMotion();

export const getLenis = () => lenisInstance;

const startRafLoop = () => {
  if (!lenisInstance || rafId !== null) return;

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);
};

const stopRafLoop = () => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
};

export const initLenis = (options?: Partial<LenisOptions>) => {
  if (!canUseLenis()) {
    return { lenis: null, destroy: () => undefined };
  }

  if (!lenisInstance) {
    lenisInstance = new Lenis({
      ...defaultLenisOptions,
      ...options,
    });
  }

  startRafLoop();

  const destroy = () => {
    stopRafLoop();
    lenisInstance?.destroy();
    lenisInstance = null;
  };

  return { lenis: lenisInstance, destroy };
};

export const resizeLenis = () => {
  lenisInstance?.resize();
};

