"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import Container from "./Container";
import { createClient } from "@/src/lib/supabase/client";
import AccountDropdown from "./AccountDropdown";

const navLinks = [
  { href: "/shows", label: "SHOWS" },
  { href: "/videos", label: "WATCH" },
  { href: "/about", label: "ABOUT" },
  { href: "/notes", label: "NOTES" },
    { href: "/partners", label: "PARTNERS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role) {
        setRole(data.role);
      }
    }

    loadUser();
  }, []);

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-black transition"
              >
                {link.label}
              </Link>
            ))}

            {/* ADMIN LINK */}
            {(role === "admin" || role === "owner") && (
              <Link
                href="/ndo-admin-portal"
                className="text-green-600 font-semibold hover:text-black transition"
              >
                ADMIN Portal
              </Link>
            )}

          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Account / Login */}
            {user ? (
              <AccountDropdown />
            ) : (
              <Link
                href="/auth"
                className="bg-black text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu */}
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
              >
                {link.label}
              </Link>
            ))}

            {(role === "admin" || role === "owner") && (
              <Link
                href="/ndo-admin-portal"
                onClick={() => setIsOpen(false)}
                className="text-purple-600 font-semibold"
              >
                Admin Portal
              </Link>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
}