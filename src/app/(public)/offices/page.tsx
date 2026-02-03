export const dynamic = "force-dynamic"

import Card from "@/components/ui/card"
import { headers } from "next/headers"

type Office = {
  _id: string
  name: string
  description: string
  image?: string
}

async function getOffices(): Promise<Office[]> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/offices`, {
    cache: "no-store",
  })

  if (!res.ok) return []
  return res.json()
}

export default async function OfficesPage() {
  const offices = await getOffices()

  return (
    <section className="relative max-w-7xl mx-auto px-8 py-32 space-y-20">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">
          Municipal Offices
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Offices that carry out public services and local governance
          functions of the Municipality of La Trinidad.
        </p>
      </header>

      {offices.length === 0 ? (
        <p className="text-center text-slate-500 text-lg">
          No offices published yet.
        </p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((o) => (
            <Card
              key={o._id}
              className="p-8 space-y-4 hover:shadow-xl transition"
            >
              {o.image && (
                <div className="h-20 w-20 rounded-xl bg-slate-100 flex items-center justify-center">
                  <img
                    src={o.image}
                    alt={o.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              <h2 className="text-xl font-semibold text-green-800">
                {o.name}
              </h2>

              <p className="text-slate-700 leading-relaxed">
                {o.description}
              </p>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
