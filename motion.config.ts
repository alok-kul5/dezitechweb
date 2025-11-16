const durations = {
  xs: 0.18,
  sm: 0.32,
  md: 0.6,
  lg: 0.9
} as const;

const easings = {
  productive: [0.4, 0, 0.2, 1],
  snap: [0.16, 1, 0.3, 1],
  linear: [0, 0, 1, 1]
} as const;

const delays = {
  none: 0,
  short: 0.08,
  base: 0.16,
  long: 0.28
} as const;

export const motionConfig = {
  durations,
  easings,
  delays,
  springs: {
    gentle: { type: "spring", stiffness: 120, damping: 24 },
    cozy: { type: "spring", stiffness: 160, damping: 30 }
  } as const,
  fadeIn: (delay: number = delays.base) => ({
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.sm,
        ease: easings.productive,
        delay
      }
    },
    exit: {
      opacity: 0,
      y: 16,
      transition: {
        duration: durations.xs,
        ease: easings.snap
      }
    }
  }),
  scaleReveal: (delay: number = delays.short) => ({
    initial: { opacity: 0, scale: 0.98 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.md,
        ease: easings.productive,
        delay
      }
    }
  }),
  staggerChildren: (interval: number = 0.08) => ({
    staggerChildren: interval,
    delayChildren: delays.short
  })
};

export type MotionConfig = typeof motionConfig;
