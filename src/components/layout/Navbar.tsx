"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const links = [
  ["About", "/about"],
  ["Officials", "/officials"],
  ["Offices", "/offices"],
  ["Barangays", "/barangays"],
  ["News", "/news"],
  ["Contact", "/contact"],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b"
          : "bg-white/60 backdrop-blur-md"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-green-800 tracking-tight"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
          La Trinidad LGU
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className="relative text-slate-700 transition-colors duration-200
                           hover:text-green-700
                           after:absolute after:-bottom-2 after:left-0
                           after:h-[2px] after:w-0 after:bg-green-600
                           after:transition-all after:duration-300
                           hover:after:w-full"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
