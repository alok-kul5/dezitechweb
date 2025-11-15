import { ReactNode } from "react";

import MotionReveal from "./MotionReveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

const Section = ({ id, eyebrow, title, description, children, className = "" }: SectionProps) => {
  const hasHeading = Boolean(eyebrow || title || description);

  return (
    <section id={id} className={`px-6 py-14 ${className}`}>
      <div className="mx-auto max-w-6xl space-y-6">
        {hasHeading ? (
          <MotionReveal
            as="div"
            className="space-y-2"
            direction="up"
            distance={20}
            duration={0.6}
            stagger={0.06}
            amount={0.2}
          >
            {eyebrow ? <p className="text-xs font-semibold uppercase text-gray-500">{eyebrow}</p> : null}
            {title ? <h2 className="text-2xl font-semibold text-gray-900">{title}</h2> : null}
            {description ? <p className="text-base text-gray-600">{description}</p> : null}
          </MotionReveal>
        ) : null}
        {children}
      </div>
    </section>
  );
};

export default Section;
