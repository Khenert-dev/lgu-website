"use client"

import { useEffect, useState } from "react"
import Card from "@/components/ui/card"
import { getAboutContent } from "@/lib/about"

export default function AboutPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getAboutContent().then(setData)
  }, [])

  if (!data) return null

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-8 py-32 space-y-24">
        <header className="max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900">
            Municipality of La Trinidad
          </h1>
          <p className="text-lg text-slate-600">
            {data.overview}
          </p>
        </header>

        <Card className="p-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Role in the Province
          </h2>
          <p className="text-slate-700">
            {data.role}
          </p>
        </Card>

        <div className="grid gap-10 md:grid-cols-3">
          <Card className="p-10">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Mission
            </h3>
            <p>{data.mission}</p>
          </Card>

          <Card className="p-10">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Vision
            </h3>
            <p>{data.vision}</p>
          </Card>

          <Card className="p-10">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Core Values
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {data.values.map((v: string) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
