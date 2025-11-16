import ProductCard, { ProductCardProps } from "./ProductCard";

type ProductGridProps = {
  items: ProductCardProps[];
  emptyLabel?: string;
};

const ProductGrid = ({ items, emptyLabel = "Product details coming soon." }: ProductGridProps) => {
  if (!items.length) {
    return <p className="text-sm text-[var(--tone-muted)]">{emptyLabel}</p>;
  }

  return (
    <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <ProductCard key={item.href} {...item} motionDelay={index * 0.05} />
      ))}
    </div>
  );
};

export default ProductGrid;
