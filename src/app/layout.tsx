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
      <body className="relative min-h-screen antialiased overflow-x-hidden bg-black">

        {/* ================= PUBLIC BACKGROUND ================= */}
        {!isAdmin && (
          <>
            {/* BASE IMAGE */}
            <div className="fixed inset-0 -z-50 bg-[url('/images/aerial.jpg')] bg-cover bg-center" />

            {/* DARKENING LAYER */}
            <div className="fixed inset-0 -z-40 bg-black/60" />

            {/* TEXTURE / GRAIN */}
            <div
              className="
                fixed inset-0 -z-30
                bg-[url('/images/strawberry.png')]
                bg-repeat
                bg-[length:420px_420px]
                opacity-[0.035]
                mix-blend-soft-light
                pointer-events-none
              "
            />
          </>
        )}

        {/* ================= NAVBAR ================= */}
        {!isAdmin && (
          <div className="fixed top-0 left-0 right-0 z-[100]">
            <Navbar />
          </div>
        )}

        {/* ================= CONTENT SURFACE ================= */}
        <main
          className={`
            relative z-10
            ${isAdmin ? "bg-slate-50 text-slate-900" : ""}
          `}
        >
          {/* CONTENT WRAPPER – THIS SAVES YOU */}
          {!isAdmin ? (
            <div className="pt-24">
              <div className="min-h-screen bg-transparent">
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
