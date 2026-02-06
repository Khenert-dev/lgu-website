export const dynamic = "force-dynamic"

import Link from "next/link"
import Card from "@/components/ui/card"
import { headers } from "next/headers"

type Barangay = {
  name: string
  slug: string
  description: string
  image?: string
}

async function getBarangays(): Promise<Barangay[]> {
  const h = headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  if (!host) return []

  const protocol =
    h.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https")

  const res = await fetch(`${protocol}://${host}/api/barangays`, {
    cache: "no-store",
  })

  if (!res.ok) return []
  return res.json()
}

export default async function BarangaysPage() {
  const barangays = await getBarangays()

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-100 via-green-50 to-emerald-100">

      {/* BACKGROUND TEXTURE */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.05]"
        style={{ backgroundImage: "url(/images/capitol.png)" }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100/90 via-white/60 to-emerald-100/90" />

      {/* ================= HERO ================= */}
      <section className="relative h-[48vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/images/capitol.png')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-emerald-700/90" />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Barangays of La Trinidad
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-xl text-green-100 leading-relaxed">
            Discover the communities, heritage, and leadership that shape the municipality.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="relative max-w-6xl mx-auto px-6 py-24 space-y-20">

        {/* INTRO */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-green-900 tracking-tight">
            Community Profiles
          </h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            Each barangay has its own identity, culture, and local governance.
            Select a barangay to view detailed information.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
          {barangays.map((b) => (
            <Link key={b.slug} href={`/barangays/${b.slug}`} className="group">
              <Card
                className="
                  h-full
                  rounded-[36px]
                  bg-white/85
                  backdrop-blur
                  overflow-hidden
                  border border-slate-200
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-green-400
                  hover:shadow-[0_20px_45px_-16px_rgba(16,185,129,0.45)]
                "
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-green-100">
                  {b.image ? (
                    <img
                      src={b.image}
                      alt={b.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-green-900 group-hover:text-green-700 transition">
                    {b.name}
                  </h3>

                  <p className="text-sm md:text-base text-slate-700 leading-relaxed line-clamp-3">
                    {b.description}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 group-hover:text-green-600">
                      View barangay
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </section>
    </main>
  )
}
