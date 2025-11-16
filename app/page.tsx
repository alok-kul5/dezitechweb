import AnimatedHero from "@/components/AnimatedHero";
import AnimatedStats from "@/components/AnimatedStats";
import MotionReveal from "@/components/MotionReveal";
import ProductGrid from "@/components/ProductGrid";
import Section from "@/components/Section";

const heroHeadline = [
  "Helping customers grow profitably",
  "through Meridian-grade engineering outsourcing",
  "and resilient product manufacturing",
];

const heroDescription =
  "We combine UK and India based engineering talent to design, build, and deliver resilient supply chains for ambitious OEMs.";

const featuredProducts = [
  {
    title: "Engineering and design",
    summary: "Engineering resources, design, 3D modelling, CAE/FEA",
    href: "/products/engineering-design",
  },
  {
    title: "Refrigeration",
    summary: "Design of refrigeration systems and component supply",
    href: "/products/refrigeration",
  },
  { title: "Heat pump", summary: "Heat pump design and components supply", href: "/products/heat-pump" },
  {
    title: "Engineering Supply chain",
    summary: "Cost effective & reliable components supply with excellent quality",
    href: "/products/engineering-supply-chain",
  },
];

const foundingHighlights = [
  "Established in 2014 by highly qualified and experienced Engineering professionals",
  "Diversified and Global engineering experience",
  "Well skilled in engineering, manufacturing and business management",
  "Experience and Understanding of engineering outsourcing process",
];

const presenceStatements = [
  "We are located in the UK & India, making communication easy and projects implementation effective.",
  "In depth technical understanding. Solution provider rather than just outsourcing company.",
  "Manufacturing and supply chain expertise honed through 20+ years of global industry experience.",
  "Rigours supplier qualification process to ensure quality, reliability and continuous supply.",
];

const industriesServed = ["Oil and gas", "Automotive", "Industrial", "Aviation", "HVAC & R"];

export default function Home() {
  return (
      <>
        <AnimatedHero
          eyebrow="Dezitech Engineering"
          headline={heroHeadline}
          description={heroDescription}
          primaryCta={{ label: "Explore Products", href: "/products" }}
          secondaryCta={{ label: "Our Services", href: "/services" }}
        />

        <AnimatedStats />

        <Section
          eyebrow="What we do"
          title="Engineering disciplines we lead"
          description="Copy sourced from dezitechengineering.com to highlight Dezitech’s primary solution areas."
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
          <MotionReveal direction="up" distance={18} duration={0.65} amount={0.18}>
            <div className="rounded-[28px] border border-white/20 bg-black/30 p-2 backdrop-blur">
              <ProductGrid items={featuredProducts} />
            </div>
          </MotionReveal>
        </Section>

        <Section
          eyebrow="Established expertise"
          title="Why partners trust Dezitech"
          description="Headlines directly mirrored from the Dezitech homepage."
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
            {foundingHighlights.map((item, index) => (
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
          description="Summaries imported from the manufacturing/supply chain and homepage sections."
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
            {presenceStatements.map((statement, index) => (
              <MotionReveal
                key={statement}
                as="div"
                direction="up"
                distance={18}
                duration={0.6}
                delay={index * 0.05}
                splitText
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-white/75"
              >
                {statement}
              </MotionReveal>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Industries served"
          title="Where we already operate"
          description="Direct lift from the Dezitech industries overview."
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
            {industriesServed.map((industry, index) => (
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
          description="Adapted from the contact page invitation."
          accentVariant="orb"
          backdropVariant="midnight"
          accentClassName="left-20 top-4 hidden h-48 w-48 opacity-40 md:block"
        >
          <MotionReveal
            direction="up"
            distance={20}
            duration={0.65}
            splitText
            className="rounded-3xl border border-white/10 bg-black/30 p-8 text-base text-white/80"
          >
            Please do contact us for any further details such as work samples, quotation or to discuss how we can help you.
            We stay responsive between Karad and Bristol so project conversations, supplier coordination, and engineering
            reviews stay on track.
          </MotionReveal>
        </Section>
      </>
  );
}
