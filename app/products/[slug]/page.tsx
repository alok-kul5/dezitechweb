import Section from "@/components/Section";

type ProductDetailPageProps = {
  params: { slug: string };
};

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const readableSlug = params.slug.replace(/-/g, " ");

  return (
    <Section
      eyebrow="Product Detail"
      title={readableSlug.replace(/\b\w/g, (char) => char.toUpperCase())}
      description="Detailed specifications, media, and storytelling will arrive in Phase 3."
    >
      <p className="text-sm text-gray-600">Individual product narrative placeholder for {params.slug}.</p>
    </Section>
  );
};

export default ProductDetailPage;
