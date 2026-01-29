"use client"

import Link from "next/link"

const links = [
  ["About", "/about"],
  ["Officials", "/officials"],
  ["Offices", "/offices"],
  ["Barangays", "/barangays"],
  ["News", "/news"],
  ["Contact", "/contact"],
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg text-green-700"
        >
          La Trinidad LGU
        </Link>

        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className="relative text-slate-700 hover:text-green-700 transition after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
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
