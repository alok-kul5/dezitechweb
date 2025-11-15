"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

export const useReducedMotion = () => {
  const prefersReducedMotion = useFramerReducedMotion();
  return Boolean(prefersReducedMotion);
};

export default useReducedMotion;
