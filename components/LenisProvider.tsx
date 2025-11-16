"use client";

import { ReactNode, useEffect } from "react";

import { canUseLenis, initLenis, resizeLenis } from "@/lib/lenis";

type LenisProviderProps = {
  children: ReactNode;
};

const LenisProvider = ({ children }: LenisProviderProps) => {
  useEffect(() => {
    if (!canUseLenis()) return;

    const { lenis, destroy } = initLenis({
      duration: 1.15,
      lerp: 0.09,
    });

    const handleResize = () => resizeLenis(lenis);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      destroy();
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;
