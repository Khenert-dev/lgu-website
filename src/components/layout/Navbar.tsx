"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-green-700/90 border-b border-green-600">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <Link
          href="/"
          className="font-bold text-lg tracking-wide text-white hover:text-green-100 transition"
        >
          La Trinidad LGU
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-white">
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
                className="hover:text-green-200 transition-colors"
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
