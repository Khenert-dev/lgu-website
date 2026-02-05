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
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100/40">

      {/* ================= HERO ================= */}
      <section className="relative h-[48vh] flex items-center overflow-hidden">
        {/* IMAGE LAYER */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/images/capitol.png')" }}
        />

        {/* COLOR OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-emerald-700/90" />

        {/* SOFT DARKEN */}
        <div className="absolute inset-0 bg-black/25" />

        {/* CONTENT */}
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
                  relative
                  h-full
                  rounded-[40px]
                  bg-white/95
                  backdrop-blur
                  overflow-hidden
                  transition-all duration-300
                  border border-slate-200/70
                  shadow-[0_18px_45px_-25px_rgba(0,0,0,0.35)]
                  hover:-translate-y-2
                  hover:shadow-[0_40px_90px_-35px_rgba(16,185,129,0.55)]
                "
              >
                {/* GLOW */}
                <div
                  className="
                    pointer-events-none
                    absolute -inset-2
                    rounded-[44px]
                    opacity-0
                    blur-3xl
                    transition
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-green-400/40
                    via-emerald-400/35
                    to-green-500/40
                  "
                />

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
                <div className="relative z-10 p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-green-900 group-hover:text-green-700 transition">
                    {b.name}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
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
