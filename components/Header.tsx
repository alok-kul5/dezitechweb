"use client";

import Link from "next/link";
import {
  LayoutGroup,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";

import { useReducedMotion } from "./useReducedMotion";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/quality", label: "Quality" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const NAV_EASE: [number, number, number, number] = [0.2, 0.9, 0.2, 1];

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const scrollProgress = useSpring(useTransform(scrollY, [0, 120], [0, 1]), {
    stiffness: 200,
    damping: 28,
    mass: 0.8,
  });

  const paddingTop = useTransform(scrollProgress, [0, 1], [24, 14]);
  const paddingBottom = useTransform(scrollProgress, [0, 1], [24, 14]);
  const backgroundOpacity = useTransform(scrollProgress, [0, 1], [0.35, 0.95]);
  const backgroundColor = useMotionTemplate`rgba(255 255 255 / ${backgroundOpacity})`;
  const borderBottomColor = useTransform(
    scrollProgress,
    (value) => `rgba(15, 23, 42, ${value * 0.16})`,
  );
  const boxShadow = useTransform(
    scrollProgress,
    (value) => `0 25px 60px rgba(15, 23, 42, ${value * 0.16})`,
  );
  const backdropFilter = useTransform(
    scrollProgress,
    (value) => `blur(${value * 20}px)`,
  );
  const navOpacity = useTransform(scrollProgress, [0, 1], [1, 0.85]);
  const gradientIntensity = useTransform(scrollProgress, [0, 1], [0, 0.6]);
  const headerOffset = useTransform(scrollProgress, [0, 1], [0, -12]);

  const motionStyle = prefersReducedMotion
    ? {
        paddingTop: 24,
        paddingBottom: 24,
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderBottomColor: "rgba(15, 23, 42, 0)",
        boxShadow: "none",
        backdropFilter: "blur(0px)",
      }
      : {
          paddingTop,
          paddingBottom,
          backgroundColor,
          borderBottomColor,
          boxShadow,
          backdropFilter,
          y: headerOffset,
        };

  const handlePointerEnter = (href: string) => setHoveredLink(href);
  const resetHover = () => setHoveredLink(null);

  return (
      <motion.header
        className="site-header sticky top-0 z-50"
      aria-label="Site header"
      style={motionStyle}
      initial={prefersReducedMotion ? undefined : { y: -32, opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.85, delay: 0.45, ease: NAV_EASE }
      }
    >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/90 via-white/80 to-white/40"
          style={{ opacity: navOpacity }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(79,209,197,0.45),_transparent_70%)]"
          style={{ opacity: gradientIntensity }}
        />
      <div className="container flex items-center justify-between gap-4">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.7, delay: 0.55, ease: NAV_EASE }
          }
        >
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-tight text-neutral-900"
          >
            Dezitech Engineering
          </Link>
        </motion.div>

        <motion.nav
          className="hidden items-center gap-6 text-sm font-medium text-neutral-900/80 md:flex"
          aria-label="Primary"
          style={{ opacity: prefersReducedMotion ? 1 : navOpacity }}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.7, delay: 0.65, ease: NAV_EASE }
          }
        >
          <LayoutGroup id="header-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative inline-flex items-center gap-1 py-2 text-neutral-900/70 transition-colors duration-200 ease-out hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900/40"
                onMouseEnter={() => handlePointerEnter(link.href)}
                onMouseLeave={resetHover}
                onFocus={() => handlePointerEnter(link.href)}
                onBlur={resetHover}
              >
                <span>{link.label}</span>
                  {hoveredLink === link.href ? (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-dezitech-400 via-dezitech-500 to-emerald-200"
                      initial={false}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.35,
                        ease: NAV_EASE,
                      }}
                    />
                  ) : null}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-neutral-900/40"
                  initial={false}
                  animate={{
                    scaleX: hoveredLink === link.href ? 1 : 0,
                    opacity: hoveredLink === link.href ? 0 : 0.4,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    ease: NAV_EASE,
                  }}
                />
              </Link>
            ))}
          </LayoutGroup>
        </motion.nav>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.7, delay: 0.75, ease: NAV_EASE }
          }
        >
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-dezitech-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-[420ms] ease-[cubic-bezier(.21,.8,.32,1)] hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-dezitech-600 hover:shadow-[0_20px_38px_rgba(200,16,46,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dezitech-500"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
