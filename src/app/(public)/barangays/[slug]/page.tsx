"use client"

import { useEffect, useState } from "react"
import Card from "@/components/ui/card"
import { getAboutContent } from "@/lib/about"

type AboutData = {
  overview: string
  role: string
  mission: string
  vision: string
  values: string[]
  sealMeaning: string
  history: {
    year: string
    title: string
    description: string
  }[]
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAboutContent()
      .then((d) => {
        if (!d) {
          setError("About content not found in Firestore.")
        } else {
          setData(d as AboutData)
        }
      })
      .catch(() => {
        setError("Failed to load About content.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-slate-500">Loading About information…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-slate-700">{error}</p>
      </div>
    )
  }

  if (!data) return null

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-8 py-32 space-y-24">

        {/* ================= HEADER ================= */}
        <header className="max-w-4xl space-y-6">
          <span className="text-sm font-semibold tracking-widest uppercase text-green-700">
            About
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-green-900">
            Municipality of La Trinidad
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            {data.overview}
          </p>
        </header>

        {/* ================= ROLE ================= */}
        <Card className="p-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Role in the Province
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            {data.role}
          </p>
        </Card>

        {/* ================= MISSION / VISION / VALUES ================= */}
        <div className="grid gap-10 md:grid-cols-3">
          <Card className="p-10">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Mission
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {data.mission}
            </p>
          </Card>

          <Card className="p-10">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Vision
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {data.vision}
            </p>
          </Card>

          <Card className="p-10">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Core Values
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              {data.values.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* ================= HISTORY ================= */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-green-800">
            Historical Timeline
          </h2>

          <div className="space-y-8 border-l-2 border-green-200 pl-8">
            {data.history.map((h) => (
              <div key={h.year} className="space-y-2">
                <p className="text-sm font-semibold text-green-700">
                  {h.year}
                </p>
                <h4 className="text-lg font-semibold text-slate-900">
                  {h.title}
                </h4>
                <p className="text-slate-700">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= MUNICIPAL SEAL ================= */}
        <Card className="p-12 grid gap-10 md:grid-cols-2 items-center">
          <img
            src="/images/municipal-seal.png"
            alt="Municipal Seal of La Trinidad"
            className="mx-auto h-56 w-56 object-contain"
          />

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              Municipal Seal & Symbolism
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {data.sealMeaning}
            </p>
          </div>
        </Card>

      </div>
    </section>
  )
}
