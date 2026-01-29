"use client"

import { useEffect, useState } from "react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Stats from "@/components/sections/Stats"
import BarangayMap from "@/components/sections/BarangayMap"
import Gallery from "@/components/sections/Gallery"

const slides = [
  {
    title: "Strawberry Festival",
    desc: "Celebrating agriculture, culture, and community excellence.",
  },
  {
    title: "Public Service Excellence",
    desc: "Transparent, citizen-first governance you can trust.",
  },
  {
    title: "Sustainable Development",
    desc: "Planning today for a stronger future generation.",
  },
]

export default function HomePage() {
  const [index, setIndex] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const onScroll = () => setY(window.scrollY * 0.35)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
            transform: `translateY(${y}px)`,
          }}
        />

        <div className="absolute inset-0 bg-white/65 backdrop-blur-md" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="max-w-3xl space-y-8 fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-green-700">
              Municipality of La Trinidad
            </h1>

            <p className="text-xl text-slate-700">
              {slides[index].desc}
            </p>

            <Button>Explore Public Services</Button>

            <div className="flex gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-3 w-3 rounded-full transition ${
                    i === index
                      ? "bg-green-700"
                      : "bg-slate-400 hover:bg-green-500"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
          alt=""
          className="hidden lg:block absolute right-16 bottom-16 w-72 rounded-2xl shadow-2xl floating"
        />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="max-w-7xl mx-auto px-8 py-32 grid gap-10 md:grid-cols-3">
        {[
          ["Transparency", "Open records, ordinances, disclosures."],
          ["Public Services", "Permits, certificates, citizen services."],
          ["Community", "Barangays, programs, local initiatives."],
        ].map(([title, desc]) => (
          <Card key={title}>
            <h3 className="text-2xl font-semibold text-green-700">
              {title}
            </h3>
            <p className="mt-4 text-slate-600 text-lg">
              {desc}
            </p>
          </Card>
        ))}
      </section>

      {/* ================= STATS DASHBOARD ================= */}
      <Stats />

      {/* ================= BARANGAY MAP ================= */}
      <BarangayMap />

      {/* ================= GALLERY ================= */}
      <Gallery />
    </div>
  )
}
