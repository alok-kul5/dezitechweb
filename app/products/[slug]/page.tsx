import Section from "@/components/Section";

type ProductDetail = {
  title: string;
  excerpt: string;
  body: string[];
};

const productDetails: Record<string, ProductDetail> = {
  "engineering-design": {
    title: "Engineering and design",
    excerpt: "Engineering resources, design, 3D modelling, CAE/FEA",
    body: [
      "WE PROVIDE TECHNICAL RESOURCES AND EXPERTISE AND SOLVE TECHNICAL CHALLANGES",
      "We solve technical challenges and provide resources to get new products faster to the market.",
      "New products need to be introduced ahead of the competition. Any delay means loosing business and money. Our engineers have many years of worldwide experience in New product development. As such we understand the business environment and challenges in New Product development.",
    ],
  },
  refrigeration: {
    title: "Refrigeration",
    excerpt: "Design of refrigeration systems and component supply",
    body: [
      "We have many years of experience in design of refrigeration systems and support customised design requirements.",
      "Our engineers have hands on experience of working in Europe, UK, USA and India. We understand the business environment & challenges and are able to provide appropriate solutions. Being local, we are a phone call away.",
    ],
  },
  "heat-pump": {
    title: "Heat pump",
    excerpt: "Heat pump design and components supply",
    body: [
      "We design heat pump systems for all types of applications and provide supply chain support.",
      "Our mission is to help our clients grow profitably. Our engineers have hands on experience of working in Europe, UK, USA and India. We understand business environment & challenges and are able to provide appropriate solutions in design of heat pumps.",
    ],
  },
  "engineering-supply-chain": {
    title: "Engineering Supply chain",
    excerpt: "Cost effective & reliable components supply with excellent quality",
    body: [
      "Buy high quality engineering components / products reliably from Asia Pacific to remain Competitive and grow profitably.",
      "We are locally based & can assist with solving supply chain challenges ensuring a quality and reliable supply of components at economical prices from our operation in India.",
    ],
  },
};

type ProductDetailPageProps = {
  params: { slug: string };
};

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const detail = productDetails[params.slug];
  const fallbackTitle = params.slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Section
      eyebrow="Product Detail"
      title={detail?.title ?? fallbackTitle}
      description={detail?.excerpt ?? "Detailed specifications will follow in upcoming phases."}
    >
      <div className="space-y-4 text-sm text-gray-700">
        {detail?.body?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        )) || <p>Additional detail will be published for this product soon.</p>}
      </div>
      <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
        TODO: Add imagery and specifications for {detail?.title ?? fallbackTitle}.
      </div>
    </Section>
  );
};

export default ProductDetailPage;
