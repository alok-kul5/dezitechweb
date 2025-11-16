import Image from "next/image";

type KpiCardProps = {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  media?: string;
};

const FALLBACK_MEDIA = "/images/DEZITECH_IMG_02.jpg";

const KpiCard = ({ label, value, description, icon, media }: KpiCardProps) => {
  const visual = media ?? icon ?? FALLBACK_MEDIA;

  return (
    <article className="card-surface card-surface--metric flex items-center gap-5 bg-white/5">
      <div
        className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10"
        style={{ width: "72px", height: "72px" }}
      >
        <Image
          src={visual}
          alt={`${label} visual`}
          width={72}
          height={72}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent" />
        {icon ? (
          <Image
            src={icon}
            alt={`${label} icon`}
            width={28}
            height={28}
            loading="lazy"
            className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
          />
        ) : null}
      </div>
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/70">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        {description ? <p className="mt-2 text-xs text-white/65">{description}</p> : null}
      </div>
    </article>
  );
};

export type { KpiCardProps };
export default KpiCard;
