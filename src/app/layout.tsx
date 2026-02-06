"use client"

import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import { usePathname } from "next/navigation"
import FloatingCircles from "@/components/effects/FloatingCircles"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative min-h-screen antialiased overflow-x-hidden bg-black">

        {/* ================= GLOBAL BACKGROUND (PUBLIC ONLY) ================= */}
        {!isAdmin && (
          <>
            {/* BASE IMAGE */}
            <div className="fixed inset-0 z-[-60] bg-[url('/images/aerial.jpg')] bg-cover bg-center" />

            {/* DARK OVERLAY */}
            <div className="fixed inset-0 z-[-50] bg-black/65" />

            {/* NOISE */}
            <div
              className="
                fixed inset-0 z-[-40]
                bg-[url('/images/noise.png')]
                bg-repeat
                opacity-[0.04]
                mix-blend-soft-light
                pointer-events-none
              "
            />
          </>
        )}

        {/* ================= FLOATING CIRCLES (VISIBLE LAYER) ================= */}
        {!isAdmin && (
          <div className="fixed inset-0 z-[-20] pointer-events-none">
            <FloatingCircles />
          </div>
        )}

        {/* ================= NAVBAR ================= */}
        {!isAdmin && (
          <div className="fixed top-0 left-0 right-0 z-[100]">
            <Navbar />
          </div>
        )}

        {/* ================= PAGE CONTENT ================= */}
        <main
          className={`relative z-10 ${
            isAdmin ? "bg-slate-50 text-slate-900" : ""
          }`}
        >
          {!isAdmin ? (
            <div className="pt-24">
              <div className="relative min-h-screen">
                {children}
              </div>
            </div>
          ) : (
            children
          )}
        </main>

      </body>
    </html>
  )
}
