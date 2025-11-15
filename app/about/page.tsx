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
      >
        <div className="space-y-4 text-base text-gray-700">
          {aboutIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            We have capabilities to develop product from concept, solve complex problems or simply provide engineering
            resources.
          </p>
          <p>
            We can take concept and develop product and/or Add resources to bridge skill gap and/or Add resources to
            complete the not started projects.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Why us"
        title="Reasons partners choose Dezitech"
        description="Sourced from the About Us section."
        className="bg-white"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {whyUs.map((point) => (
            <div key={point} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              {point}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How we work"
        title="Partnership-first delivery model"
        description="Text pulled directly from the Engineering outsourcing and Manufacturing sections."
      >
        <div className="space-y-8">
          {approach.map((section) => (
            <div key={section.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <div className="mt-4 space-y-4 text-sm text-gray-700">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default AboutPage;
