"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/quality", label: "Quality" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStateClass = isScrolled ? "scrolled" : "at-top";

  return (
    <header className={`site-header ${headerStateClass}`} aria-label="Site header">
      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-neutral-900">
          Dezitech Engineering
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-900/80 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-neutral-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-full bg-dezitech-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-dezitech-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dezitech-500"
        >
          Contact
        </Link>
      </div>
    </header>
  );
};

export default Header;
