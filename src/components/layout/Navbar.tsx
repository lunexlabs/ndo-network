"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/shows", label: "SHOWS" },
  { href: "/videos", label: "WATCH" },
  { href: "/actv", label: "ACTV" },
  { href: "/community", label: "COMMUNITY" },
  { href: "/about", label: "ABOUT" },
  { href: "/partner", label: "PARTNERS" },
  { href: "/contact", label: "CONTACT" },
  { href: "/fan-wall", label: "FANS" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/ndo-logo.svg"
              alt="NDO Logo"
              width={28}
              height={28}
              priority
              className="object-contain"
            />
            <span className="font-bold text-xl tracking-tight">
              NDO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-black transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Slide Down Menu */}
        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-xl transform transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <nav className="flex flex-col p-6 gap-6 text-lg font-medium text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-black transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}