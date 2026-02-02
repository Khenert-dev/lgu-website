"use client"

import { useEffect, useRef, useState } from "react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Stats from "@/components/sections/Stats"
import BarangayMap from "@/components/sections/BarangayMap"
import Gallery from "@/components/sections/Gallery"

const slides = [
  {
    desc: "Celebrating agriculture, culture, and community excellence.",
  },
  {
    desc: "Transparent, citizen-first governance you can trust.",
  },
  {
    desc: "Planning today for a stronger future generation.",
  },
]

const fbPages = [
  {
    name: "Municipality of La Trinidad",
    href: "https://www.facebook.com/MOlatrinidad",
    logo: "/logos/main.jpg",
  },
  {
    name: "PNP La Trinidad MPS",
    href: "https://www.facebook.com/PNPLaTrinidadMPS",
    logo: "/logos/police.jpg",
  },
  {
    name: "La Trinidad Tourism",
    href: "https://www.facebook.com/LaTrinidadTourism",
    logo: "/logos/tour.jpg",
  },
  {
    name: "La Trinidad Water District",
    href: "https://www.facebook.com/profile.php?id=100063988726552",
    logo: "/logos/water.png",
  },
]

export default function HomePage() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const bgRef = useRef<HTMLDivElement | null>(null)

  // parallax without re-rendering
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return
      bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0)`
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // entrance animation
  useEffect(() => {
    setVisible(true)
  }, [])

  // slideshow
  useEffect(() => {
    if (slides.length === 0) return

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center scale-110 will-change-transform"
          style={{ backgroundImage: "url('/images/Strawberry.png')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-green-900/20 to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div
            className={`max-w-3xl space-y-8 p-12 rounded-3xl glass glass-hover shadow-2xl transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
              Official Municipality Portal
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-green-900 leading-tight">
              Municipality of <br /> La Trinidad
            </h1>

            <p className="text-xl text-slate-800 leading-relaxed">
              {slides[index]?.desc}
            </p>

            <Button>Explore Public Services</Button>

            <div className="flex gap-3 pt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    i === index
                      ? "bg-green-700 scale-125"
                      : "bg-green-300 hover:bg-green-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <BarangayMap />
      <Gallery />

      {/* ================= FB LINKS ================= */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12">
            Official Facebook Pages
          </h2>

          <div className="flex flex-wrap justify-center gap-12">
            {fbPages.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2"
              >
                <div className="h-28 w-28 rounded-3xl border border-green-300/40 bg-white/70 shadow-lg flex items-center justify-center">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-16 w-16 object-contain"
                  />
                </div>

                <span className="text-sm font-semibold text-green-900">
                  {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
