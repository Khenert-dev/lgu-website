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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">

      {/* ================= PARALLAX HEADER ================= */}
      <section
        className="relative h-[42vh] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url(/images/capitol.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/85 via-green-900/75 to-green-900/90" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-green-200 mb-3">
              Local Government Unit
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Municipal Officials
            </h1>

            <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-green-300 to-emerald-400" />

            <p className="mt-4 text-base md:text-lg text-white/90 leading-relaxed">
              Elected and appointed leaders serving the Municipality of La Trinidad
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO BAND ================= */}
      <section className="border-y border-green-100 bg-white/85 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-3xl mx-auto">
            This directory presents the current municipal officials entrusted with
            governance, legislation, and public service, working collectively for
            transparency, development, and community welfare.
          </p>
        </div>
      </section>

      {/* ================= OFFICIALS GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-18 md:py-20">

        {officials.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            No officials published yet.
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">

            {officials.map((o) => (
              <Card
                key={o._id}
                className="
                  group relative
                  p-8 md:p-10
                  text-center
                  bg-white
                  border border-green-100
                  shadow-[0_18px_45px_-25px_rgba(0,0,0,0.25)]
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_35px_80px_-30px_rgba(16,185,129,0.45)]
                "
              >
                {/* TOP ACCENT BAR */}
                <div
                  className="
                    absolute top-0 left-0 right-0
                    h-[4px]
                    rounded-t
                    bg-gradient-to-r from-green-600 via-emerald-500 to-green-600
                  "
                />

                {/* GLOW */}
                <div
                  className="
                    pointer-events-none
                    absolute -inset-1
                    rounded-xl
                    opacity-0
                    group-hover:opacity-100
                    transition
                    blur-xl
                    bg-gradient-to-r from-green-400/35 to-emerald-400/35
                  "
                />

                {/* IMAGE */}
                {o.image ? (
                  <img
                    src={o.image}
                    alt={o.name}
                    className="
                      relative z-10
                      h-32 w-32 md:h-36 md:w-36
                      mx-auto
                      rounded-full
                      object-cover
                      mb-5
                      ring-4 ring-green-100
                      transition
                      group-hover:ring-green-300
                    "
                  />
                ) : (
                  <div
                    className="
                      relative z-10
                      h-32 w-32 md:h-36 md:w-36
                      mx-auto mb-5
                      rounded-full
                      bg-green-50
                      flex items-center justify-center
                      text-green-700
                      font-bold
                      text-xl
                    "
                  >
                    {o.name.charAt(0)}
                  </div>
                )}

                {/* ROLE */}
                <p className="relative z-10 text-[11px] font-semibold uppercase tracking-[0.15em] text-green-700">
                  {o.role}
                </p>

                {/* NAME */}
                <h3 className="relative z-10 mt-2 text-lg md:text-xl font-semibold text-slate-900 leading-snug">
                  {o.name}
                </h3>

                <div className="relative z-10 mt-4 h-px w-10 mx-auto bg-green-200" />
              </Card>
            ))}

          </div>
        )}
      </section>

    </div>
  )
}
