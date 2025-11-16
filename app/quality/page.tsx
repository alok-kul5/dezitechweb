import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";

const qualityHighlights = [
  "In depth technical understanding. Solution provider rather than just outsourcing company",
  "Manufacturing and supply chain expertise based on strong technical knowledge honed through 20+ years of experience in the global industry.",
  "Quick turn-around times",
  "Local Warehousing if required",
  "Flexibility in volumes",
  "Wide rage of engineering components: castings, machining, forging, assembly",
  "20+ years of experience of development of vendor",
  "Rigours supplier qualification process to ensure quality, reliability and continuous supply",
  "Excellent network of suppliers for services such as patterns, tools, fixtures and for scaling the supply",
  "Cost advantage",
];

const assuranceStatements = [
  "We are located in the UK & India, making communication easy and projects implementation  effective.",
  "We manage the relationships to make sure that the supply chain delivers at right time and right place at right cost.",
  "We have systems on place for Development & approval of patterns, jigs/fixtures, gauges and Material, dimensional testing & traceability",
];

const QualityPage = () => {
  return (
      <Section
        eyebrow="Quality"
        title="Quality & Certifications"
        description="Assurance copy imported from the manufacturing page on dezitechengineering.com."
        ambientProps={[
          {
            src: "/ambient/ambient-grid.svg",
            alt: "Ambient grid",
            className: "-right-8 top-8 hidden w-60 opacity-25 lg:block",
            speed: 0.04,
          },
          {
            src: "/ambient/ambient-gear-outline.svg",
            alt: "Gear outline",
            className: "left-6 bottom-6 hidden w-48 opacity-25 md:block",
            speed: 0.05,
          },
        ]}
      >
        <div className="space-y-6 text-sm text-white/75">
          {assuranceStatements.map((statement, index) => (
            <MotionReveal key={statement} as="p" delay={index * 0.06} splitText>
              {statement}
            </MotionReveal>
          ))}
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {qualityHighlights.map((item, index) => (
            <MotionReveal
              key={item}
              delay={index * 0.05}
              pop
              className="interactive-card rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
            >
              {item}
            </MotionReveal>
          ))}
        </div>
      </Section>
  );
};

export default QualityPage;
