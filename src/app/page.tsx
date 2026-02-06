"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Button from "@/components/ui/button"
import Stats from "@/components/sections/Stats"
import BarangayMap from "@/components/sections/BarangayMap"
import Gallery from "@/components/sections/Gallery"

type NewsItem = {
  _id: string
  title: string
  body: string
}

const slides = [
  { desc: "Celebrating agriculture, culture, and community excellence." },
  { desc: "Transparent, citizen-first governance you can trust." },
  { desc: "Planning today for a stronger future generation." },
]

const heroImages = [
  "/images/Strawberry.jpg",
  "/images/sunset.jpg",
  "/images/Bell.jpg",
]

const fbPages = [
  { name: "Municipality of La Trinidad", href: "https://www.facebook.com/MOlatrinidad", logo: "/logos/main.jpg" },
  { name: "PNP La Trinidad MPS", href: "https://www.facebook.com/PNPLaTrinidadMPS", logo: "/logos/police.jpg" },
  { name: "La Trinidad Tourism", href: "https://www.facebook.com/LaTrinidadTourism", logo: "/logos/tour.jpg" },
  { name: "La Trinidad Water District", href: "https://www.facebook.com/profile.php?id=100063988726552", logo: "/logos/water.png" },
  { name: "DOST-PAGASA", href: "https://www.facebook.com/PAGASA.DOST.GOV.PH", logo: "/logos/dost.png" },
]

export default function HomePage() {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState("")
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    setTyped("")
    const text = slides[index].desc
    let i = 0
    const t = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i === text.length) clearInterval(t)
    }, 22)
    return () => clearInterval(t)
  }, [index])

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setNews(d.slice(0, 6)))
      .catch(() => setNews([]))
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((img, i) => (
          <img
            key={img}
            src={img}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/85" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                Municipality of <br /> La Trinidad
              </h1>

              <p className="mt-6 text-lg md:text-xl text-slate-200 min-h-[3rem]">
                {typed}
                <span className="inline-block w-[2px] h-6 bg-slate-200 ml-1 animate-pulse" />
              </p>

              <div className="mt-10 flex gap-4">
                <Link href="/services">
                  <Button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3">
                    View Services
                  </Button>
                </Link>
                <Link href="/news">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3">
                    News & Updates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <Stats />
        </div>
      </section>

      {/* PAGE BREAKER */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/Strawberry.jpg')" }} />
        <div className="absolute inset-0 bg-green-900/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white max-w-4xl">
            Serving a Thriving Agricultural Capital of the Cordilleras
          </h2>
        </div>
      </section>

      {/* NEWS */}
      <section className="relative py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">

          <div className="flex items-end justify-between border-b border-green-200/70 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">
                News & Announcements
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Official updates and municipal advisories
              </p>
            </div>

            <Link href="/news">
              <Button className="bg-green-700 hover:bg-green-800 text-white shadow-md">
                View all news
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {news.map((n) => (
              <Link key={n._id} href={`/news/${n._id}`} className="group">
                <div
                  className="
                    relative
                    h-full
                    rounded-3xl
                    bg-white
                    p-8
                    border
                    border-slate-200
                    shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)]
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-green-300
                    hover:shadow-[0_35px_90px_-35px_rgba(16,185,129,0.45)]
                  "
                >
                  <div className="absolute left-8 top-0 h-1 w-12 rounded-full bg-green-600" />

                  <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-green-800 transition">
                    {n.title}
                  </h3>

                  <p className="mt-4 text-sm text-slate-600 line-clamp-4 leading-relaxed">
                    {n.body}
                  </p>

                  <div className="mt-6 text-sm font-semibold text-green-700 group-hover:text-green-600 transition">
                    Read more →
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* MAP */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <BarangayMap />
        </div>
      </section>

      {/* PAGE BREAKER */}
      <section className="relative h-[35vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/Bell.jpg')" }} />
        <div className="absolute inset-0 bg-green-900/65" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white max-w-4xl">
            Rooted in Culture. Driven by Progress.
          </h2>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            { title: "Barangay Profiles", text: "Population, leadership, and services for every barangay." },
            { title: "Public Services", text: "Health, education, emergency, and municipal offices." },
            { title: "Culture & Heritage", text: "Festivals, landmarks, and community identity." },
          ].map((c) => (
            <div
              key={c.title}
              className="
                rounded-3xl
                bg-white
                p-10
                text-center
                border
                border-slate-200
                shadow-[0_12px_36px_-28px_rgba(0,0,0,0.35)]
                transition
                hover:-translate-y-2
                hover:border-green-300
                hover:shadow-[0_28px_70px_-30px_rgba(16,185,129,0.45)]
              "
            >
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                {c.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 bg-green-50">
        <Gallery />
      </section>

      {/* FB LINKS */}
<section className="py-16 bg-white border-t">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 text-center mb-10">
      Official Facebook Pages
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 place-items-center">
      {fbPages.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group text-center"
        >
          <div
            className="
              h-28 w-28
              rounded-2xl
              bg-white
              border border-slate-200
              flex items-center justify-center
              shadow-sm
              transition
              group-hover:-translate-y-1
              group-hover:border-green-300
              group-hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.45)]
            "
          >
            <img
              src={p.logo}
              alt={p.name}
              className="h-16 w-16 object-contain"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-green-900 group-hover:text-green-700 transition">
            {p.name}
          </p>
        </a>
      ))}
    </div>
  </div>
</section>


    </div>
  )
}
