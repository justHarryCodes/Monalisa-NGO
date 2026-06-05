"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Heart, Phone, Mail, MapPin,
  Send, MessageCircle
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Programs", href: "/programs" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get Involved", href: "/get-involved" },
];

const programs = [
  { label: "Back-to-School Project", href: "/programs#back-to-school" },
  { label: "Welfare & Relief Services", href: "/programs#welfare" },
  { label: "Community Care Services", href: "/programs#community" },
];

const phones = ["+2347089931056", "+2348158037716", "+2349137874677", "+2348157037716"];

// Routes where the public footer should not appear
const HIDDEN_ROUTES = ["/auth/login", "/auth/register", "/admin", "/dashboard", "/volunteer"];

export default function Footer() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    return null;
  }

  return (
    <footer className="bg-[#0f172a] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14">
                <Image src="/logo.png" alt="MLSI Foundation" fill className="object-contain" />
              </div>
              <div>
                <p className="font-bold text-base leading-tight">Mona Lisa Smile</p>
                <p className="text-blue-400 text-sm">Indigents Foundation</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Empowering indigent children and disadvantaged communities in Nigeria through education,
              welfare, and community care since March 10, 2024.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/MonaLisaSmileIndigentsFoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href="https://instagram.com/MLSIFoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">ig</span>
              </a>
              <a
                href="https://t.me/MLSIFoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/2347089931056"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full group-hover:w-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-white">Our Programs</h3>
            <ul className="space-y-2.5">
              {programs.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full group-hover:w-2 transition-all" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-base mt-7 mb-4 text-white">Donate To Us</h3>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10 space-y-1 text-xs text-gray-400">
              <p className="text-white font-medium">Moniepoint Bank</p>
              <p>MONA Lisa Smile Indigents Foundation</p>
              <p className="font-mono text-blue-400 text-sm">8034839987</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 mt-2 border border-white/10 space-y-1 text-xs text-gray-400">
              <p className="text-white font-medium">FCMB Bank</p>
              <p>MONA Lisa Smile Indigents Foundation</p>
              <p className="font-mono text-blue-400 text-sm">2008073579</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Abuja, Federal Capital Territory, Nigeria</span>
              </li>
              <li>
                <p className="flex items-center gap-2 text-sm text-gray-400 mb-1.5">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  Phone Numbers:
                </p>
                <div className="ml-6 space-y-1">
                  {phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>mlsifoundation@gmail.com</span>
              </li>
            </ul>

            <a
              href="https://wa.me/2347089931056"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Mona Lisa Smile Indigents Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <span>Founded</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>March 10, 2024 &bull; Abuja, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
