export const dynamic = "force-dynamic"

import Card from "@/components/ui/card"
import BarangayMap from "@/components/sections/BarangayMap"
import { notFound } from "next/navigation"
import { headers } from "next/headers"

type Barangay = {
  name: string
  slug: string
  description: string
  image?: string
  lat?: number
  lng?: number
}

async function getBarangay(slug: string): Promise<Barangay | null> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(
    `${protocol}://${host}/api/barangay/${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) return null
  return res.json()
}

export default async function BarangayPage({
  params,
}: {
  params: { slug: string }
}) {
  const barangay = await getBarangay(params.slug)

  if (!barangay) notFound()

  return (
    <main className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      {/* HERO */}
      {barangay.image && (
        <div className="relative h-[45vh]">
          <img
            src={barangay.image}
            alt={barangay.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-6xl mx-auto px-8 h-full flex items-end pb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              {barangay.name}
            </h1>
          </div>
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-8 py-24 space-y-28">

        {/* ABOUT */}
        <section className="max-w-4xl space-y-6">
          {!barangay.image && (
            <h1 className="text-5xl md:text-6xl font-bold text-green-900">
              {barangay.name}
            </h1>
          )}

          <p className="text-xl text-slate-700 leading-relaxed whitespace-pre-line">
            {barangay.description}
          </p>
        </section>

        {/* LOCATION */}
        {barangay.lat != null && barangay.lng != null && (
          <section className="space-y-12">
            <SectionHeader
              title="Location"
              subtitle="Geographic location within the Municipality of La Trinidad."
            />

            <Card className="p-10 space-y-8">
              <div className="grid sm:grid-cols-2 gap-6 text-lg text-slate-700">
                <p><strong>Latitude:</strong> {barangay.lat}</p>
                <p><strong>Longitude:</strong> {barangay.lng}</p>
              </div>

              <BarangayMap
                lat={barangay.lat}
                lng={barangay.lng}
                name={barangay.name}
              />
            </Card>
          </section>
        )}
      </div>
    </main>
  )
}

/* HELPERS */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-600">{subtitle}</p>
      )}
    </div>
  )
}
