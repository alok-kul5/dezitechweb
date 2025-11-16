import Image from "next/image";
import { JSX, ReactNode } from "react";

import MaskReveal from "./MaskReveal";
import MotionReveal from "./MotionReveal";
import ParallaxWrapper from "./ParallaxWrapper";
import SectionWrapper, { SectionTone } from "./SectionWrapper";

type SectionAccent = "grid" | "orb" | "beam";
type SectionBackdrop = "slate" | "sand" | "midnight";

type SectionAmbientProp = {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  axis?: "x" | "y";
  width?: number;
  height?: number;
};

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
  ambientProps?: SectionAmbientProp[];
  variant?: SectionTone;
};

const backdropStyles: Record<SectionBackdrop, string> = {
  slate:
    "bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.35),_transparent_65%)]",
  sand:
    "bg-[radial-gradient(circle_at_top,_rgba(245,233,205,0.35),_transparent_55%)]",
  midnight:
    "bg-[radial-gradient(circle_at_top,_rgba(80,201,206,0.35),_transparent_60%)]",
};

const accentContent: Record<SectionAccent, JSX.Element> = {
  grid: (
    <div className="h-full w-full rounded-[40px] border border-white/5 bg-[url(/images/DEZITECH_TECH_GRID.svg)] bg-cover bg-center opacity-40 mix-blend-screen" />
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
  ambientProps = [],
  variant = "dark",
}: SectionProps) => {
  const hasHeading = Boolean(eyebrow || title || description);
  const copyMuted = "text-[var(--tone-muted)]";
  const panelClasses =
    variant === "dark"
      ? "border-white/10 bg-white/5 text-[var(--tone-foreground)] shadow-[0_30px_90px_rgba(3,6,15,0.45)]"
      : "border-black/5 bg-white/80 text-[var(--tone-foreground)] shadow-[0_30px_90px_rgba(15,23,36,0.08)]";

  return (
    <SectionWrapper id={id} variant={variant} className={className}>
      <MotionReveal
        className="pointer-events-none absolute inset-x-3 inset-y-4 rounded-[48px]"
        fadeOnly
        direction="up"
        distance={24}
        duration={0.72}
        amount={0.15}
      >
        <div
          className={`h-full w-full rounded-[48px] ${backdropStyles[backdropVariant]}`}
        />
      </MotionReveal>

      <ParallaxWrapper
        speed={0.14}
        className={`pointer-events-none absolute ${accentClassName}`}
      >
        {accentContent[accentVariant]}
      </ParallaxWrapper>

        {ambientProps.map((prop) => (
        <ParallaxWrapper
          key={`${prop.src}-${prop.className ?? ""}`}
          speed={prop.speed}
          axis={prop.axis}
          className={`pointer-events-none absolute ${prop.className ?? ""}`}
        >
          <Image
            src={prop.src}
            alt={prop.alt}
            width={prop.width ?? 320}
            height={prop.height ?? 320}
            className="w-full opacity-50"
          />
        </ParallaxWrapper>
        ))}

        <div
          className={`relative mx-auto max-w-5xl space-y-8 rounded-[36px] border p-8 backdrop-blur-2xl ${panelClasses}`}
        >
          {hasHeading ? (
            <MotionReveal
              as="div"
              className="space-y-3"
              direction="up"
              distance={24}
              duration={0.72}
              stagger={0.08}
            >
              {eyebrow ? (
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--tone-muted)]">
                  {eyebrow}
                </div>
              ) : null}
              {title ? (
                <div>
                  <MaskReveal
                    as="h2"
                    className="text-3xl font-semibold text-[var(--tone-foreground)]"
                  >
                    {title}
                  </MaskReveal>
                </div>
              ) : null}
              {description ? <div className={`text-base ${copyMuted}`}>{description}</div> : null}
            </MotionReveal>
          ) : null}
          {children}
        </div>
      </SectionWrapper>
  );
};

export default Section;
