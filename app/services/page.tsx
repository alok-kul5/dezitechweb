import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";

const services = [
  {
    title: "Engineering / Design Services",
    source: "dezitechengineering.com/engineeringdesign.html",
    intro: "WE PROVIDE TECHNICAL RESOURCES AND EXPERTISE AND SOLVE TECHNICAL CHALLANGES",
    body: [
      "We solve technical challenges and provide resources to get new products faster to the market.",
      "New products need to be introduced ahead of the competition. Any delay means loosing business and money. Our engineers have many years of worldwide experience in New product development. As such we understand the business environment and challenges in New Product development.",
      "Continuous Innovation and technology development keeps organisations profitable and ahead of the competition. This is possible if there is a pipeline of innovation and these innovations are brought to the market quickly year after year.",
      "Various issues such as shortage of resources, lack of skills and/or budgeting, to name a few, delay the new product introduction. It is not always feasible to invest in all the engineering tools and techniques, softwares or subject matter experts. In addition, daily issues often take priority over long term / short term Product development / R&D.  Without access all the resources, it is inevitable delaying product launch.",
      "We provide engineering expertise and resources to overcome these challenges to get new products faster to the marketplace.",
    ],
    highlights: [
      "Design Engineering expertise & resources",
      "Availability of Diverse engineering expertise: Mechanical, electrical/Control engineering, software",
      "CAE- FEA and CFD expert services",
      "Subject matter experts in diverse disciplines",
      "QFD, DFMEA, DoE, design for manufacturing / assembly and service",
    ],
  },
  {
    title: "Manufacturing & Supply Chain",
    source: "dezitechengineering.com/supplychain.html",
    intro: "Supply of high quality engineering components / products",
    body: [
      "Buy high quality engineering components / products reliably from Asia Pacific to remain Competitive and grow profitably.",
      "It is vital to remain cost competitive and profitable. Increased profitability can be achieved by complementing the in-house manufacturing with outsourcing of components / supply chain. Developing supply chain also allows focus on core activities, increases efficiency and most importantly reduces costs.",
      "It is important to select the right outsourcing / supply chain partner who can understand not only quality, standards, delivery requirement but product applications and overall business environment. At the same time, timely and effective communication is the key.",
      "There are many options available in Asia Pacific however how to know the right option for you?",
      "Many times purchasing would want to buy / outsource components or change existing suppliers but not sure how to find a reliable source. We are locally based & can assist with solving supply chain challenges ensuring a quality and reliable supply of components at economical prices from our operation in India.",
      "Every business is different and have unique requirement. We work with you to understand the requirement and overall goals. Then, we can either supply components using our in-house facility or find a reliable manufacturer for a continuous, sustainable and resilient supply.",
      "We are flexible with volumes, are able to offer warehousing facilities if required.",
      "We have systems on place for Development & approval of patterns, jigs/fixtures, gauges and Material, dimensional testing & traceability",
    ],
    highlights: [
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
    ],
  },
  {
    title: "Refrigeration",
    source: "dezitechengineering.com/refrigeration.html",
    intro: "We have many years of experience in design of refrigeration systems and support customised design requirements.",
    body: [
      "Our engineers have hands on experience of working in Europe, UK, USA and India. We understand the business environment & challenges and are able to provide appropriate solutions. Being local, we are a phone call away.",
      "We have expertise in designing electrical and control systems.",
    ],
    highlights: [
      "Variety of refrigerants – conventional HCFCs to natural refrigerants (CO2, Propane, Ammonia)",
      "Range of applications – from process cooling to complex refrigeration processes",
      "Refrigeration temperatures – from +10 deg c to -80 deg c with precision control",
      "Evaporator / condenser coil designs for all refrigerants / refrigerant charge optimisation",
      "Electrical and control system design with detailed",
      "IoT and with AI/ML enabled data analytics",
      "3D modelling / 2d manufacturing drawing capability",
      "CAE / FEA analysis if required",
      "Condensing units, chillers, cold rooms, low temp. systems",
      "Electrical / control design engineering expertise",
      "Detailed control and power design / drawings",
      "IoT / Remote controller with two way communication",
      "AI / ML enables Data analytics platform",
      "Alerts: Performance / failures, power consumption analysis, trend analysis, forecasting",
      "Data logging / storage",
    ],
  },
  {
    title: "Heat Pumps",
    source: "dezitechengineering.com/heatpump.html",
    intro: "We design heat pump systems for all types of applications and provide supply chain support.",
    body: [
      "Our mission is to help our clients grow profitably. Our engineers have hands on experience of working in Europe, UK, USA and India. We understand business environment & challenges and are able to provide appropriate solutions in design of heat pumps.",
      "In addition, we have excellent understanding of global supply chain and are able to offer supply of heat pump components including sheet metal components from operation based in Asia pacific.",
      "We have expertise in designing electrical and control systems.",
    ],
    highlights: [
      "Variety of refrigerants – conventional HCFCs to natural refrigerants (CO2, Propane, Ammonia)",
      "Water temperatures: from 45 deg c to 85 deg c with precision control",
      "Understanding of water side/applications: residential, swimming pool, commercial, industrial",
      "Evaporator / condenser coil designs for all refrigerants / refrigerant charge optimisation",
      "Complete BoM for all the components",
      "Electrical and control system design with detailed",
      "IoT and with AI/ML enabled data",
      "3D modelling / 2D manufacturing drawing capability",
      "CAE / FEA analysis if required",
      "Electrical / control design engineering expertise",
      "Detailed control and power design / drawings",
      "IoT / Remote controller with two way communication",
      "AI / ML enables Data analytics platform",
      "Alerts: Performance / failures, power consumption analysis, trend analysis, forecasting",
      "Data logging / storage",
    ],
  },
];

