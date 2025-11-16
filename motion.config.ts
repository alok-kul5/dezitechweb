const cinematicEase = [0.2, 0.9, 0.2, 1] as const;

export const cinematicMotion = {
  ease: cinematicEase,
  hero: {
    wordStagger: 0.045,
    headlineDur: 0.56,
  },
  section: {
    distance: 24,
    dur: 0.72,
    stagger: 0.08,
    amount: 0.18,
  },
  card: {
    entryDur: 0.65,
    distance: 24,
  },
  pop: {
    scaleFrom: 0.92,
    scaleTo: 1.05,
    dur: 0.42,
  },
  overlay: {
    duration: 0.45,
  },
} as const;

export type CinematicMotion = typeof cinematicMotion;
