// lib/lenis.ts
// Lightweight Lenis wrapper that exports the functions expected by LenisProvider.tsx
// This module is safe to import from server code (it guards window usage).
import Lenis from "@studio-freight/lenis";

let lenisInstance: ReturnType<typeof Lenis> | null = null;
let rafId: number | null = null;

/** Returns true when Lenis can run in this environment (browser). */
export function canUseLenis(): boolean {
  return typeof window !== "undefined" && typeof window.requestAnimationFrame === "function";
}

/** Initialize Lenis if not already created. Returns the instance or null. */
export function initLenis(options?: {
  lerp?: number;
  wheelMultiplier?: number;
  gestureOrientation?: "vertical" | "horizontal";
  smoothTouch?: boolean;
  touchMultiplier?: number;
}) {
  if (!canUseLenis()) return null;

  if (lenisInstance) return lenisInstance;

  const cfg = {
    lerp: 0.08,
    wheelMultiplier: 1.2,
    gestureOrientation: "vertical",
    smoothTouch: false,
    touchMultiplier: 1.5,
    ...(options || {}),
  };

  lenisInstance = new Lenis(cfg);

  function raf(time: number) {
    if (!lenisInstance) return;
    lenisInstance.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

/** Call this on window resize if needed (Lenis usually handles it, but expose anyway). */
export function resizeLenis() {
  if (!lenisInstance) return;
  if (typeof (lenisInstance as any).onResize === "function") {
    try {
      (lenisInstance as any).onResize();
    } catch (e) {
      // ignore
    }
  }
}

/** Destroys Lenis instance and cancels RAF loop. */
export function destroyLenis() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    try {
      lenisInstance.destroy();
    } catch (e) {
      // ignore
    }
    lenisInstance = null;
  }
}

/** Expose the instance (dangerous to call from SSR) */
export function getLenisInstance() {
  return lenisInstance;
}
