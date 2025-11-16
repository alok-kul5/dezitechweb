import Image from "next/image";

type KpiCardProps = {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  media?: string;
  variant?: "dark" | "light";
};

const FALLBACK_MEDIA = "/images/DEZITECH_IMG_02.jpg";

const toneTokens = {
  dark: {
    card: "bg-white/6 border-white/12 text-white",
    accent: "text-white/60",
    value: "text-white",
    description: "text-white/65",
    thumbBorder: "border-white/15",
  },
  light: {
    card: "bg-white border-black/5 text-[#0F1724]",
    accent: "text-[#94A3B8]",
    value: "text-[#0F1724]",
    description: "text-[#4B5563]",
    thumbBorder: "border-black/10",
  },
} as const;

const KpiCard = ({ label, value, description, icon, media, variant = "dark" }: KpiCardProps) => {
  const visual = media ?? icon ?? FALLBACK_MEDIA;
  const styles = toneTokens[variant];

  return (
    <article className={`flex items-center gap-4 rounded-[18px] border p-4 sm:p-5 shadow-[0_22px_70px_rgba(3,6,15,0.45)] ${styles.card}`}>
      <div className={`relative h-14 w-14 overflow-hidden rounded-2xl border ${styles.thumbBorder}`}>
        <Image
          src={visual}
          alt={`${label} visual`}
          width={72}
          height={72}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {icon ? (
          <Image
            src={icon}
            alt={`${label} icon`}
            width={20}
            height={20}
            loading="lazy"
            className="absolute inset-0 m-auto h-5 w-5 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
          />
        ) : null}
      </div>
      <div>
        <p className={`text-[0.55rem] uppercase tracking-[0.35em] ${styles.accent}`}>{label}</p>
        <p className={`mt-2 text-2xl font-semibold ${styles.value}`}>{value}</p>
        {description ? <p className={`mt-1 text-xs leading-relaxed ${styles.description}`}>{description}</p> : null}
      </div>
    </article>
  );
};

export type { KpiCardProps };
export default KpiCard;
