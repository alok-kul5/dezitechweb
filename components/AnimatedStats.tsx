"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { cinematicMotion } from "@/motion.config";
import { getSiteContentSync, loadSiteContent } from "@/lib/siteData";

import AnimatedLineGraph from "./AnimatedLineGraph";
import KpiCard from "./KpiCard";
import LayoutGrid from "./LayoutGrid";
import MaskReveal from "./MaskReveal";
import MotionReveal from "./MotionReveal";
import { useReducedMotion } from "./useReducedMotion";

type SiteCopy = ReturnType<typeof getSiteContentSync>;
type KpiStat = SiteCopy["kpis"][number];

const staticContent = getSiteContentSync();

const formatValue = (value: number, decimals = 0) => Number(value).toFixed(decimals);

const AnimatedStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
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
    if (!isInView) return;

      const resetFrame = requestAnimationFrame(() => {
      setValues(kpis.map(() => 0));
    });

    if (prefersReducedMotion) {
      const reducedId = requestAnimationFrame(() => {
        setValues(kpis.map((stat) => Number(stat.value)));
      });
      return () => {
        cancelAnimationFrame(resetFrame);
        cancelAnimationFrame(reducedId);
      };
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
        cancelAnimationFrame(resetFrame);
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
                <div className="space-y-4">
                  <MotionReveal as="p" splitText className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--tone-muted)]">
                    Operating posture
                  </MotionReveal>
                  <MaskReveal as="h3" className="text-3xl font-semibold text-[var(--tone-foreground)]" distance={22} duration={0.62}>
                    Live delivery metrics
                  </MaskReveal>
                  <MotionReveal as="p" splitText className="text-base text-[var(--tone-muted)]" distance={20} duration={0.6}>
                    Dezitech telemetry keeps a constant signal on availability, deployments, and response lines so global OEMs can plan
                    against real data.
                  </MotionReveal>
                </div>

                <div className="kpi-grid">
                  {stats.map((stat, index) => (
                    <MotionReveal
                      key={stat.label}
                      as="div"
                      direction="up"
                      distance={cinematicMotion.card.distance}
                      duration={cinematicMotion.card.entryDur}
                      delay={0.25 + index * 0.08}
                    >
                      <KpiCard
                        label={stat.label}
                        value={`${formatValue(stat.current)}${stat.suffix ? ` ${stat.suffix}` : ""}`}
                        description={stat.description}
                        icon={stat.icon}
                        media={stat.media}
                      />
                    </MotionReveal>
                  ))}
                </div>
              </div>
          }
          right={
            <div className="space-y-6">
                <MotionReveal
                  direction="up"
                  distance={20}
                  duration={cinematicMotion.card.entryDur}
                  delay={0.2}
                  className="card-surface card-surface--metric pt-16"
                >
                  <div className="card-badge" aria-hidden="true">
                    <Image src="/icons/DEZITECH_ICON_GEAR.svg" alt="" fill sizes="48px" className="object-contain opacity-90" />
                  </div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[var(--tone-muted)]">
                    <span>{graphMeta.title}</span>
                    <span>{graphMeta.unit}</span>
                  </div>
                  <AnimatedLineGraph className="mt-4" graphClassName="h-36 w-full" data={graphMeta.data} labels={graphMeta.labels} />
                  <MotionReveal as="p" splitText className="mt-4 text-xs text-[var(--tone-muted)]" distance={16} duration={0.55}>
                    {graphMeta.description}
                  </MotionReveal>
                </MotionReveal>

                <MotionReveal
                  direction="up"
                  distance={20}
                  duration={cinematicMotion.card.entryDur}
                  delay={0.35}
                  className="card-surface p-6 pt-16 text-sm text-[var(--tone-muted)]"
                >
                  <div className="card-badge" aria-hidden="true">
                    <Image src="/icons/DEZITECH_ICON_MAP.svg" alt="" fill sizes="48px" className="object-contain opacity-85" />
                  </div>
                  <p className="font-semibold text-[var(--tone-foreground)]">Operational certainty</p>
                  <MotionReveal as="p" splitText className="mt-2 text-[var(--tone-muted)]" distance={16} duration={0.55}>
                    Counters sync with a RAF loop, ensuring the motion cadence stays crisp even on lower-powered devices.
                  </MotionReveal>
                </MotionReveal>
            </div>
          }
        />
      </motion.div>
    </div>
  );
};

export default AnimatedStats;
