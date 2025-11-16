import AnimatedHero from "@/components/AnimatedHero";
import AnimatedStats from "@/components/AnimatedStats";
import MotionReveal from "@/components/MotionReveal";
import ProductGrid from "@/components/ProductGrid";
import Section from "@/components/Section";
import { getSiteContentSync } from "@/lib/siteData";

const siteContent = getSiteContentSync();
const servicesByTitle = siteContent.services.reduce<Record<string, (typeof siteContent.services)[number]>>(
  (acc, service) => {
    acc[service.title.toLowerCase()] = service;
    return acc;
  },
  {},
);
const outsourcing = servicesByTitle["engineering outsourcing"];
const manufacturing = servicesByTitle["manufacturing support"];
const industries = servicesByTitle["industries served"]?.bullets ?? [];
const productCards = siteContent.products.map((product) => ({
  title: product.title,
  summary: product.summary,
  href: product.href,
  mediaSrc: product.media,
  mediaAlt: `${product.title} visual`,
  icon: product.icon,
}));

export default function Home() {
  return (
    <main className="flex flex-col">
      <AnimatedHero
        eyebrow={siteContent.hero.eyebrow}
        headline={siteContent.hero.headline}
        description={siteContent.hero.description}
        primaryCta={siteContent.hero.ctaPrimary}
        secondaryCta={siteContent.hero.ctaSecondary}
        mediaSrc={siteContent.hero.image}
      />

      <AnimatedStats />

      <Section
        eyebrow="What we do"
        title="Engineering disciplines we lead"
        description={outsourcing?.description ?? ""}
        variant="light"
        accentVariant="grid"
        backdropVariant="midnight"
        accentClassName="right-16 top-12 hidden h-48 w-48 opacity-40 md:block"
        ambientProps={[
          {
            src: "/ambient/ambient-grid.svg",
            alt: "Ambient grid",
            className: "-left-10 top-6 hidden w-72 opacity-20 lg:block",
            speed: 0.04,
          },
          {
            src: "/ambient/ambient-gear-outline.svg",
            alt: "Ambient gear outline",
            className: "left-6 bottom-20 hidden w-48 opacity-30 md:block",
            speed: 0.06,
          },
        ]}
      >
        <MotionReveal direction="up" distance={18} duration={0.65} amount={0.18} variant="light">
          <div className="rounded-[28px] border border-black/5 bg-white p-2 shadow-[0_35px_95px_rgba(15,23,36,0.08)]">
            <ProductGrid items={productCards} tone="light" />
          </div>
        </MotionReveal>
      </Section>

      <Section
        eyebrow="Established expertise"
        title="Why partners trust Dezitech"
        description={siteContent.quality.title}
        variant="dark"
        accentVariant="orb"
        backdropVariant="sand"
        accentClassName="left-10 -bottom-4 hidden h-56 w-56 opacity-50 md:block"
        ambientProps={[
          {
            src: "/ambient/ambient-lines.svg",
            alt: "Ambient lines",
            className: "right-4 top-12 hidden w-64 opacity-30 lg:block",
            speed: 0.05,
          },
        ]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteContent.quality.pillars.map((item, index) => (
            <MotionReveal
              key={item}
              as="div"
              direction="up"
              distance={18}
              duration={0.6}
              delay={index * 0.06}
              splitText
              pop
              className="interactive-card rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-white/80"
            >
              {item}
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Global presence"
        title="UK + India delivery model"
        description={manufacturing?.description ?? ""}
        variant="light"
        accentVariant="beam"
        backdropVariant="slate"
        accentClassName="right-12 top-1/2 hidden h-60 w-24 -translate-y-1/2 opacity-40 md:block"
        ambientProps={[
          {
            src: "/ambient/ambient-glow.png",
            alt: "Ambient glow",
            className: "-left-6 bottom-10 hidden w-64 opacity-30 lg:block",
            speed: 0.04,
          },
        ]}
      >
        <div className="space-y-4">
          {(manufacturing?.bullets ?? []).map((statement, index) => (
            <MotionReveal
              key={statement}
              as="div"
              direction="up"
              distance={18}
              duration={0.6}
              delay={index * 0.05}
              splitText
              variant="light"
              className="rounded-3xl border border-black/5 bg-white/90 px-6 py-5 text-sm text-[#0F1724]"
            >
              {statement}
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Industries served"
        title="Where we already operate"
        description={servicesByTitle["industries served"]?.description ?? ""}
        variant="dark"
        accentVariant="grid"
        backdropVariant="sand"
        accentClassName="right-8 top-10 hidden h-40 w-40 opacity-50 md:block"
        ambientProps={[
          {
            src: "/ambient/ambient-lines.svg",
            alt: "Ambient line work",
            className: "left-10 bottom-6 hidden w-60 opacity-20 md:block",
            speed: 0.03,
          },
        ]}
      >
        <div className="grid gap-4 md:grid-cols-5">
          {industries.map((industry, index) => (
            <MotionReveal
              key={industry}
              as="div"
              direction="up"
              distance={16}
              duration={0.55}
              delay={index * 0.04}
              pop
              className="interactive-card rounded-2xl border border-white/10 bg-white/10 px-4 py-6 text-center text-sm font-semibold text-white"
            >
              {industry}
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Get in touch"
        title="Stay ahead with Dezitech"
        description={siteContent.contact.message}
        variant="light"
        accentVariant="orb"
        backdropVariant="midnight"
        accentClassName="left-20 top-4 hidden h-48 w-48 opacity-40 md:block"
      >
        <MotionReveal
          direction="up"
          distance={20}
          duration={0.65}
          splitText
          variant="light"
          className="rounded-3xl border border-black/5 bg-white p-8 text-base text-[#0F1724]"
        >
          {siteContent.contact.message}
        </MotionReveal>
      </Section>
    </main>
  );
}
