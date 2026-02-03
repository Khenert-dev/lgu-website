export const dynamic = "force-dynamic"

import Link from "next/link"
import Card from "@/components/ui/card"
import { headers } from "next/headers"

type Barangay = {
  name: string
  slug: string
  description: string
}

async function getBarangays(): Promise<Barangay[]> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/barangays`, {
    cache: "no-store",
  })

  if (!res.ok) return []
  return res.json()
}

export default async function BarangaysPage() {
  const barangays = await getBarangays()

  return (
    <main className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 space-y-24">
        <header className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900">
            Barangays of La Trinidad
          </h1>
          <p className="text-lg text-slate-700">
            Click a barangay to view its full profile.
          </p>
        </header>

        {barangays.length === 0 ? (
          <Card className="p-16 text-center max-w-xl mx-auto">
            <p className="text-lg text-slate-600">
              No barangays available.
            </p>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {barangays.map((b) => (
              <Link
                key={b.slug}
                href={`/barangays/${b.slug}`}
              >
                <Card className="p-8 h-full hover:shadow-xl transition cursor-pointer">
                  <h2 className="text-2xl font-semibold text-green-900">
                    {b.name}
                  </h2>
                  <p className="mt-3 text-slate-700 line-clamp-4">
                    {b.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
