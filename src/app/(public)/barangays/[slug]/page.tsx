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
  return Barangay.findOne({ slug: slug.toLowerCase().trim() }).lean()
}

export default async function BarangayPage({
  params,
}: {
  params: { slug: string }
}) {
  const barangay = await getBarangay(params.slug)
  if (!barangay) notFound()

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-100 via-green-50 to-emerald-100 text-slate-800">

      {/* BACKGROUND TEXTURE */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.05]"
        style={{ backgroundImage: "url(/images/capitol.png)" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100/90 via-white/60 to-emerald-100/90" />

      {/* HERO */}
      {barangay.images && barangay.images.length > 0 && (
        <section className="relative h-[50vh] overflow-hidden">
          <div className="flex h-full overflow-x-auto snap-x snap-mandatory">
            {barangay.images.map((img, i) => (
              <div key={i} className="relative min-w-full snap-center">
                <img
                  src={img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto w-full px-6 pb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                {barangay.name}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-24 space-y-28">

        {/* INTRO */}
        <section className="grid gap-14 md:grid-cols-5">
          <div className="md:col-span-3 space-y-6">
            {!barangay.images && (
              <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">
                {barangay.name}
              </h1>
            )}

            <p className="text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-line">
              {barangay.description}
            </p>
          </div>

          <Card
            className="
              md:col-span-2
              rounded-3xl
              bg-white/85
              backdrop-blur
              p-8
              border border-slate-200
              transition-all duration-300
              hover:-translate-y-1
              hover:border-green-400
              hover:shadow-[0_16px_36px_-14px_rgba(16,185,129,0.45)]
            "
          >
            <h3 className="text-sm font-semibold text-green-800 mb-4 uppercase tracking-wide">
              Barangay Details
            </h3>

            {barangay.lat != null && barangay.lng != null && (
              <div className="text-sm text-slate-600 space-y-1">
                <p><strong>Latitude:</strong> {barangay.lat}</p>
                <p><strong>Longitude:</strong> {barangay.lng}</p>
              </div>
            )}

            {barangay.famousFor && barangay.famousFor.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Known for
                </p>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
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
            <SectionHeader title="History" />

            <div className="relative border-l border-green-400/50 pl-8 space-y-12">
              {barangay.history.map((h, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-green-700">
                    {h.year}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-slate-700 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* OFFICIALS */}
        {barangay.officials && barangay.officials.length > 0 && (
          <section className="space-y-14">
            <SectionHeader title="Barangay Officials" />

            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {barangay.officials.map((o, i) => (
                <Card
                  key={i}
                  className="
                    rounded-3xl
                    bg-white/85
                    backdrop-blur
                    p-8
                    text-center
                    border border-slate-200
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-green-400
                    hover:shadow-[0_16px_36px_-14px_rgba(16,185,129,0.45)]
                  "
                >
                  {o.photo ? (
                    <img
                      src={o.photo}
                      alt={o.name}
                      className="mx-auto h-24 w-24 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="mx-auto h-24 w-24 rounded-full bg-green-100 mb-4" />
                  )}

                  <h4 className="text-base font-semibold text-slate-900">
                    {o.name}
                  </h4>
                  <p className="text-sm text-green-700">
                    {o.position}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* MAP */}
        {barangay.lat != null && barangay.lng != null && (
          <section className="space-y-12">
            <SectionHeader title="Location" />

            <Card
              className="
                rounded-3xl
                bg-white/85
                backdrop-blur
                p-4
                border border-slate-200
                shadow-[0_16px_36px_-14px_rgba(16,185,129,0.35)]
              "
            >
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

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-green-800">
      {title}
    </h2>
  )
}
