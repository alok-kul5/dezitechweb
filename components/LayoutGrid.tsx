import { ReactNode } from "react";

type LayoutGridProps = {
  left: ReactNode;
  right?: ReactNode;
  className?: string;
  gapClassName?: string;
};

const LayoutGrid = ({ left, right, className, gapClassName = "gap-10" }: LayoutGridProps) => {
  const wrapperClass = ["mx-auto w-full max-w-[1200px] px-6", className].filter(Boolean).join(" ");
  const gridClass = ["grid lg:grid-cols-12", gapClassName].filter(Boolean).join(" ");

  return (
    <div className={wrapperClass}>
      <div className={gridClass}>
        <div className="lg:col-span-7">{left}</div>
        {right ? <div className="mt-10 lg:col-span-5 lg:mt-0">{right}</div> : null}
      </div>
    </div>
  );
};

export default LayoutGrid;
