import Link from "next/link";

import MotionReveal from "./MotionReveal";

export type ProductCardProps = {
  title: string;
  summary?: string;
  href: string;
};

const ProductCard = ({ title, summary, href }: ProductCardProps) => {
  return (
    <MotionReveal
      as="article"
      className="group flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)] will-change-transform hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_30px_55px_rgba(15,23,42,0.12)]"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {summary ? <p className="mt-3 text-sm text-gray-600">{summary}</p> : null}
      </div>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gray-900 transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] group-hover:gap-2"
      >
        <span>View details</span>
        <span aria-hidden="true" className="transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)] group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </MotionReveal>
  );
};

export default ProductCard;
