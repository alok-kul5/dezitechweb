"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useReducedMotion } from "./useReducedMotion";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/quality", label: "Quality" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const EASING: [number, number, number, number] = [0.2, 0.9, 0.2, 1];

const headerStates = {
  top: {
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderBottomColor: "rgba(15, 23, 42, 0)",
    boxShadow: "0 0 0 rgba(15, 23, 42, 0)",
    backdropFilter: "blur(0px)",
  },
  scrolled: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    borderBottomColor: "rgba(15, 23, 42, 0.08)",
    boxShadow: "0 15px 40px rgba(15, 23, 42, 0.08)",
    backdropFilter: "blur(16px)",
  },
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentState = isScrolled ? "scrolled" : "top";
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: EASING };

  return (
    <motion.header
      className="site-header"
      aria-label="Site header"
      initial="top"
      animate={prefersReducedMotion ? undefined : currentState}
      variants={prefersReducedMotion ? undefined : headerStates}
      transition={transition}
      style={prefersReducedMotion ? headerStates[currentState] : undefined}
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
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-center scale-x-0 rounded-full bg-neutral-900/60 transition-transform duration-250 ease-[cubic-bezier(.2,.9,.2,1)] group-hover:scale-x-100"
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