const ServicesPage = () => {
  return (
      <Section
        eyebrow="Services"
        title="How we support Dezitech clients"
        description="Live copy imported from dezitechengineering.com across Engineering/Design, Manufacturing, Refrigeration, and Heat Pump pages."
        ambientProps={[
          {
            src: "/ambient/ambient-lines.svg",
            alt: "Ambient lines",
            className: "right-6 top-12 hidden w-60 opacity-20 md:block",
            speed: 0.05,
          },
          {
            src: "/ambient/ambient-grid.svg",
            alt: "Ambient grid",
            className: "left-10 bottom-10 hidden w-64 opacity-20 lg:block",
            speed: 0.04,
          },
        ]}
      >
          <div className="space-y-10">
            {services.map((service, index) => (
              <MotionReveal
                key={service.title}
                delay={index * 0.1}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_25px_60px_rgba(5,7,15,0.5)]"
                as="article"
              >
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{service.source}</p>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <MotionReveal as="p" splitText stagger={0.035} className="text-sm font-medium text-white/80">
                      {service.intro}
                    </MotionReveal>
                  </div>
                  <div className="mt-4 space-y-4 text-sm text-white/75">
                    {service.body.map((paragraph, paragraphIndex) => (
                      <MotionReveal
                        key={paragraph}
                        as="p"
                        direction="up"
                        distance={16}
                        duration={0.55}
                        delay={paragraphIndex * 0.04}
                        splitText
                      >
                        {paragraph}
                      </MotionReveal>
                    ))}
                  </div>
                {service.highlights?.length ? (
                  <ul className="mt-4 grid gap-2 text-sm text-white/85 md:grid-cols-2">
                      {service.highlights.map((item, highlightIndex) => (
                        <MotionReveal
                          as="li"
                          key={item}
                          delay={0.1 + highlightIndex * 0.05}
                          splitText
                          pop
                          className="interactive-card rounded-2xl border border-white/10 bg-white/5 px-4 py-2"
                        >
                          {item}
                        </MotionReveal>
                      ))}
                  </ul>
                ) : null}
              </MotionReveal>
            ))}
          </div>
      </Section>
  );
};

export default ServicesPage;
