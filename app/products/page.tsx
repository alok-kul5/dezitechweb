import MotionReveal from "@/components/MotionReveal";
import ProductGrid from "@/components/ProductGrid";
import Section from "@/components/Section";

const productListings = [
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

const ProductsPage = () => {
  return (
      <Section
        eyebrow="Products"
        title="What we do"
        description="Copy sourced from the product listings on dezitechengineering.com."
      >
        <MotionReveal>
          <ProductGrid items={productListings} />
        </MotionReveal>
      </Section>
  );
};

export default ProductsPage;
