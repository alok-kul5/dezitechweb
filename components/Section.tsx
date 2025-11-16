import Image from "next/image";
import { JSX, ReactNode } from "react";

import MaskReveal from "./MaskReveal";
import MotionReveal from "./MotionReveal";
import ParallaxWrapper from "./ParallaxWrapper";
import SectionWrapper, { SectionVariant } from "./SectionWrapper";

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
  variant?: SectionVariant;
};

const backdropStyles: Record<SectionBackdrop, Record<SectionVariant, string>> = {
  slate: {
    dark: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_65%)]",
    light: "bg-[radial-gradient(circle_at_top,_rgba(15,23,36,0.1),_transparent_55%)]",
  },
  sand: {
    dark: "bg-[radial-gradient(circle_at_top,_rgba(200,16,46,0.25),_transparent_72%)]",
    light: "bg-[radial-gradient(circle_at_top,_rgba(248,248,249,0.9),_transparent_65%)]",
  },
  midnight: {
    dark: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)]",
    light: "bg-[radial-gradient(circle_at_top,_rgba(15,23,36,0.12),_transparent_60%)]",
  },
};

const accentContent: Record<SectionAccent, (variant: SectionVariant) => JSX.Element> = {
  grid: (variant) => (
    <div
      className={`h-full w-full rounded-[40px] border ${
        variant === "light" ? "border-[#0F1724]/10 opacity-60" : "border-white/5 opacity-40 mix-blend-screen"
      }`}
      style={{ backgroundImage: "url(/images/DEZITECH_TECH_GRID.svg)", backgroundSize: "cover", backgroundPosition: "center" }}
    />
  ),
  orb: (variant) => (
    <div
      className={`h-full w-full rounded-full blur-2xl ${
        variant === "light"
          ? "bg-[radial-gradient(circle,_rgba(200,16,46,0.25),_transparent_70%)]"
          : "bg-[radial-gradient(circle,_rgba(200,16,46,0.4),_transparent_70%)]"
      }`}
    />
  ),
  beam: (variant) => (
    <div
      className={`h-full w-full rounded-[999px] ${
        variant === "light"
          ? "bg-gradient-to-r from-[#0F1724]/40 via-transparent to-transparent opacity-60"
          : "bg-gradient-to-r from-white/60 via-white/10 to-transparent opacity-70"
      } blur-md`}
    />
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

  const shellClass =
    variant === "light"
      ? "border-[rgba(15,23,36,0.08)] bg-white text-[#0F1724] shadow-[0_35px_95px_rgba(15,23,36,0.12)]"
      : "border-white/10 bg-white/5 text-white shadow-[0_45px_120px_rgba(3,6,15,0.6)] backdrop-blur";
  const eyebrowClass =
    variant === "light"
      ? "text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[#94A3B8]"
      : "text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/55";
  const titleClass = variant === "light" ? "text-3xl font-semibold text-[#0F1724]" : "text-3xl font-semibold text-white";
  const descriptionClass = variant === "light" ? "text-base text-[#4B5563]" : "text-base text-white/70";

  return (
    <SectionWrapper id={id} variant={variant}>
      <div className={`relative overflow-hidden rounded-[40px] border ${shellClass} ${className}`}>
        <MotionReveal
          className="pointer-events-none absolute inset-x-3 inset-y-4 rounded-[48px]"
          fadeOnly
          direction="up"
          distance={24}
          duration={0.72}
          amount={0.15}
          variant={variant}
        >
          <div
            className={`h-full w-full rounded-[48px] ${backdropStyles[backdropVariant][variant]}`}
          />
        </MotionReveal>

        <ParallaxWrapper
          speed={0.14}
          className={`pointer-events-none absolute ${accentClassName}`}
        >
          {accentContent[accentVariant](variant)}
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

        <div className="relative z-10 space-y-8 p-8">
          {hasHeading ? (
            <MotionReveal
              as="div"
              className="space-y-3"
              direction="up"
              distance={24}
              duration={0.72}
              stagger={0.08}
              variant={variant}
            >
              {eyebrow ? <div className={eyebrowClass}>{eyebrow}</div> : null}
              {title ? (
                <div>
                  <MaskReveal as="h2" className={titleClass}>
                    {title}
                  </MaskReveal>
                </div>
              ) : null}
              {description ? <div className={descriptionClass}>{description}</div> : null}
            </MotionReveal>
          ) : null}
          {children}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Section;
