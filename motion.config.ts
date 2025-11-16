const sharedEase = [0.2, 0.9, 0.2, 1] as const;

export const motionConfig = {
  ease: sharedEase,
  hero: {
    wordStagger: 0.045,
    headlineDur: 0.56,
  },
  section: {
    distance: 24,
    dur: 0.72,
    stagger: 0.08,
  },
  pop: {
    scaleIn: [0.92, 1] as const,
  },
  fade: (delay = 0, distance = 16) => ({
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: sharedEase },
    },
  }),
} as const;

export type MotionConfig = typeof motionConfig;
