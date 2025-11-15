"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
};

const Reveal = ({ children, className = "", rootMargin = "0px", threshold = 0.2 }: RevealProps) => {
  const supportsIntersectionObserver =
    typeof window !== "undefined" && "IntersectionObserver" in window;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(() => !supportsIntersectionObserver);

  useEffect(() => {
    if (!supportsIntersectionObserver) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, supportsIntersectionObserver, threshold]);

  const visibilityClass = isVisible ? "is-visible" : "";
  const classes = ["reveal", visibilityClass, className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};

export default Reveal;
