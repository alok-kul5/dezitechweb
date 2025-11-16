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
  labels?: string[];
  className?: string;
  graphClassName?: string;
};

const staticGraph = getSiteContentSync().lineGraph;
const GRAPH_EASE: [number, number, number, number] = [0.16, 0.84, 0.44, 1];
const SAMPLE_DATA = [320, 410, 520, 610, 580, 660]; // TODO: Replace with live telemetry feed.

const cx = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

const buildPointsFromData = (values: number[]): DataPoint[] => {
  if (!values.length) {
    return [
      { x: 0, y: 30 },
      { x: 50, y: 22 },
      { x: 100, y: 25 },
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
  points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

const AnimatedLineGraph = ({ data, labels, className, graphClassName }: AnimatedLineGraphProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const [points, setPoints] = useState<DataPoint[]>(() => buildPointsFromData(data ?? staticGraph.data ?? SAMPLE_DATA));
  const [resolvedLabels, setResolvedLabels] = useState<string[]>(
    () => labels ?? staticGraph.labels ?? ["Signal", "Runtime", "Quality", "Reliability", "Yield", "Availability"],
  );

  useEffect(() => {
    if (data) {
      setPoints(buildPointsFromData(data));
      setResolvedLabels(labels ?? staticGraph.labels ?? []);
      return;
    }

    let mounted = true;
    loadSiteContent().then((content) => {
      if (!mounted) return;
      setPoints(buildPointsFromData(content.lineGraph.data ?? SAMPLE_DATA));
      setResolvedLabels(labels ?? content.lineGraph.labels ?? []);
    });

    return () => {
      mounted = false;
    };
  }, [data, labels]);

  const path = useMemo(() => buildPath(points), [points]);
  const latestPoint = points[points.length - 1];
  const labelDisplay = resolvedLabels.length ? resolvedLabels.slice(0, points.length) : [];

  return (
    <div className={cx("space-y-4", className)}>
      <svg viewBox="0 0 100 40" role="img" aria-label="Performance trendline" className={cx("w-full", graphClassName)}>
        <defs>
          <linearGradient id="graph-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8102E" />
            <stop offset="60%" stopColor="#f04658" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="graph-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(200, 16, 46, 0.22)" />
            <stop offset="100%" stopColor="rgba(5, 7, 13, 0)" />
          </linearGradient>
        </defs>

        <path d={`${path} L 100 40 L 0 40 Z`} fill="url(#graph-fill)" opacity={0.15} />

        <motion.path
          d={path}
          fill="none"
          stroke="url(#graph-stroke)"
          strokeWidth={1.3}
          strokeLinecap="round"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0.4 } : undefined}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={shouldAnimate ? { duration: 1.6, ease: GRAPH_EASE, delay: 0.3 } : undefined}
        />

        {points.map((point, index) => (
          <motion.circle
            key={`${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r={1.4}
            fill="#FCE38A"
            initial={shouldAnimate ? { scale: 0, opacity: 0 } : undefined}
            animate={shouldAnimate ? { scale: 1, opacity: 1 } : undefined}
            transition={
              shouldAnimate
                ? {
                    duration: 0.4,
                    delay: 0.6 + index * 0.08,
                    ease: GRAPH_EASE,
                  }
                : undefined
            }
          />
        ))}

        {latestPoint ? (
          <motion.circle
            cx={latestPoint.x}
            cy={latestPoint.y}
            r={2.4}
            fill="#C8102E"
            initial={shouldAnimate ? { scale: 0, opacity: 0 } : undefined}
            animate={shouldAnimate ? { scale: 1, opacity: 1 } : undefined}
            transition={shouldAnimate ? { duration: 0.45, delay: 0.8 + points.length * 0.08, ease: GRAPH_EASE } : undefined}
          />
        ) : null}
      </svg>

      {labelDisplay.length ? (
        <div className="grid grid-cols-2 gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--tone-muted)] sm:grid-cols-3">
          {labelDisplay.map((label) => (
            <span key={label} className="text-[var(--tone-foreground)]">
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AnimatedLineGraph;
