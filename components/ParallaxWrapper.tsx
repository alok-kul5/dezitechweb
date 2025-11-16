"use client";

import { ReactNode, useEffect, useRef } from "react";

import { useReducedMotion } from "./useReducedMotion";

type ParallaxWrapperProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  axis?: "x" | "y";
  range?: number;
  disabled?: boolean;
  depth?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function ParallaxWrapper({
  children,
  className,
  speed = 0.08,
  axis = "y",
  range = 80,
  disabled = false,
  depth = 0,
}: ParallaxWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || disabled) {
      const element = wrapperRef.current;
      if (element) {
        element.style.transform = "translate3d(0, 0, 0)";
      }
      return;
    }

    const element = wrapperRef.current;
    if (!element || typeof window === "undefined") return;

    let frameId: number | null = null;
    let lastScrollY = window.scrollY;
    let offset = 0;

    const maxOffset = clamp(range, 24, 240);
    const normalizedSpeed = clamp(speed, 0.01, 0.35);

    const applyTransform = () => {
      frameId = null;
      const translateX = axis === "x" ? offset : 0;
      const translateY = axis === "y" ? offset : 0;
      const translateZ = depth ? offset * depth : 0;

      element.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      lastScrollY = currentScroll;

      offset += delta * normalizedSpeed;
      offset = clamp(offset, -maxOffset, maxOffset);

      if (frameId === null) {
        frameId = window.requestAnimationFrame(applyTransform);
      }
    };

    const handleResize = () => {
      offset = clamp(offset, -maxOffset, maxOffset);
      if (frameId === null) {
        frameId = window.requestAnimationFrame(applyTransform);
      }
    };

    applyTransform();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      element.style.transform = "";
    };
  }, [axis, depth, disabled, prefersReducedMotion, range, speed]);

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
