"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGroup,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

import { useReducedMotion } from "./useReducedMotion";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/quality", label: "Quality" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const AnimatedHeader = () => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const progress = useTransform(scrollY, [0, 120], [0, 1]);
  const backgroundOpacity = useTransform(progress, [0, 1], [0.02, 0.92]);
  const borderOpacity = useTransform(progress, [0, 1], [0, 0.3]);
  const shadowOpacity = useTransform(progress, [0, 1], [0, 0.2]);
  const blurAmount = useTransform(progress, [0, 1], [0, 18]);
  const paddingY = useTransform(progress, [0, 1], [28, 16]);
  const translateY = useTransform(progress, [0, 1], [0, -12]);
  const scale = useTransform(progress, [0, 1], [1, 0.97]);

  const motionStyle = prefersReducedMotion
    ? {}
    : {
        backgroundColor: useMotionTemplate`rgba(255 255 255 / ${backgroundOpacity})`,
        borderBottomColor: useMotionTemplate`rgba(255 255 255 / ${borderOpacity})`,
        boxShadow: useMotionTemplate`0 25px 45px rgba(5, 7, 15, ${shadowOpacity})`,
        backdropFilter: useMotionTemplate`blur(${blurAmount}px)`,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        y: translateY,
        scale,
      };

  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname?.startsWith(href);

  return (
    <motion.header
      className="site-header sticky top-0 z-50 px-6"
      style={motionStyle}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: -24 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.6, ease: [0.21, 0.8, 0.32, 1], delay: 0.2 }
      }
    >
      <div className="container flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-white"
        >
          Dezitech Engineering
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <LayoutGroup id="animated-header-nav">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative inline-flex items-center gap-1 py-3 text-white/70 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
                >
                  <span>{link.label}</span>
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-dezitech-400 via-dezitech-500 to-emerald-200"
                      transition={{ duration: 0.26, ease: [0.21, 0.8, 0.32, 1] }}
                    />
                  ) : null}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-3 bottom-0 h-px rounded-full bg-white/20"
                    initial={false}
                    animate={{
                      opacity: active ? 0 : 0.4,
                      scaleX: active ? 1 : 0,
                    }}
                    transition={{ duration: 0.28, ease: [0.21, 0.8, 0.32, 1] }}
                  />
                </Link>
              );
            })}
          </LayoutGroup>
        </nav>

          <Link
            href="/contact"
            className="interactive-cta inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          >
            ENGAGE
          </Link>
      </div>
    </motion.header>
  );
};

export default AnimatedHeader;
