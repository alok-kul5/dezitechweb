"use client";

import Lenis from "@studio-freight/lenis";

export type LenisOptions = ConstructorParameters<typeof Lenis>[0];
export type LenisInstance = InstanceType<typeof Lenis>;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const defaultLenisOptions: LenisOptions = {
  duration: 1.1,
  orientation: "vertical",
  smoothWheel: true,
  smoothTouch: false,
  syncTouch: true,
  lerp: 0.08,
  gestureOrientation: "vertical",
};

const isBrowser = () => typeof window !== "undefined";

export const prefersReducedMotion = () =>
  isBrowser() && window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const canUseLenis = () => isBrowser() && !prefersReducedMotion();

export const createLenis = (options?: Partial<LenisOptions>) =>
  new Lenis({ ...defaultLenisOptions, ...options });

export const initLenis = (options?: Partial<LenisOptions>) => {
  const lenis = createLenis(options);
  let frameId = 0;

  const raf = (time: number) => {
    lenis.raf(time);
    frameId = requestAnimationFrame(raf);
  };

  frameId = requestAnimationFrame(raf);

  const destroy = () => {
    cancelAnimationFrame(frameId);
    lenis.destroy();
  };

  return { lenis, destroy };
};

export const resizeLenis = (lenis: LenisInstance) => {
  lenis.resize();
};
