import ProductGrid from "@/components/ProductGrid";
import Section from "@/components/Section";

const placeholderProducts = [
  { title: "Precision Components", summary: "High tolerance manufacturing for mission critical systems.", href: "/products/precision-components" },
  { title: "Integrated Assemblies", summary: "Turnkey engineering assemblies crafted for reliability.", href: "/products/integrated-assemblies" },
  { title: "Custom Tooling", summary: "Purpose-built tooling tailored to each engagement.", href: "/products/custom-tooling" },
];

const ProductsPage = () => {
  return (
    <Section
      eyebrow="Products"
      title="Product Portfolio"
      description="Grid layout and interactive states will be refined during Phase 3."
    >
      <ProductGrid items={placeholderProducts} />
    </Section>
  );
};

export default ProductsPage;
