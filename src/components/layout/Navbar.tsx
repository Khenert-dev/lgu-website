"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-green-600/90 backdrop-blur-md border-b border-green-700/30">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          href="/"
          className="font-semibold text-white tracking-wide"
        >
          La Trinidad LGU
        </Link>

        {/* Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-white/90">
          {[
            { href: "/about", label: "About" },
            { href: "/officials", label: "Officials" },
            { href: "/offices", label: "Offices" },
            { href: "/barangays", label: "Barangays" },
            { href: "/news", label: "News" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-white transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
