"use client"

import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 text-slate-900 antialiased">
        {/* background layers */}
        <div className="fixed inset-0 -z-10 bg-noise pointer-events-none" />
        <div className="fixed inset-0 -z-10 bg-parallax pointer-events-none" />

        {/* PUBLIC NAVBAR (NOT ADMIN) */}
        {!isAdmin && (
          <div className="relative z-50">
            <Navbar />
          </div>
        )}

        {/* page content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
