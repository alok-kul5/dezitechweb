import Image from "next/image";
import Link from "next/link";

export type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
};

const Hero = ({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageSrc = "/assets/hero-visual.svg",
  imageAlt = "Dezitech engineering hero visual",
}: HeroProps) => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          {eyebrow ? <p className="text-sm font-semibold uppercase text-gray-500">{eyebrow}</p> : null}
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">{title}</h1>
          {description ? <p className="text-base text-gray-600">{description}</p> : null}
          <div className="flex flex-wrap gap-4">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white"
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-800"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 shadow-sm">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={640}
            height={480}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
