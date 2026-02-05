export const dynamic = "force-dynamic"

import Card from "@/components/ui/card"
import { headers } from "next/headers"

type Office = {
  _id: string
  name: string
  description: string
  image?: string
  order?: number
}

type MunicipalInfo = {
  mission: string
  vision: string
  history: string
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

async function getMunicipalInfo(): Promise<MunicipalInfo> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/municipal-info`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return { mission: "", vision: "", history: "" }
  }

  return res.json()
}

export default async function OfficesPage() {
  const [offices, info] = await Promise.all([
    getOffices(),
    getMunicipalInfo(),
  ])

  return (
    <div className="relative">

      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-14 space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">
          Municipal Offices
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Offices that carry out public services and local governance
          functions of the Municipality of La Trinidad.
        </p>
      </section>

      {/* ================= OFFICE CARDS ================= */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        {offices.length === 0 ? (
          <p className="text-center text-slate-500 text-lg">
            No offices published yet.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((o) => (
              <Card
                key={o._id}
                className="p-8 glass glass-hover space-y-4"
              >
                {o.image && (
                  <div className="h-20 w-20 rounded-xl bg-white/60 flex items-center justify-center">
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

      {/* ================= MUNICIPAL INFO ================= */}
      {(info.mission || info.vision || info.history) && (
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-green-50/60 to-white" />

          <div className="relative max-w-4xl mx-auto px-8 space-y-20">

            <header className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800">
                Municipal Direction & Background
              </h2>
              <p className="text-slate-600 text-lg">
                The guiding principles and historical background of the
                Municipality of La Trinidad.
              </p>
            </header>

            {info.mission && (
              <Card className="p-12 glass space-y-6">
                <h3 className="text-2xl font-bold text-green-800">
                  Mission
                </h3>
                <div className="h-1 w-14 rounded-full bg-green-600" />
                <p className="text-lg text-slate-700 whitespace-pre-line">
                  {info.mission}
                </p>
              </Card>
            )}

            {info.vision && (
              <Card className="p-12 glass space-y-6">
                <h3 className="text-2xl font-bold text-green-800">
                  Vision
                </h3>
                <div className="h-1 w-14 rounded-full bg-green-600" />
                <p className="text-lg text-slate-700 whitespace-pre-line">
                  {info.vision}
                </p>
              </Card>
            )}

            {info.history && (
              <Card className="p-12 glass space-y-6">
                <h3 className="text-2xl font-bold text-green-800">
                  History
                </h3>
                <div className="h-1 w-14 rounded-full bg-green-600" />
                <p className="text-lg text-slate-700 whitespace-pre-line">
                  {info.history}
                </p>
              </Card>
            )}

          </div>
        </section>
      )}

    </div>
  )
}
