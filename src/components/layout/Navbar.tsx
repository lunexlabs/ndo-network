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
  { href: "/about", label: "ABOUT", icon: Info },
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

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {

    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host.startsWith("workspace.")) setIsWorkspace(true);
    }

    /* ---------------------------
       LOAD SESSION IMMEDIATELY
    --------------------------- */

    async function loadSession() {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        setLoadingUser(false);
        return;
      }

      const user = session.user;
      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role) setRole(data.role);

      setLoadingUser(false);
    }

    loadSession();

    /* ---------------------------
       LISTEN FOR LOGIN / LOGOUT
    --------------------------- */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }

    });

    return () => subscription.unsubscribe();

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
              width={26}
              height={26}
              priority
            />

            <span className="font-bold text-lg tracking-tight whitespace-nowrap">
              NDO
            </span>

          </Link>


          {/* CENTER NAV */}

          {!isWorkspace && (

            <nav className="hidden lg:flex flex-1 items-center justify-center gap-7 text-xs font-medium text-gray-700">

              {navLinks.map((link) => {

                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1.5 whitespace-nowrap hover:text-black transition"
                  >
                    <Icon size={15} />
                    {link.label}
                  </Link>
                );

              })}


            </nav>

          )}


          {/* RIGHT SIDE */}

          <div className="flex items-center gap-5 shrink-0">

            {/* SOCIAL ICONS */}

            {!isWorkspace && (

              <div className="hidden md:flex items-center gap-4">

                <a
                  title="NDO YouTube Channel"
                  href="https://youtube.com/@playwithndo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaYoutube size={17} className="hover:text-red-600 transition" />
                </a>

                <a
                  title="NDO Discord Server"
                  href="https://discord.gg/3WkK9GUc8B"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaDiscord size={17} className="hover:text-indigo-600 transition" />
                </a>

              </div>

            )}


            {/* ACCOUNT AREA */}

            {loadingUser ? null : user ? (
              <AccountDropdown />
            ) : (
              <Link
                href="/auth"
                className="bg-black text-white px-3 py-1.5 rounded-md text-xs hover:opacity-90 transition whitespace-nowrap"
              >
                Login
              </Link>
            )}


            {/* MOBILE MENU */}

            {!isWorkspace && (
              <button
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
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

          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

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
                    <Icon size={20} />
                    {link.label}
                  </Link>
                );

              })}

            </nav>

          </div>

        </div>

      )}

    </header>
  );
}