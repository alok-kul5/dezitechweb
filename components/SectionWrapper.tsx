import { CSSProperties, ReactNode } from "react";

type SectionTone = "dark" | "light";

type SectionWrapperProps = {
  id?: string;
  variant?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  ambient?: ReactNode;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

const variantClasses: Record<SectionTone, string> = {
  dark: "bg-[#05070d] text-white",
  light: "bg-white text-[#0f1724]",
};

const overlayClasses: Record<SectionTone, string> = {
  dark: "from-[#111827]/80 via-[#05070d]/40 to-[#05070d]",
  light: "from-white via-white to-[#f3f4f6]",
};

type ToneVars = CSSProperties & {
  "--tone-foreground": string;
  "--tone-muted": string;
  "--tone-border": string;
  "--tone-card": string;
};

const toneVars: Record<SectionTone, ToneVars> = {
  dark: {
    "--tone-foreground": "#ffffff",
    "--tone-muted": "rgba(255,255,255,0.72)",
    "--tone-border": "rgba(255,255,255,0.12)",
    "--tone-card": "rgba(15,23,36,0.92)",
  },
  light: {
    "--tone-foreground": "#0f1724",
    "--tone-muted": "rgba(107,114,128,1)",
    "--tone-border": "rgba(15,23,36,0.12)",
    "--tone-card": "rgba(15,23,36,0.02)",
  },
};

const SectionWrapper = ({
  id,
  variant = "dark",
  className,
  containerClassName,
  children,
  ambient,
}: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={cx(
        "section-wrapper relative isolate overflow-hidden py-20 sm:py-24",
        "transition-colors duration-500",
        variantClasses[variant],
        className,
      )}
      data-tone={variant}
      style={toneVars[variant]}
    >
      <div className="absolute inset-0 opacity-90" aria-hidden>
        <div className={cx("absolute inset-0 bg-gradient-to-b", overlayClasses[variant])} />
        <div
          className={cx(
            "absolute inset-0",
            variant === "dark"
              ? "bg-[radial-gradient(circle_at_20%_-10%,rgba(200,16,46,0.15),transparent_60%)]"
              : "bg-[radial-gradient(circle_at_80%_-20%,rgba(200,16,46,0.12),transparent_55%)]",
          )}
        />
      </div>

      {ambient ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {ambient}
        </div>
      ) : null}

      <div
        className={cx(
          "relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
};

export type { SectionTone, SectionWrapperProps };
export default SectionWrapper;
