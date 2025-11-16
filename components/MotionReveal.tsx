"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { Children, ElementType, ReactElement, ReactNode, isValidElement } from "react";

import { useReducedMotion } from "./useReducedMotion";

type Direction = "up" | "down" | "left" | "right";

type MotionRevealProps = {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
  as?: keyof HTMLElementTagNameMap;
  fadeOnly?: boolean;
  splitText?: boolean;
  splitBy?: "word" | "char";
} & HTMLMotionProps<"div">;

const easing: [number, number, number, number] = [0.2, 0.9, 0.2, 1];
const MIN_DISTANCE = 18;
const MAX_DISTANCE = 28;

const MotionReveal = ({
  children,
  className,
  direction = "up",
  distance = 22,
  delay = 0,
  duration = 0.65,
  stagger = 0,
  once = true,
  amount = 0.16,
  as = "div",
  fadeOnly = false,
  splitText = false,
  splitBy = "word",
  ...rest
}: MotionRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  const clampedDistance = Math.min(Math.max(distance, MIN_DISTANCE), MAX_DISTANCE);
  const offsets: Record<Direction, { x?: number; y?: number }> = {
    up: { y: clampedDistance },
    down: { y: -clampedDistance },
    left: { x: clampedDistance },
    right: { x: -clampedDistance },
  };

  const baseInitial = fadeOnly ? { opacity: 0 } : { opacity: 0, ...offsets[direction] };
  const baseVisible = fadeOnly ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };

  const resolvedStagger = splitText && stagger === 0 ? 0.045 : stagger;
  const hasStagger = shouldAnimate && (resolvedStagger > 0 || splitText);

  const containerVariants = hasStagger ? { hidden: {}, visible: {} } : { hidden: baseInitial, visible: baseVisible };
  const childVariants = { hidden: baseInitial, visible: baseVisible };

  const transition = shouldAnimate
    ? {
        duration,
        delay,
        ease: easing,
        ...(hasStagger
          ? {
              staggerChildren: resolvedStagger || 0.045,
              delayChildren: delay,
            }
          : {}),
      }
    : { duration: 0 };

  const motionTagMap = motion as unknown as Record<string, typeof motion.div>;
  const MotionComponent = motionTagMap[as] ?? motion.div;

  const tokenizeString = (value: string) => {
    if (splitBy === "char") {
      return value.split("");
    }
    return value.split(/(\s+)/);
  };

  const renderChildren = () => {
    if (!hasStagger) {
      return children;
    }

    return Children.map(children, (child, index) => {
      if (!isValidElement(child)) {
        const key = `motion-reveal-node-${index}`;
        if (splitText && typeof child === "string" && shouldAnimate) {
          return tokenizeString(child).map((token, tokenIndex) => {
            const tokenKey = `${key}-token-${tokenIndex}`;
            if (!token.trim()) {
              return (
                <span key={tokenKey} aria-hidden="true">
                  {token}
                </span>
              );
            }
            return (
              <motion.span
                key={tokenKey}
                style={{ display: "inline-block" }}
                variants={childVariants}
                data-motion-reveal-split
              >
                {token}
              </motion.span>
            );
          });
        }

        return shouldAnimate ? (
          <motion.span key={key} style={{ display: "inline-block" }} variants={childVariants}>
            {child}
          </motion.span>
        ) : (
          child
        );
      }

      const element = child as ReactElement;
      const Component = element.type as ElementType;
      const AnimatedChild = motion(Component);

      return (
        <AnimatedChild
          key={child.key ?? index}
          {...(element.props as Record<string, unknown>)}
          variants={childVariants}
          data-motion-reveal-child
        />
      );
    });
  };

  return (
    <MotionComponent
      className={className}
      initial={shouldAnimate ? "hidden" : undefined}
      whileInView={shouldAnimate ? "visible" : undefined}
      viewport={shouldAnimate ? { once, amount } : undefined}
      variants={shouldAnimate ? containerVariants : undefined}
      transition={transition}
      {...rest}
    >
      {renderChildren()}
    </MotionComponent>
  );
};

export default MotionReveal;
