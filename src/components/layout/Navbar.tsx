"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

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
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-[9999]
        bg-white
        transition-shadow duration-200
        ${scrolled ? "shadow-md" : "shadow-sm"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* BRAND */}
        <Link
          href="/"
          className="flex items-center gap-3 font-extrabold text-lg text-green-900 tracking-tight"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-green-700" />
          La Trinidad LGU
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-10">
          <ul className="hidden md:flex items-center gap-10 text-sm font-semibold">
            {links.map(([label, href]) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      relative transition-colors duration-150
                      ${
                        active
                          ? "text-green-800"
                          : "text-slate-700 hover:text-green-700"
                      }
                      after:absolute after:-bottom-2 after:left-0
                      after:h-[2px] after:w-full
                      after:bg-green-700
                      after:origin-left
                      after:scale-x-0
                      after:transition-transform after:duration-200
                      hover:after:scale-x-100
                      ${active ? "after:scale-x-100" : ""}
                    `}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* STATUS DOTS */}
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse [animation-delay:150ms]" />
            <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      </nav>
    </header>
  )
}
