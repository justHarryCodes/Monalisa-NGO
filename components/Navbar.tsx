"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Heart, Bell, LogOut, User, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, userProfile, logout } = useAuth();

  // Hide Navbar entirely on auth pages (they have their own full-screen layout)
  const isAuthRoute = pathname.startsWith("/auth/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  if (isAuthRoute) return null;

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <Image src="/logo.png" alt="MLSI Foundation" fill className="object-contain" />
          </div>
          <div className="hidden sm:block">
            <p className={`font-bold text-sm leading-tight ${scrolled || !isHome ? "text-[#1F2937]" : "text-white"}`}>
              Mona Lisa Smile
            </p>
            <p className={`text-xs leading-tight ${scrolled || !isHome ? "text-[#2563EB]" : "text-blue-200"}`}>
              Indigents Foundation
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-[#2563EB] bg-blue-50"
                  : scrolled || !isHome
                  ? "text-[#1F2937] hover:text-[#2563EB] hover:bg-blue-50"
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="hidden sm:flex items-center gap-2 bg-[#DC2626] hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Heart className="w-4 h-4" />
            Donate Now
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled || !isHome ? "text-[#1F2937] hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
              >
                <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {userProfile?.displayName?.[0] || user.email?.[0] || "U"}
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#1F2937]">{userProfile?.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 capitalize">{userProfile?.role || "member"}</p>
                    </div>
                    <div className="py-1">
                      {(userProfile?.role === "admin" || userProfile?.role === "volunteer") && (
                        <Link
                          href={userProfile?.role === "admin" ? "/admin" : "/volunteer"}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-[#1F2937] hover:bg-blue-50 hover:text-[#2563EB]"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      )}
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[#1F2937] hover:bg-blue-50 hover:text-[#2563EB]"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className={`hidden sm:block text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
                scrolled || !isHome
                  ? "border-[#2563EB] text-[#2563EB] hover:bg-blue-50"
                  : "border-white text-white hover:bg-white/10"
              }`}
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHome ? "text-[#1F2937] hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#2563EB] bg-blue-50"
                      : "text-[#1F2937] hover:text-[#2563EB] hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/donate"
                  className="flex items-center justify-center gap-2 bg-[#DC2626] text-white px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  <Heart className="w-4 h-4" />
                  Donate Now
                </Link>
                {!user && (
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center border border-[#2563EB] text-[#2563EB] px-4 py-3 rounded-lg text-sm font-semibold"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
