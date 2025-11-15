import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

const Section = ({ id, eyebrow, title, description, children, className = "" }: SectionProps) => {
  return (
    <section id={id} className={`px-6 py-14 ${className}`}>
      <div className="mx-auto max-w-6xl space-y-6">
        {(eyebrow || title || description) && (
          <div className="space-y-2">
            {eyebrow ? <p className="text-xs font-semibold uppercase text-gray-500">{eyebrow}</p> : null}
            {title ? <h2 className="text-2xl font-semibold text-gray-900">{title}</h2> : null}
            {description ? <p className="text-base text-gray-600">{description}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
