"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Tv,
  PlayCircle,
  Info,
  Notebook,
  Handshake,
  Mail,
  Settings
} from "lucide-react";

import { FaYoutube, FaDiscord } from "react-icons/fa";

import Container from "./Container";
import { createClient } from "@/src/lib/supabase/client";
import AccountDropdown from "./AccountDropdown";

const navLinks = [
  { href: "/shows", label: "SHOWS", icon: Tv },
  { href: "/videos", label: "WATCH", icon: PlayCircle },
  { href: "/about", label: "ABOUT", icon: Info  },
  { href: "/notes", label: "NOTES", icon: Notebook },
  { href: "/partners", label: "PARTNERS", icon: Handshake },
  { href: "/contact", label: "CONTACT", icon: Mail }
];

export default function Navbar() {
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isWorkspace, setIsWorkspace] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host.startsWith("workspace.")) setIsWorkspace(true);
    }

    async function loadUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role) setRole(data.role);
    }

    loadUser();
  }, []);

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/80 backdrop-blur-md">

      <Container>
        <div className="flex items-center justify-between h-16 w-full">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/ndo-logo.svg"
              alt="NDO Logo"
              width={28}
              height={28}
              priority
            />
            <span className="font-bold text-xl tracking-tight whitespace-nowrap">
              NDO
            </span>
          </Link>

          {/* CENTER NAV */}
          {!isWorkspace && (
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 text-sm font-medium text-gray-700">

              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 whitespace-nowrap hover:text-black transition"
                  >
                    <Icon size={17} className={link.color} />
                    {link.label}
                  </Link>
                );
              })}

              {(role === "admin" || role === "owner") && (
                <a
                  href="https://workspace.ndo.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-red-600 font-semibold"
                >
                  <Settings size={17} className="text-red-600" />
                  ADMIN
                </a>
              )}

            </nav>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5 shrink-0">

            {!isWorkspace && (
              <div className="hidden md:flex items-center gap-4">

                <a
                  title="NDO YouTube Channel"
                  href="https://youtube.com/@playwithndo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaYoutube size={18} className="hover:text-red-600" />
                </a>

                <a
                  title="NDO Discord Server"
                  href="https://discord.gg/3WkK9GUc8B"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaDiscord size={18} className="hover:text-indigo-600" />
                </a>

              </div>
            )}

            {user ? (
              <AccountDropdown />
            ) : (
              <Link
                href="/auth"
                className="bg-black text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition whitespace-nowrap"
              >
                Login
              </Link>
            )}

            {!isWorkspace && (
              <button
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}

          </div>

        </div>
      </Container>

      {/* MOBILE MENU */}
      {!isWorkspace && (
        <div
          className={`lg:hidden fixed inset-0 z-40 transition ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* MENU PANEL */}
          <div
            className={`absolute top-16 left-0 w-full bg-white shadow-xl transform transition-transform ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <nav className="flex flex-col p-6 gap-6 text-lg font-medium text-gray-800">

              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <Icon size={20} className={link.color} />
                    {link.label}
                  </Link>
                );
              })}

              {(role === "admin" || role === "owner") && (
                <a
                  href="https://workspace.ndo.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-green-600 font-semibold"
                >
                  <Settings size={20} className="text-green-600" />
                  Admin Portal
                </a>
              )}

              <a
                href="https://youtube.com/@playwithndo"
                className="flex items-center gap-3"
              >
                <FaYoutube size={22} className="text-red-600" />
                YouTube
              </a>

              <a
                href="https://discord.gg/3WkK9GUc8B"
                className="flex items-center gap-3"
              >
                <FaDiscord size={22} className="text-indigo-600" />
                Discord
              </a>

            </nav>
          </div>

        </div>
      )}
    </header>
  );
}