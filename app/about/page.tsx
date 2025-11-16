import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";

const aboutIntro = [
  "Dezitech is your solutions provider in engineering design, products and supply chain.",
  "Established in 2014, Dezitech engineering pvt. Ltd engineers have extensive experience in engineering design, new product development and supply chain management in diverse industries.",
  "We have expertise in industries : Automotive, Industrial, HVAC, Oil and gas and have provided engineering / supply chain support to customers in the UK, USA, India and Australia. We work as an extension of customers engineering team.",
];

const whyUs = [
  "Local presence",
  "Experience of Making outsourcing profitable",
  "Excellent understanding of international cultural issues",
  "Nimble, Flexible hands on team",
  "Diverse Engineering experience",
  "In depth technical Understanding & involvement",
  "Multidisciplinary Engineering resources",
  "Awareness of international quality and standards",
];

const approach = [
  {
    title: "Engineering outsourcing",
    body: [
      "Our Engineers have 20+ years of international working experience and understand the business environment and cultural issues.",
      "We believe that Engineering support should enhance and enrich the in-house knowledge & experience, which is generated and built over the years. With this aim, we work in partnership and as an extension of the in-house engineering resources and address skill / resource gaps.",
      "We understand the concerns regarding IP / knowledge protection and make sure that the IP remains protected and with the client all the time. We are able to provide tailored and flexible engineering support as the requirement.",
      "With excellent understanding of the world class new product development process, we can help bring new products right first time and faster to the market.",
    ],
  },
  {
    title: "Manufacturing",
    body: [
      "It is important to select right Manufacturing partner for a reliable, resilient supply with excellent quality and costs.",
      "We have first-hand experience of the expectations of quality, standards and delivery. We have international experience and understand business and cultural environment. Our local presence makes easy communication / smooth execution.",
      "We can help by providing a quality and reliable supply of products and components. We manage the entire process :from finding suitable manufacturer to continuous supply of products / components.",
    ],
  },
];

const AboutPage = () => {
  return (
      <>
        <Section
          eyebrow="About"
          title="An end to end engineering solutions provider"
          description="Copy sourced from dezitechengineering.com/about.html"
          ambientProps={[
            {
              src: "/ambient/ambient-grid.svg",
              alt: "Ambient grid",
              className: "right-12 top-8 hidden w-64 opacity-25 lg:block",
              speed: 0.04,
            },
          ]}
        >
              <div className="space-y-4 text-base text-white/75">
                {aboutIntro.map((paragraph, index) => (
                  <MotionReveal key={paragraph} as="p" delay={index * 0.05} splitText>
                    {paragraph}
                  </MotionReveal>
                ))}
                <MotionReveal as="p" delay={aboutIntro.length * 0.05} splitText>
                  We have capabilities to develop product from concept, solve complex problems or simply provide engineering
                  resources.
                </MotionReveal>
                <MotionReveal as="p" delay={aboutIntro.length * 0.05 + 0.08} splitText>
                  We can take concept and develop product and/or add resources to bridge skill gaps or complete the not started
                  projects.
                </MotionReveal>
              </div>
        </Section>

        <Section
          eyebrow="Why us"
          title="Reasons partners choose Dezitech"
          description="Sourced from the About Us section."
          ambientProps={[
            {
              src: "/ambient/ambient-lines.svg",
              alt: "Ambient lines",
              className: "left-6 top-10 hidden w-52 opacity-20 md:block",
              speed: 0.05,
            },
          ]}
        >
              <div className="grid gap-4 md:grid-cols-2">
                {whyUs.map((point, index) => (
                  <MotionReveal
                    key={point}
                    delay={index * 0.05}
                    splitText
                    pop
                    className="interactive-card rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75"
                  >
                    {point}
                  </MotionReveal>
                ))}
              </div>
        </Section>

        <Section
          eyebrow="How we work"
          title="Partnership-first delivery model"
          description="Text pulled directly from the Engineering outsourcing and Manufacturing sections."
          ambientProps={[
            {
              src: "/ambient/ambient-gear-outline.svg",
              alt: "Ambient gear",
              className: "-right-4 bottom-10 hidden w-48 opacity-30 lg:block",
              speed: 0.04,
            },
          ]}
        >
            <div className="space-y-8">
              {approach.map((section, index) => (
                <MotionReveal
                  key={section.title}
                  delay={index * 0.08}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_50px_rgba(5,7,15,0.45)]"
                >
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  <div className="mt-4 space-y-4 text-sm text-white/70">
                      {section.body.map((paragraph, paragraphIndex) => (
                        <MotionReveal
                          key={paragraph}
                          as="p"
                          delay={0.05 + paragraphIndex * 0.05}
                          splitText
                        >
                          {paragraph}
                        </MotionReveal>
                      ))}
                  </div>
                </MotionReveal>
              ))}
            </div>
        </Section>
      </>
  );
};

export default AboutPage;
