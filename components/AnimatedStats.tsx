"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { getSiteContentSync, loadSiteContent } from "@/lib/siteData";

import AnimatedLineGraph from "./AnimatedLineGraph";
import KpiCard from "./KpiCard";
import LayoutGrid from "./LayoutGrid";
import MotionReveal from "./MotionReveal";
import { useReducedMotion } from "./useReducedMotion";

type SiteCopy = ReturnType<typeof getSiteContentSync>;
type KpiStat = SiteCopy["kpis"][number];

const staticContent = getSiteContentSync();

const formatValue = (value: number, decimals = 0) => Number(value).toFixed(decimals);

const AnimatedStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const [kpis, setKpis] = useState<KpiStat[]>(staticContent.kpis);
  const [values, setValues] = useState<number[]>(() => staticContent.kpis.map(() => 0));
  const [graphMeta, setGraphMeta] = useState(staticContent.lineGraph);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px",
  });

  useEffect(() => {
    let mounted = true;
    loadSiteContent().then((content) => {
      if (mounted) {
        setKpis(content.kpis);
        setGraphMeta(content.lineGraph);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setValues(kpis.map(() => 0));
  }, [kpis.length]);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      const reducedId = requestAnimationFrame(() => {
        setValues(kpis.map((stat) => Number(stat.value)));
      });
      return () => cancelAnimationFrame(reducedId);
    }

    const rafIds: number[] = [];

    kpis.forEach((stat, index) => {
      const start = performance.now();
      const duration = 1600;

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const nextValue = Number(stat.value) * eased;

        setValues((prev) => {
          const next = [...prev];
          next[index] = nextValue;
          return next;
        });

        if (progress < 1) {
          rafIds[index] = requestAnimationFrame(tick);
        }
      };

      rafIds[index] = requestAnimationFrame(tick);
    });

    return () => {
      rafIds.forEach((id) => cancelAnimationFrame(id));
    };
  }, [isInView, prefersReducedMotion, kpis]);

  const stats = useMemo(
    () =>
      kpis.map((stat, index) => ({
        ...stat,
        current: prefersReducedMotion ? Number(stat.value) : values[index] ?? 0,
      })),
    [prefersReducedMotion, values, kpis],
  );

  return (
    <div className="w-full">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.21, 0.8, 0.32, 1] }}
      >
        <LayoutGrid
          gapClassName="gap-12"
          left={
            <div className="space-y-8">
                <MotionReveal as="div" className="space-y-4" direction="up" distance={18} stagger={0.08}>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--tone-muted)]">
                    Operating posture
                  </p>
                  <h3 className="text-3xl font-semibold text-[var(--tone-foreground)]">Live delivery metrics</h3>
                  <p className="text-base text-[var(--tone-muted)]">
                  Dezitech telemetry keeps a constant signal on availability, deployments, and response lines so global
                  OEMs can plan against real data.
                </p>
              </MotionReveal>

              <div className="kpi-grid">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={shouldAnimate ? { opacity: 0, y: 18 } : undefined}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                    transition={
                      shouldAnimate
                        ? {
                            duration: 0.45,
                            delay: 0.35 + index * 0.08,
                            ease: [0.21, 0.8, 0.32, 1],
                          }
                        : undefined
                    }
                  >
                    <KpiCard
                      label={stat.label}
                      value={`${formatValue(stat.current)}${stat.suffix ? ` ${stat.suffix}` : ""}`}
                      description={stat.description}
                      icon={stat.icon}
                      media={stat.media}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          }
          right={
            <div className="space-y-6">
                <MotionReveal direction="up" distance={18} className="card-surface p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[var(--tone-muted)]">
                  <span>{graphMeta.title}</span>
                  <span>{graphMeta.unit}</span>
                </div>
                <AnimatedLineGraph className="mt-4 h-36 w-full" data={graphMeta.data} />
                  <p className="mt-4 text-xs text-[var(--tone-muted)]">{graphMeta.description}</p>
              </MotionReveal>

                <MotionReveal direction="up" distance={18} className="card-surface p-6 text-sm text-[var(--tone-muted)]">
                  <p className="font-semibold text-[var(--tone-foreground)]">Operational certainty</p>
                  <p className="mt-2 text-[var(--tone-muted)]">
                  Counters sync with a RAF loop, ensuring the motion cadence stays crisp even on lower-powered devices.
                </p>
              </MotionReveal>
            </div>
          }
        />
      </motion.div>
    </div>
  );
};

export default AnimatedStats;
