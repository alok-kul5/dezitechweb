import { CSSProperties, ReactNode } from "react";

type SectionVariant = "dark" | "light";

type SectionWrapperProps = {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  children: ReactNode;
};

const variantTokens: Record<SectionVariant, CSSProperties> = {
  dark: {
    "--section-bg": "#0B0F14",
    "--section-text-primary": "#FFFFFF",
    "--section-text-secondary": "#D1D5DB",
    "--section-card-bg": "rgba(255,255,255,0.04)",
    "--section-card-border": "rgba(255,255,255,0.12)",
    "--section-card-shadow": "0 40px 120px rgba(3,6,15,0.65)",
    "--section-shell-bg": "rgba(255,255,255,0.02)",
    "--section-shell-border": "rgba(255,255,255,0.08)",
    "--section-shell-contrast": "rgba(255,255,255,0.18)",
    "--section-ambient-line": "rgba(255,255,255,0.08)",
    "--section-ambient-glow": "rgba(200,16,46,0.22)",
    "--section-accent": "#C8102E",
  },
  light: {
    "--section-bg": "#FFFFFF",
    "--section-text-primary": "#0F1724",
    "--section-text-secondary": "#4B5563",
    "--section-card-bg": "#FFFFFF",
    "--section-card-border": "rgba(15,23,36,0.08)",
    "--section-card-shadow": "0 35px 90px rgba(15,23,36,0.09)",
    "--section-shell-bg": "#FFFFFF",
    "--section-shell-border": "rgba(15,23,36,0.08)",
    "--section-shell-contrast": "rgba(15,23,36,0.12)",
    "--section-ambient-line": "rgba(15,23,36,0.08)",
    "--section-ambient-glow": "rgba(200,16,46,0.16)",
    "--section-accent": "#C8102E",
  },
};

const SectionWrapper = ({ id, variant = "dark", className = "", children }: SectionWrapperProps) => {
  return (
    <section
      id={id}
      data-variant={variant}
      className={`section-wrapper section-wrapper--${variant} ${className}`}
      style={variantTokens[variant]}
    >
      <div className="section-wrapper__glow" aria-hidden />
      <div className="section-wrapper__inner">{children}</div>
    </section>
  );
};

export type { SectionVariant, SectionWrapperProps };
export default SectionWrapper;
