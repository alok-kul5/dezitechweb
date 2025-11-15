import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";

const heroTitle = (
  <>
    Helping customers grow profitably by providing engineering outsourcing solutions{" "}
    <span className="text-dezitech-500">Design</span> and{" "}
    <span className="text-dezitech-500">Product manufacturing</span>
  </>
);

const heroDescription =
  "We combine UK and India based engineering talent to design, manufacture, and deliver resilient supply chains for ambitious OEMs.";

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
      <Hero
        eyebrow="Dezitech Engineering"
        title={heroTitle}
        description={heroDescription}
        primaryCta={{ label: "Explore Products", href: "/products" }}
        secondaryCta={{ label: "Our Services", href: "/services" }}
      />

        <Section
          eyebrow="What we do"
          title="Engineering disciplines we lead"
          description="Copy sourced from dezitechengineering.com to highlight Dezitech’s primary solution areas."
        >
          <MotionReveal direction="up" distance={18} duration={0.6} amount={0.18}>
            <ProductGrid items={featuredProducts} />
          </MotionReveal>
        </Section>

        <Section
          eyebrow="Established expertise"
          title="Why partners trust Dezitech"
          description="Headlines directly mirrored from the Dezitech homepage."
          className="bg-white"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {foundingHighlights.map((item, index) => (
              <MotionReveal
                key={item}
                direction="up"
                distance={18}
                duration={0.6}
                delay={index * 0.05}
                className="rounded-2xl border border-neutral-100 bg-neutral-50 px-5 py-4 text-sm text-neutral-800"
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
        >
          <div className="space-y-4">
            {presenceStatements.map((statement, index) => (
              <MotionReveal
                key={statement}
                direction="up"
                distance={18}
                duration={0.6}
                delay={index * 0.05}
                className="rounded-3xl border border-dashed border-neutral-200 bg-white px-6 py-5 text-sm text-neutral-800"
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
        >
          <div className="grid gap-4 md:grid-cols-5">
            {industriesServed.map((industry, index) => (
              <MotionReveal
                key={industry}
                direction="up"
                distance={16}
                duration={0.55}
                delay={index * 0.05}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-6 text-center text-sm font-semibold text-neutral-900"
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
        >
          <MotionReveal
            direction="up"
            distance={20}
            duration={0.65}
            className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-800"
          >
            Please do contact us for any further details such as work samples, quotation or to discuss how we can help you.
            We stay responsive between Karad and Bristol so project conversations, supplier coordination, and engineering
            reviews stay on track.
          </MotionReveal>
        </Section>
    </>
  );
}
