export const dynamic = "force-dynamic"

import Card from "@/components/ui/card"
import dynamicImport from "next/dynamic"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/mongoose"
import { Barangay } from "@/models/Barangay"

const BarangayMap = dynamicImport(
  () => import("@/components/sections/BarangayMap"),
  { ssr: false }
)

type BarangayType = {
  name: string
  slug: string
  description: string

  images?: string[]

  lat?: number
  lng?: number

  history?: {
    year: string
    title: string
    description: string
  }[]

  officials?: {
    name: string
    position: string
    photo?: string
  }[]

  famousFor?: string[]
}

async function getBarangay(slug: string): Promise<BarangayType | null> {
  await connectDB()

  return Barangay.findOne({
    slug: slug.toLowerCase().trim(),
  }).lean()
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
      {/* HERO / CAROUSEL */}
      {barangay.images && barangay.images.length > 0 && (
        <section className="relative overflow-hidden">
          <div className="flex snap-x snap-mandatory overflow-x-auto h-[55vh]">
            {barangay.images.map((img, i) => (
              <div
                key={i}
                className="relative min-w-full snap-center"
              >
                <img
                  src={img}
                  alt={`${barangay.name} ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto w-full px-8 pb-12">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                {barangay.name}
              </h1>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-6xl mx-auto px-8 py-24 space-y-28">
        {/* ABOUT + DETAILS */}
        <section className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {!barangay.images && (
              <h1 className="text-5xl font-bold text-green-900">
                {barangay.name}
              </h1>
            )}

            <p className="text-xl text-slate-700 leading-relaxed whitespace-pre-line">
              {barangay.description}
            </p>
          </div>

          <Card className="p-6 space-y-5 bg-green-50 border-green-200">
            <h3 className="text-lg font-semibold text-green-900">
              Barangay Details
            </h3>

            {barangay.lat != null && barangay.lng != null && (
              <div className="text-sm text-slate-700 space-y-1">
                <p><strong>Latitude:</strong> {barangay.lat}</p>
                <p><strong>Longitude:</strong> {barangay.lng}</p>
              </div>
            )}

            {barangay.famousFor && barangay.famousFor.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-green-800 mb-1">
                  Known for
                </p>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {barangay.famousFor.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </section>

        {/* HISTORY */}
        {barangay.history && barangay.history.length > 0 && (
          <section className="space-y-14">
            <SectionHeader
              title="Barangay History"
              subtitle="Key moments that shaped the community."
            />

            <div className="relative pl-6 space-y-10">
              <div className="absolute left-1 top-0 bottom-0 w-px bg-green-300" />

              {barangay.history.map((h, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-green-700 ring-4 ring-green-200" />
                  <p className="text-sm font-semibold text-green-700">{h.year}</p>
                  <h3 className="text-lg font-semibold">{h.title}</h3>
                  <p className="text-slate-700 mt-2">{h.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* OFFICIALS */}
        {barangay.officials && barangay.officials.length > 0 && (
          <section className="space-y-12">
            <SectionHeader
              title="Barangay Officials"
              subtitle="Current barangay leadership."
            />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {barangay.officials.map((o, i) => (
                <Card key={i} className="p-6 text-center">
                  {o.photo ? (
                    <img
                      src={o.photo}
                      alt={o.name}
                      className="mx-auto h-28 w-28 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="mx-auto h-28 w-28 rounded-full bg-slate-200 mb-4" />
                  )}

                  <h4 className="text-lg font-semibold">{o.name}</h4>
                  <p className="text-sm text-green-700">{o.position}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* LOCATION */}
        {barangay.lat != null && barangay.lng != null && (
          <section className="space-y-12">
            <SectionHeader
              title="Location"
              subtitle="Geographic location of the barangay."
            />

            <Card className="p-10">
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

function SectionHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800">
        {title}
      </h2>
      {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
    </div>
  )
}
