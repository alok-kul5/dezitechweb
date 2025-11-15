"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import useReducedMotion from "@/components/useReducedMotion";

type ParallaxWrapperProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  axis?: "x" | "y";
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function ParallaxWrapper({
  children,
  className,
  speed = 0.2,
  axis = "y",
}: ParallaxWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const normalizedSpeed = useMemo(() => clamp(speed, 0.1, 0.4), [speed]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const element = wrapperRef.current;
    if (!element || typeof window === "undefined") return;

    let frameId: number | null = null;

    const update = () => {
      frameId = null;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const viewportWidth = window.innerWidth || 1;
      const relativePosition =
        axis === "y"
          ? (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight
          : (rect.left + rect.width * 0.5 - viewportWidth * 0.5) / viewportWidth;

      const movement = relativePosition * normalizedSpeed * 120;
      const x = axis === "x" ? movement : 0;
      const y = axis === "y" ? movement : 0;

      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const requestTick = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      element.style.transform = "";
    };
  }, [axis, normalizedSpeed, prefersReducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        willChange: "transform",
        transform: prefersReducedMotion ? "translate3d(0, 0, 0)" : undefined,
      }}
    >
      {children}
    </div>
  );
}

export default ParallaxWrapper;
