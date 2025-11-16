"use client";

import { ReactNode, useEffect, useRef } from "react";

import { canUseLenis, initLenis, resizeLenis } from "@/lib/lenis";
import { useReducedMotion } from "./useReducedMotion";

type LenisProviderProps = {
  children: ReactNode;
};

const LenisProvider = ({ children }: LenisProviderProps) => {
  const prefersReducedMotion = useReducedMotion();
  const teardownRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (prefersReducedMotion || !canUseLenis()) {
      teardownRef.current?.();
      teardownRef.current = null;
      return;
    }

    const { destroy } = initLenis();
    const handleResize = () => resizeLenis();

    window.addEventListener("resize", handleResize);
    teardownRef.current = () => {
      window.removeEventListener("resize", handleResize);
      destroy();
    };

    return () => {
      teardownRef.current?.();
      teardownRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
};

export default LenisProvider;
