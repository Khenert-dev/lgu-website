"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Button from "@/components/ui/button"
import Stats from "@/components/sections/Stats"
import BarangayMap from "@/components/sections/BarangayMap"
import Gallery from "@/components/sections/Gallery"
import AiChatbox from "@/components/sections/AiChatbox"

type NewsItem = {
  _id: string
  title: string
  body: string
}

type ServiceItem = {
  id: string
  title: string
  summary: string
  eta: string
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
  const [services, setServices] = useState<ServiceItem[]>([])

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

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => setServices(d))
      .catch(() => setServices([]))
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
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

        <div className="relative z-10 min-h-screen flex items-center py-16">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
                Municipality of <br /> La Trinidad
              </h1>

              <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-200 min-h-[3rem]">
                {typed}
                <span className="inline-block w-[2px] h-6 bg-slate-200 ml-1 animate-pulse" />
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                
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

      {/* SERVICES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                Digital Services
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-green-900">
                Access the most-requested municipal services
              </h2>
              <p className="mt-3 text-base text-slate-600 max-w-2xl">
                Real-time service information powered by the municipal API for La Trinidad.
              </p>
            </div>
            <Link href="/offices">
              <Button className="bg-green-700 hover:bg-green-800 text-white shadow-md">
                Explore all offices
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_16px_36px_-18px_rgba(16,185,129,0.35)]"
              >
                <h3 className="text-lg font-semibold text-green-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {service.summary}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                  Typical turnaround: {service.eta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI AUTOMATION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-white p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                AI Automation
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-green-900">
                Smarter updates with an AI-powered assistant
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-700">
                Let AI surface the right information at the right time. Automated alerts and personalized
                summaries keep residents updated on news, advisories, and emergency notices.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-600" />
                  Instant notifications for breaking advisories
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-600" />
                  AI-curated weekly community summaries
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-600" />
                  Personalized alerts for services you care about
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-600" />
                  24/7 AI concierge for citizen questions
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-[0_20px_40px_-20px_rgba(16,185,129,0.4)] border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Enable AI updates
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Add your details and get AI-personalized alerts within minutes.
              </p>
              <form className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Email or mobile number
                  </label>
                  <input
                    type="text"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    AI topics
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                    {["Weather", "Traffic", "Health", "Markets", "Events"].map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-green-800"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Enable AI automation
                </button>
                <p className="text-xs text-slate-500">
                  By submitting, you agree to receive AI-generated service updates.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* AI CHATBOX */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-5xl mx-auto px-6">
          <AiChatbox />
        </div>
      </section>

      {/* PAGE BREAKER */}
      <section className="relative h-[32vh] sm:h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/Strawberry.jpg')" }} />
        <div className="absolute inset-0 bg-green-900/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white max-w-4xl">
            Serving a Thriving Agricultural Capital of the Cordilleras
          </h2>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-green-200/70 pb-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {news.map((n) => (
              <Link key={n._id} href={`/news/${n._id}`} className="group">
                <div
                  className="
                    relative
                    h-full
                    rounded-3xl
                    bg-white
                    p-8
                    border border-slate-200
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:border-green-400
                    hover:shadow-[0_18px_40px_-14px_rgba(16,185,129,0.45)]
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
                border border-slate-200
                transition-all duration-300
                hover:-translate-y-2
                hover:border-green-400
                hover:shadow-[0_18px_40px_-14px_rgba(16,185,129,0.45)]
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
                    transition-all duration-300
                    group-hover:-translate-y-1
                    group-hover:border-green-400
                    group-hover:shadow-[0_16px_36px_-12px_rgba(16,185,129,0.45)]
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
