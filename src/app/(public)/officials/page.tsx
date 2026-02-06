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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-100 via-green-50 to-emerald-100 text-slate-900">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: "url(/images/capitol.png)" }}
      />

      {/* COLOR DEPTH */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100/90 via-white/60 to-emerald-100/90" />

      {/* ================= HERO ================= */}
      <section className="relative h-[45vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/capitol.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/95 via-green-900/85 to-green-900/95" />

        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="max-w-3xl space-y-6">
            <span className="block text-sm uppercase tracking-[0.35em] text-green-200 font-medium">
              Local Government Unit
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Municipal Officials
            </h1>

            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-300 to-emerald-400" />

            <p className="text-lg md:text-xl text-white/95 leading-relaxed">
              The elected and appointed leaders serving the Municipality of La Trinidad
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="relative bg-white/80 backdrop-blur border-b border-green-200">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
            This directory presents the current municipal officials entrusted with
            governance, legislation, and public service. Each official plays a vital
            role in advancing transparency, accountability, and community development
            in La Trinidad.
          </p>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {officials.length === 0 ? (
          <p className="text-center text-base md:text-lg text-slate-500">
            No officials have been published yet.
          </p>
        ) : (
          <div className="grid gap-14 sm:grid-cols-2 md:grid-cols-3">
            {officials.map((o) => (
              <Card
                key={o._id}
                className="
                  rounded-3xl
                  bg-white/80
                  backdrop-blur
                  p-10
                  text-center
                  border border-slate-200
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-green-400
                  hover:shadow-[0_18px_40px_-14px_rgba(16,185,129,0.45)]
                "
              >
                {/* image */}
                {o.image ? (
                  <img
                    src={o.image}
                    alt={o.name}
                    className="
                      mx-auto mb-6
                      h-36 w-36
                      rounded-full
                      object-cover
                      ring-4 ring-green-100
                      transition
                      hover:ring-green-300
                    "
                  />
                ) : (
                  <div
                    className="
                      mx-auto mb-6
                      h-36 w-36
                      rounded-full
                      bg-green-100
                      flex items-center justify-center
                      text-3xl font-bold text-green-800
                    "
                  >
                    {o.name.charAt(0)}
                  </div>
                )}

                {/* role */}
                <p className="text-sm uppercase tracking-[0.25em] text-green-700 font-semibold">
                  {o.role}
                </p>

                {/* name */}
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  {o.name}
                </h3>

                {/* divider */}
                <div className="mt-6 h-px w-16 mx-auto bg-green-200" />

                {/* details */}
                <div className="mt-6 space-y-2 text-sm md:text-base text-slate-600">
                  <p>
                    <span className="font-medium text-slate-800">Office:</span>{" "}
                    Municipal Hall, La Trinidad
                  </p>
                  <p>
                    <span className="font-medium text-slate-800">Term:</span>{" "}
                    Current Administration
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
