import ProductCard, { ProductCardProps } from "./ProductCard";

type ProductGridProps = {
  items: ProductCardProps[];
  emptyLabel?: string;
  tone?: "dark" | "light";
};

const ProductGrid = ({ items, emptyLabel = "Product details coming soon.", tone = "dark" }: ProductGridProps) => {
  if (!items.length) {
    return <p className="text-sm text-gray-500">{emptyLabel}</p>;
  }

  return (
    <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <ProductCard key={item.href} {...item} motionDelay={index * 0.05} tone={tone} />
      ))}
    </div>
  );
};

export default ProductGrid;
