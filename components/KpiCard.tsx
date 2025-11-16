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
  const badgeVisual = media ?? icon ?? FALLBACK_MEDIA;

  return (
    <article className="kpi-card relative flex gap-4 rounded-[22px] border p-5 text-[var(--tone-foreground)] backdrop-blur-xl">
      <div className="kpi-card__badge" aria-hidden="true">
        <Image src={badgeVisual} alt="" fill sizes="68px" className="object-cover opacity-90" loading="lazy" />
        {icon ? (
          <Image
            src={icon}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="absolute inset-0 m-auto h-7 w-7 object-contain drop-shadow-[0_8px_18px_rgba(3,4,10,0.65)]"
          />
        ) : null}
      </div>
      <div className="flex-1">
        <p className="kpi-card__label text-[0.58rem] uppercase tracking-[0.32em] text-[var(--tone-muted)]">{label}</p>
        <p className="kpi-card__value mt-2 text-[clamp(1.85rem,3vw,2.4rem)] font-semibold leading-tight text-[var(--tone-foreground)]">
          {value}
        </p>
        {description ? <p className="kpi-card__description mt-1 text-sm text-[var(--tone-muted)]">{description}</p> : null}
      </div>
    </article>
  );
};

export type { KpiCardProps };
export default KpiCard;
