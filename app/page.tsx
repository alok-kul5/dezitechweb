import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Section from "@/components/Section";

const featuredProducts = [
  {
    title: "High-Precision Machining",
    summary: "Micron-level accuracy for complex geometries.",
    href: "/products/high-precision-machining",
  },
  {
    title: "Systems Integration",
    summary: "Mechanical and electronic integration under one roof.",
    href: "/products/systems-integration",
  },
  {
    title: "Custom Fabrication",
    summary: "Purpose-built tooling and fixtures.",
    href: "/products/custom-fabrication",
  },
];

const capabilityHighlights = [
  "Advanced manufacturing",
  "Integrated engineering",
  "Supply chain stewardship",
];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Dezitech Engineering"
        title="Modern engineering solutions with a premium, confident presence."
        description="Phase 1 focuses on clean scaffolding so every page, component, and layout is wired before detailed visuals arrive."
        primaryCta={{ label: "Explore Products", href: "/products" }}
        secondaryCta={{ label: "Our Services", href: "/services" }}
      />

      <Section
        eyebrow="Overview"
        title="About Dezitech Engineering"
        description="This block will evolve into a scroll-reveal introduction, mirroring the refined storytelling from the reference sites."
      >
        <p className="text-sm text-gray-600">
          Placeholder narrative ensures we keep the current content structure intact while building the foundation.
        </p>
      </Section>

      <Section
        eyebrow="Products"
        title="Featured Product Lines"
        description="Cards, hover states, and smooth animations will be layered once we enter Phase 3."
      >
        <ProductGrid items={featuredProducts} />
      </Section>

      <Section
        eyebrow="Capabilities"
        title="Capabilities Snapshot"
        description="Future version will mirror the depth and pacing of the inspiration links."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {capabilityHighlights.map((capability) => (
            <div
              key={capability}
              className="rounded-2xl border border-dashed border-gray-200 p-4 text-sm text-gray-700"
            >
              {capability}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Get in touch"
        title="Ready for Phase 2"
        description="CTA ribbons and reveal animations will be added after the design system is established."
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700">
          Contact details and primary CTAs will live here. For now, it signals the structure we will enhance soon.
        </div>
      </Section>
    </>
  );
}
