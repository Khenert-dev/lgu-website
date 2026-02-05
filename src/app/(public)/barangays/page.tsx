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
    <main className="relative overflow-hidden bg-slate-50">
      {/* HERO */}
      <section className="relative h-[48vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700" />
        <div className="absolute inset-0 opacity-20 bg-[url('/images/municipal-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative max-w-6xl mx-auto px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Barangays of La Trinidad
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-green-100">
            Discover the communities, heritage, and leadership that shape the municipality.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative max-w-6xl mx-auto px-8 py-28 space-y-20">
        {/* INTRO */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">
            Community Profiles
          </h2>
          <p className="text-lg text-slate-700">
            Each barangay has its own identity, culture, and local governance.
            Select a barangay to view detailed information.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {barangays.map((b) => (
            <Link key={b.slug} href={`/barangays/${b.slug}`}>
              <Card className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                {/* IMAGE (FIXED SIZE + CONSISTENT RATIO) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-green-100">
                  {b.image ? (
                    <img
                      src={b.image}
                      alt={b.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-100" />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-green-900 group-hover:text-green-700 transition">
                    {b.name}
                  </h3>

                  <p className="text-slate-700 line-clamp-3 leading-relaxed">
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
