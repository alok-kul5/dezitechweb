"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
  const backgroundColor = useTransform(scrollProgress, (value) => `rgba(255, 255, 255, ${value * 0.9})`);
  const borderBottomColor = useTransform(scrollProgress, (value) => `rgba(15, 23, 42, ${value * 0.12})`);
  const boxShadow = useTransform(scrollProgress, (value) => `0 25px 60px rgba(15, 23, 42, ${value * 0.14})`);
  const backdropFilter = useTransform(scrollProgress, (value) => `blur(${value * 18}px)`);

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
      };

  const handlePointerEnter = (href: string) => setHoveredLink(href);
  const resetHover = () => setHoveredLink(null);

  return (
    <motion.header
      className="site-header"
      aria-label="Site header"
      style={motionStyle}
    >
      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-neutral-900">
          Dezitech Engineering
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-900/80 md:flex" aria-label="Primary">
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
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-1 bottom-0 h-[2px] origin-left rounded-full bg-neutral-900/70"
                initial={false}
                animate={{
                  scaleX: hoveredLink === link.href ? 1 : 0,
                  opacity: hoveredLink === link.href ? 1 : 0,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: NAV_EASE }}
              />
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-dezitech-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-dezitech-600 hover:shadow-[0_18px_35px_rgba(200,16,46,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dezitech-500"
        >
          Contact
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;
