export const dynamic = "force-dynamic"

import Card from "@/components/ui/card"
import { headers } from "next/headers"

type Official = {
  _id: string
  role: string
  name: string
  image?: string
}

async function getOfficials(): Promise<Official[]> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/officials`, {
    cache: "no-store",
  })

  if (!res.ok) return []
  return res.json()
}

export default async function OfficialsPage() {
  const officials = await getOfficials()

  return (
    <div className="relative z-20 bg-gradient-to-b from-green-50 via-white to-green-50 text-slate-900">

      {/* HERO */}
      <section className="relative h-[42vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/capitol.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 via-green-900/80 to-green-900/95" />

        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-green-200 mb-3">
              Local Government Unit
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Municipal Officials
            </h1>

            <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-green-300 to-emerald-400" />

            <p className="mt-5 text-base md:text-lg text-white/90">
              Elected and appointed leaders serving the Municipality of La Trinidad
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white border-b border-green-100">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-slate-700 max-w-3xl mx-auto">
            This directory presents the current municipal officials entrusted with
            governance, legislation, and public service.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {officials.length === 0 ? (
          <p className="text-center text-slate-500">
            No officials published yet.
          </p>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
            {officials.map((o) => (
              <Card
                key={o._id}
                className="
                  group relative
                  rounded-3xl
                  bg-white
                  p-10
                  text-center
                  border border-green-100
                  shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_40px_90px_-35px_rgba(16,185,129,0.45)]
                "
              >
                {/* glow */}
                <div
                  className="
                    pointer-events-none
                    absolute -inset-1
                    rounded-[32px]
                    opacity-0
                    blur-2xl
                    transition
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-green-400/40
                    to-emerald-400/40
                  "
                />

                {/* image */}
                {o.image ? (
                  <img
                    src={o.image}
                    alt={o.name}
                    className="
                      relative z-10
                      mx-auto mb-6
                      h-36 w-36
                      rounded-full
                      object-cover
                      ring-4 ring-green-100
                      group-hover:ring-green-300
                      transition
                    "
                  />
                ) : (
                  <div
                    className="
                      relative z-10
                      mx-auto mb-6
                      h-36 w-36
                      rounded-full
                      bg-green-100
                      flex items-center justify-center
                      text-2xl font-bold text-green-700
                    "
                  >
                    {o.name.charAt(0)}
                  </div>
                )}

                <p className="relative z-10 text-[11px] uppercase tracking-[0.2em] text-green-700">
                  {o.role}
                </p>

                <h3 className="relative z-10 mt-2 text-xl font-semibold text-slate-900">
                  {o.name}
                </h3>

                <div className="relative z-10 mt-5 h-px w-12 mx-auto bg-green-200" />
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
