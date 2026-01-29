"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/about", label: "About" },
  { href: "/officials", label: "Officials" },
  { href: "/offices", label: "Offices" },
  { href: "/barangays", label: "Barangays" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold text-green-700 tracking-wide"
        >
          Municipality of La Trinidad
        </Link>

        <ul className="hidden md:flex gap-4">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={[
                    "px-4 py-2 rounded-lg text-sm font-medium transition",
                    active
                      ? "bg-green-700 text-white"
                      : "text-slate-700 hover:bg-green-50 hover:text-green-700",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
