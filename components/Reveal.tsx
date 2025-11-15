"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
};

const Reveal = ({ children, className = "", rootMargin = "0px" }: RevealProps) => {
  const supportsIntersectionObserver = useMemo(
    () => typeof window !== "undefined" && "IntersectionObserver" in window,
    []
  );
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
      { threshold: 0.2, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, supportsIntersectionObserver]);

  return (
    <div ref={ref} className={className} data-reveal-visible={isVisible}>
      {children}
    </div>
  );
};

export default Reveal;
