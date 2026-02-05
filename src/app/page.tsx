"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Stats from "@/components/sections/Stats"
import BarangayMap from "@/components/sections/BarangayMap"
import Gallery from "@/components/sections/Gallery"

type NewsItem = {
  _id: string
  title: string
  body: string
  image?: string
}

const slides = [
  { desc: "Celebrating agriculture, culture, and community excellence." },
  { desc: "Transparent, citizen-first governance you can trust." },
  { desc: "Planning today for a stronger future generation." },
]

const heroImages = [
  "/images/strawberry.png",
  "/images/sunset.jpg",
  "/images/bell.png",
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
  const [news, setNews] = useState<NewsItem[]>([])
  const activeBgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!activeBgRef.current) return
      activeBgRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setNews(d.slice(0, 3)))
  }, [])

  return (
    <div className="relative overflow-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[65vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((img, i) => (
            <div
              key={img}
              ref={i === index ? activeBgRef : null}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms] ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${img})`, backgroundPosition: "center 40%" }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-green-950/70 via-green-900/35 to-green-950/80" />

        <div className="relative z-10 min-h-[65vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl glass p-9 md:p-10 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.35)] animate-fadeUp">
              <span className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-900">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Official Municipality Portal
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
                Municipality of <br /> La Trinidad
              </h1>

              <p className="mt-3 text-lg text-slate-700 min-h-[3rem]">
                {slides[index].desc}
              </p>

              <div className="mt-6 flex gap-3">
                <Link href="/services">
                  <Button className="px-6 py-3">Public Services</Button>
                </Link>
                <Link href="/news">
                  <Button className="px-6 py-3 bg-green-700 text-white hover:bg-green-800">
                    Latest News
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-14 ">
        <Stats />
      </section>

      {/* ================= NEWS ================= */}
      <section className="py-14 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-extrabold text-green-900">
              Latest Announcements
            </h2>
            <Link href="/news" className="text-green-700 font-semibold hover:underline">
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {news.map((n) => (
              <Link key={n._id} href={`/news/${n._id}`}>
                <Card className="p-6 h-full transition hover:-translate-y-1 hover:shadow-xl">
                  <h3 className="text-lg font-semibold text-green-900">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-slate-600 line-clamp-4">
                    {n.body}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <BarangayMap />
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-14">
        <Gallery />
      </section>

      {/* ================= FB ================= */}
      <section className="py-12 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-green-900 mb-8">
            Official Facebook Pages
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 place-items-center">
            {fbPages.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3"
              >
                <div
                  className="
                    h-24 w-24
                    rounded-2xl
                    bg-white
                    flex items-center justify-center
                    border border-green-200/60
                    shadow-sm
                    transition
                    group-hover:-translate-y-1
                    group-hover:shadow-lg
                  "
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-14 w-14 object-contain"
                    loading="lazy"
                  />
                </div>

                <span className="text-sm font-semibold text-green-900 text-center leading-tight">
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
