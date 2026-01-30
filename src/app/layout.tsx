import "./globals.css"
import Navbar from "@/components/layout/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="
          min-h-screen
          bg-gradient-to-b from-green-50 via-white to-green-100
          text-slate-900
          antialiased
        "
      >
        {/* global background effects */}
        <div className="fixed inset-0 bg-noise pointer-events-none z-0" />
        <div className="fixed inset-0 bg-parallax pointer-events-none z-0" />

        <Navbar />

        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
