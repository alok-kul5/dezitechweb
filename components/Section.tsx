import { JSX, ReactNode } from "react";

import MotionReveal from "./MotionReveal";
import ParallaxWrapper from "./ParallaxWrapper";

type SectionAccent = "grid" | "orb" | "beam";
type SectionBackdrop = "slate" | "sand" | "midnight";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  accentVariant?: SectionAccent;
  accentClassName?: string;
  backdropVariant?: SectionBackdrop;
};

const backdropStyles: Record<SectionBackdrop, string> = {
  slate: "bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12),_transparent_65%)]",
  sand: "bg-[radial-gradient(circle_at_top,_rgba(245,233,205,0.3),_transparent_55%)]",
  midnight: "bg-[radial-gradient(circle_at_top,_rgba(80,201,206,0.15),_transparent_60%)]",
};

const accentContent: Record<SectionAccent, JSX.Element> = {
  grid: (
    <div className="h-full w-full rounded-[40px] border border-white/5 bg-[url(/images/DEZITECH_TECH_GRID.svg)] bg-cover bg-center opacity-30 mix-blend-screen" />
  ),
  orb: (
    <div className="h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(80,201,206,0.5),_transparent_70%)] blur-2xl" />
  ),
  beam: (
    <div className="h-full w-full rounded-[999px] bg-gradient-to-r from-white/60 via-white/10 to-transparent opacity-70 blur-md" />
  ),
};

const Section = ({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  accentVariant = "grid",
  accentClassName = "right-6 top-6 hidden h-40 w-40 md:block",
  backdropVariant = "slate",
}: SectionProps) => {
  const hasHeading = Boolean(eyebrow || title || description);

  return (
    <section id={id} className={`relative overflow-hidden px-6 py-16 ${className}`}>
      <MotionReveal
        className="pointer-events-none absolute inset-x-3 inset-y-4 rounded-[48px]"
        fadeOnly
        direction="up"
        distance={18}
        duration={0.8}
        amount={0.15}
      >
        <div className={`h-full w-full rounded-[48px] ${backdropStyles[backdropVariant]}`} />
      </MotionReveal>

      <ParallaxWrapper
        speed={0.14}
        className={`pointer-events-none absolute ${accentClassName}`}
      >
        {accentContent[accentVariant]}
      </ParallaxWrapper>

      <div className="relative mx-auto max-w-6xl space-y-8 rounded-[40px] border border-white/5 bg-white/80 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur">
        {hasHeading ? (
          <MotionReveal
            as="div"
            className="space-y-2"
            direction="up"
            distance={22}
            duration={0.65}
            stagger={0.05}
            amount={0.2}
          >
            {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">{eyebrow}</p> : null}
            {title ? <h2 className="text-3xl font-semibold text-neutral-900">{title}</h2> : null}
            {description ? <p className="text-base text-neutral-600">{description}</p> : null}
          </MotionReveal>
        ) : null}
        {children}
      </div>
    </section>
  );
};

export default Section;
