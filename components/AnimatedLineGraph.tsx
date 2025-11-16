"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { getSiteContentSync, loadSiteContent } from "@/lib/siteData";

import { useReducedMotion } from "./useReducedMotion";

type DataPoint = {
  x: number;
  y: number;
};

type AnimatedLineGraphProps = {
  data?: number[];
  className?: string;
};

const staticGraph = getSiteContentSync().lineGraph;
const GRAPH_EASE: [number, number, number, number] = [0.16, 0.84, 0.44, 1];

const buildPointsFromData = (values: number[]): DataPoint[] => {
  if (!values.length) {
    return [
      { x: 0, y: 24 },
      { x: 50, y: 18 },
      { x: 100, y: 20 },
    ];
  }

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return values.map((value, index) => {
    const x = values.length === 1 ? 100 : (index / (values.length - 1)) * 100;
    const normalized = (value - min) / range;
    const y = 32 - normalized * 24;
    return { x, y };
  });
};

const buildPath = (points: DataPoint[]) =>
  points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

const AnimatedLineGraph = ({ data, className }: AnimatedLineGraphProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const [points, setPoints] = useState<DataPoint[]>(() => buildPointsFromData(data ?? staticGraph.data));

  useEffect(() => {
    if (data) {
      setPoints(buildPointsFromData(data));
      return;
    }

    let mounted = true;
    loadSiteContent().then((content) => {
      if (mounted) {
        setPoints(buildPointsFromData(content.lineGraph.data));
      }
    });

    return () => {
      mounted = false;
    };
  }, [data]);

  const path = useMemo(() => buildPath(points), [points]);

  return (
    <svg viewBox="0 0 100 40" role="img" aria-label="Performance trendline" className={className}>
      <defs>
        <linearGradient id="graph-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5DC4D9" />
          <stop offset="50%" stopColor="#7CE0C3" />
          <stop offset="100%" stopColor="#FCE38A" />
        </linearGradient>
        <linearGradient id="graph-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(92, 196, 217, 0.3)" />
          <stop offset="100%" stopColor="rgba(5, 7, 15, 0)" />
        </linearGradient>
      </defs>

      <path d={`${path} L 100 40 L 0 40 Z`} fill="url(#graph-fill)" opacity={0.15} />

      <motion.path
        d={path}
        fill="none"
        stroke="url(#graph-stroke)"
        strokeWidth={1.2}
        strokeLinecap="round"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0.4 } : undefined}
        animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={shouldAnimate ? { duration: 1.8, ease: GRAPH_EASE, delay: 0.4 } : undefined}
      />

      {points.map((point, index) => (
        <motion.circle
          key={`${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r={1.2}
          fill="#FCE38A"
          initial={shouldAnimate ? { scale: 0, opacity: 0 } : undefined}
          animate={shouldAnimate ? { scale: 1, opacity: 1 } : undefined}
          transition={
            shouldAnimate
              ? {
                  duration: 0.45,
                  delay: 0.6 + index * 0.08,
                  ease: GRAPH_EASE,
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
};

export default AnimatedLineGraph;
