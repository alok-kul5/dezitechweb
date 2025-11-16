"use client";

import { motionConfig } from "@/motion.config";

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
  pop?: boolean;
  disableWhileInView?: boolean;
  variant?: "dark" | "light";
} & HTMLMotionProps<"div">;

const MIN_DISTANCE = 12;
const MAX_DISTANCE = 36;

const MotionReveal = ({
  children,
  className,
  direction = "up",
  distance = motionConfig.section.distance,
  delay = 0,
  duration = motionConfig.section.dur,
  stagger = motionConfig.section.stagger,
  once = true,
  amount = 0.2,
  as = "div",
  fadeOnly = false,
  splitText = false,
  splitBy = "word",
  pop = false,
  disableWhileInView = false,
  variant = "dark",
  style,
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

    const baseInitial: Record<string, number> = fadeOnly
    ? { opacity: 0 }
    : { opacity: 0, ...(offsets[direction] ?? {}) };
    const variantTokens = {
      dark: { opacity: 1, filter: "drop-shadow(0 28px 65px rgba(3,6,15,0.45))" },
      light: { opacity: 0.98, filter: "drop-shadow(0 24px 55px rgba(15,23,36,0.18))" },
    } as const;
    const variantStyle = variantTokens[variant] ?? variantTokens.dark;
    const baseVisible: Record<string, number> = fadeOnly
      ? { opacity: variantStyle.opacity }
      : { opacity: variantStyle.opacity, x: 0, y: 0 };

    if (pop) {
      baseInitial.scale = motionConfig.pop.scaleIn[0];
      baseVisible.scale = motionConfig.pop.scaleIn[1];
  }

    const resolvedStagger = splitText ? stagger || motionConfig.hero.wordStagger : stagger;
  const hasStagger = shouldAnimate && (resolvedStagger > 0 || splitText);

  const containerVariants = hasStagger
    ? { hidden: {}, visible: {} }
    : { hidden: baseInitial, visible: baseVisible };
  const childVariants = { hidden: baseInitial, visible: baseVisible };

    const transition = shouldAnimate
    ? {
        duration,
        delay,
          ease: motionConfig.ease,
        ...(hasStagger
          ? {
              staggerChildren: resolvedStagger,
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
          <motion.span
            key={key}
            style={{ display: "inline-block" }}
            variants={childVariants}
            data-motion-reveal-child
          >
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

    const combinedStyle = {
      ...(style ?? {}),
      ...(pop
        ? {
            filter: [style?.filter, variantStyle.filter].filter(Boolean).join(" ") || variantStyle.filter,
          }
        : {}),
    };

    return (
      <MotionComponent
        className={className}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={disableWhileInView && shouldAnimate ? "visible" : undefined}
        whileInView={!disableWhileInView && shouldAnimate ? "visible" : undefined}
        viewport={shouldAnimate && !disableWhileInView ? { once, amount } : undefined}
        variants={shouldAnimate ? containerVariants : undefined}
        transition={transition}
        style={combinedStyle}
        {...rest}
      >
        {renderChildren()}
      </MotionComponent>
    );
};

export default MotionReveal;
