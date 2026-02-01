"use client"

import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Card from "@/components/ui/card"

type AboutPageData = {
  title: string
  body: string
}

const cards = [
  {
    title: "Vision",
    text:
      "A progressive, sustainable, and inclusive municipality where people, agriculture, and innovation thrive together.",
  },
  {
    title: "Mission",
    text:
      "To deliver transparent, efficient, and people-centered public service through accountable governance and active citizen participation.",
  },
  {
    title: "Core Values",
    text:
      "Integrity, accountability, unity, innovation, and excellence in public service.",
  },
]

export default function AboutPage() {
  const [data, setData] = useState<AboutPageData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "pages", "about"))
        if (!snap.exists()) {
          setError(true)
          return
        }

        const d = snap.data()
        if (!d.title || !d.body) {
          setError(true)
          return
        }

        setData({
          title: d.title,
          body: d.body,
        })
      } catch {
        setError(true)
      }
    }
    load()
  }, [])

  if (error) {
    return (
      <div className="p-24 text-center text-slate-500">
        Page content is unavailable
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-24 text-center text-slate-400">
        Loading…
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-green-100 via-white to-green-50 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-8 text-center space-y-10">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
            About the Municipality
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-green-900 tracking-tight">
            {data.title}
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-line">
            {data.body}
          </p>
        </div>
      </section>

      {/* ================= DIVIDER ================= */}
      <div className="relative h-24">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent" />
      </div>

      {/* ================= CARDS ================= */}
      <section className="relative py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800">
              Our Direction
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Guided by clear principles, La Trinidad continues to strengthen
              public service, community development, and sustainable growth.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {cards.map((c) => (
              <Card
                key={c.title}
                className="
                  p-8
                  transition-all
                  hover:-translate-y-3
                  hover:shadow-xl
                "
              >
                <h3 className="text-xl font-semibold text-green-800">
                  {c.title}
                </h3>

                <div className="mt-3 h-1 w-12 rounded bg-green-600" />

                <p className="mt-6 text-slate-600 leading-relaxed">
                  {c.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMAGE + TEXT ================= */}
      <section className="relative py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50 to-white pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-8 grid gap-20 md:grid-cols-2 items-center">
          <div className="relative">
            <img
              src="/images/Strawberry.png"
              alt="La Trinidad"
              className="rounded-3xl shadow-2xl"
            />

            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-green-700 px-6 py-4 text-white shadow-xl">
              <p className="text-sm font-semibold">
                Benguet’s Capital Town
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
              Community & Growth
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-green-800">
              Rooted in Agriculture, Driven by Progress
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              La Trinidad serves as the agricultural, commercial, and
              administrative heart of Benguet. Known for its strawberry
              farms, vibrant communities, and responsive governance, the
              municipality continues to balance tradition with innovation.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Through strong leadership and citizen involvement, La Trinidad
              remains committed to sustainable development, disaster
              resilience, and inclusive growth for future generations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
