"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { getSiteContentSync, loadSiteContent } from "@/lib/siteData";

import AnimatedLineGraph from "./AnimatedLineGraph";
import KpiCard from "./KpiCard";
import MotionReveal from "./MotionReveal";
import SectionWrapper from "./SectionWrapper";
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
    <SectionWrapper variant="dark" className="stats-section">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
        className="relative"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <MotionReveal as="div" className="space-y-4" direction="up" distance={18} stagger={0.08}>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Operating posture</p>
              <h3 className="text-3xl font-semibold text-white">Live delivery metrics</h3>
              <p className="text-base text-white/70">
                Dezitech telemetry keeps OEM programs synchronized with real deployments, so plans stay grounded in live data.
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
                          ease: [0.2, 0.9, 0.2, 1],
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

          <div className="space-y-6">
            <MotionReveal direction="up" distance={18} className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_35px_90px_rgba(3,6,15,0.55)]">
              <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
                <span>{graphMeta.title}</span>
                <span>{graphMeta.unit}</span>
              </div>
              <AnimatedLineGraph className="mt-6 h-32 w-full" data={graphMeta.data} />
              <p className="mt-5 text-xs text-white/65">{graphMeta.description}</p>
            </MotionReveal>

            <MotionReveal direction="up" distance={18} className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-sm text-white/75 shadow-[0_25px_75px_rgba(3,6,15,0.45)]">
              <p className="text-base font-semibold text-white">Operational certainty</p>
              <p className="mt-2">
                Counters sync with a RAF loop, keeping cadence crisp even on lower-powered devices.
              </p>
            </MotionReveal>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default AnimatedStats;
