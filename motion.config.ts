const cinematicEase = [0.2, 0.9, 0.2, 1] as const;

export const cinematicMotion = {
  ease: cinematicEase,
  hero: {
    wordStagger: 0.045,
    headlineDuration: 0.56,
  },
  section: {
    distance: 24,
    duration: 0.72,
    amount: 0.18,
  },
  pop: {
    scaleFrom: 0.92,
  },
  overlay: {
    duration: 0.45,
  },
} as const;

export type CinematicMotion = typeof cinematicMotion;
