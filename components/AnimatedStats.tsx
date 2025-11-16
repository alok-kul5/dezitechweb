"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { getSiteContentSync, loadSiteContent } from "@/lib/siteData";

import AnimatedLineGraph from "./AnimatedLineGraph";
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
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px",
  });

  useEffect(() => {
    let mounted = true;
    loadSiteContent().then((content) => {
      if (mounted) {
        setKpis(content.kpis);
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
    <section className="px-6 py-16">
      <motion.div
        ref={containerRef}
        className="relative mx-auto grid w-full max-w-6xl gap-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 text-white shadow-[0_40px_120px_rgba(3,6,15,0.55)] backdrop-blur-2xl lg:grid-cols-[1.15fr_0.85fr]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.21, 0.8, 0.32, 1] }}
      >
        <div>
          <MotionReveal as="div" className="space-y-4" direction="up" distance={18} stagger={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Operating posture</p>
            <h3 className="text-3xl font-semibold text-white">Live delivery metrics</h3>
            <p className="text-base text-white/70">
              Dezitech telemetry keeps a constant signal on availability, deployments, and response lines so global
              OEMs can plan against real data.
            </p>
          </MotionReveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.article
                  key={stat.label}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-4 shadow-[0_25px_55px_rgba(5,9,19,0.45)]"
                  initial={shouldAnimate ? { opacity: 0, y: 18 } : undefined}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  transition={
                    shouldAnimate
                      ? {
                          duration: 0.55,
                          delay: 0.35 + index * 0.08,
                          ease: [0.21, 0.8, 0.32, 1],
                        }
                      : undefined
                  }
                >
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black/30">
                    <Image
                      src={stat.media ?? "/images/DEZITECH_IMG_02.jpg"}
                      alt={`${stat.label} visual`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 180px, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/55">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {stat.prefix ?? ""}
                    {formatValue(stat.current, stat.decimals)}
                    {stat.suffix ? <span className="ml-1 text-sm text-white/60">{stat.suffix}</span> : null}
                  </p>
                  <p className="mt-3 text-xs text-white/60">{stat.description}</p>
                </motion.article>
              ))}
            </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <MotionReveal direction="up" distance={18} className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/50">
              <span>Latency</span>
              <span>ms</span>
            </div>
            <AnimatedLineGraph className="mt-4 h-28 w-full" />
            <p className="mt-4 text-xs text-white/60">Drawn via stroke dash offsets for a precise Dezitech reveal.</p>
          </MotionReveal>

          <MotionReveal
            direction="up"
            distance={18}
            className="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/70"
          >
            <p className="font-semibold text-white">Operational certainty</p>
            <p className="mt-2">
              Counters sync with a RAF loop, ensuring the motion cadence stays crisp even on lower-powered devices.
            </p>
          </MotionReveal>
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedStats;
