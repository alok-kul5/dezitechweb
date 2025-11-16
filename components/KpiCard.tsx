import Image from "next/image";

type KpiCardProps = {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  media?: string;
};

const FALLBACK_MEDIA = "/images/refrigeration-cold.jpg";

const KpiCard = ({ label, value, description, icon, media }: KpiCardProps) => {
  const visual = media ?? icon ?? FALLBACK_MEDIA;

  return (
    <article className="flex items-center gap-4 rounded-[18px] border border-[var(--tone-border)] bg-[var(--tone-card)] p-4 text-[var(--tone-foreground)] backdrop-blur">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/5">
        <Image
          src={visual}
          alt={`${label} visual`}
          width={80}
          height={80}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent" />
        {icon ? (
          <Image
            src={icon}
            alt={`${label} icon`}
            width={32}
            height={32}
            loading="lazy"
            className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
          />
        ) : null}
      </div>
      <div className="flex-1">
        <p className="text-[0.58rem] uppercase tracking-[0.32em] text-[var(--tone-muted)]">{label}</p>
        <p className="mt-2 text-[clamp(1.85rem,3vw,2.4rem)] font-semibold leading-tight text-[var(--tone-foreground)]">
          {value}
        </p>
        {description ? <p className="mt-1 text-sm text-[var(--tone-muted)]">{description}</p> : null}
      </div>
    </article>
  );
};

export type { KpiCardProps };
export default KpiCard;
