"use client";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3">
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

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 text-sm text-gray-700">
            <Link href="/shows" className="hover:text-black transition">
              SHOWS
            </Link>
            <Link href="/videos" className="hover:text-black transition">
              WATCH
            </Link>
            <Link href="/actv" className="hover:text-black transition">
              ACTV
            </Link>
            <Link href="/community" className="hover:text-black transition">
              COMMUNITY
            </Link>
            <Link href="/about" className="hover:text-black transition">
              ABOUT
            </Link>
            <Link href="/partner" className="hover:text-black transition">
              PARTNERS
            </Link>
            <Link href="/contact" className="hover:text-black transition">
              CONTACT
            </Link>
            <Link href="/fan-wall" className="hover:text-black transition">
              FANS
            </Link>
          </nav>

        </div>
      </Container>
    </header>
  );
}