import Link from "next/link";

export type ProductCardProps = {
  title: string;
  summary?: string;
  href: string;
};

const ProductCard = ({ title, summary, href }: ProductCardProps) => {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {summary ? <p className="mt-3 text-sm text-gray-600">{summary}</p> : null}
      </div>
      <Link href={href} className="mt-6 text-sm font-medium text-gray-900">
        View details →
      </Link>
    </article>
  );
};

export default ProductCard;
