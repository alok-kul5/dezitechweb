"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cinematicMotion } from "@/motion.config";
import {
  Children,
  ElementType,
  ReactElement,
  ReactNode,
  isValidElement,
} from "react";

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
  splitBy?: "word" | "char" | "line";
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
  distance = cinematicMotion.section.distance,
  delay = 0,
  duration = cinematicMotion.section.duration,
  stagger = 0,
  once = true,
  amount = cinematicMotion.section.amount,
  as = "div",
  fadeOnly = false,
  splitText = false,
  splitBy = "word",
  pop = false,
  disableWhileInView = false,
  variant,
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
  const baseVisible: Record<string, number> = fadeOnly
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0 };

  if (pop) {
    baseInitial.scale = cinematicMotion.pop.scaleFrom;
    baseVisible.scale = 1;
  }

  const resolvedStagger =
    splitText && stagger === 0 ? (splitBy === "line" ? 0.12 : 0.065) : stagger;
  const hasStagger = shouldAnimate && (resolvedStagger > 0 || splitText);

  const containerVariants = hasStagger
    ? { hidden: {}, visible: {} }
    : { hidden: baseInitial, visible: baseVisible };
  const childVariants = { hidden: baseInitial, visible: baseVisible };

  const transition = {
    duration,
    delay,
    ease: cinematicMotion.ease,
    ...(hasStagger
      ? {
          staggerChildren: resolvedStagger,
          delayChildren: delay,
        }
      : {}),
  };

  const motionTagMap = motion as unknown as Record<string, typeof motion.div>;
  const MotionComponent = motionTagMap[as] ?? motion.div;

  const tokenizeString = (value: string) => {
    if (splitBy === "char") {
      return value.split("").map((token) => ({ token, isSpace: !token.trim(), isBreak: false }));
    }
    if (splitBy === "line") {
      const lines = value.split(/\r?\n/);
      return lines.flatMap((line, idx) => {
        const entries = [{ token: line, isSpace: false, isBreak: false }];
        if (idx < lines.length - 1) {
          entries.push({ token: "", isSpace: false, isBreak: true });
        }
        return entries;
      });
    }
    return value.split(/(\s+)/).map((token) => ({
      token,
      isSpace: !token.trim(),
      isBreak: false,
    }));
  };

  const renderChildren = () => {
    if (!hasStagger) {
      return children;
    }

    return Children.map(children, (child, index) => {
      if (!isValidElement(child)) {
        const key = `motion-reveal-node-${index}`;
        if (splitText && typeof child === "string") {
          return tokenizeString(child).map(({ token, isSpace, isBreak }, tokenIndex) => {
            const tokenKey = `${key}-token-${tokenIndex}`;
            if (isBreak) {
              return <br key={`${tokenKey}-break`} />;
            }
            if (isSpace) {
              return (
                <span key={tokenKey} aria-hidden="true">
                  {token}
                </span>
              );
            }
            return (
              <motion.span
                key={tokenKey}
                style={{ display: splitBy === "line" ? "block" : "inline-block" }}
                variants={childVariants}
                data-motion-reveal-split
              >
                {token}
              </motion.span>
            );
          });
        }

        return (
          <motion.span
            key={key}
            style={{ display: "inline-block" }}
            variants={childVariants}
            data-motion-reveal-child
          >
            {child}
          </motion.span>
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

  if (!shouldAnimate) {
    return (
      <MotionComponent className={className} data-motion-variant={variant} {...rest}>
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={className}
      data-motion-variant={variant}
      initial="hidden"
      animate={disableWhileInView ? "visible" : undefined}
      whileInView={!disableWhileInView ? "visible" : undefined}
      viewport={!disableWhileInView ? { once, amount } : undefined}
      variants={containerVariants}
      transition={transition}
      {...rest}
    >
      {renderChildren()}
    </MotionComponent>
  );
};

export default MotionReveal;
