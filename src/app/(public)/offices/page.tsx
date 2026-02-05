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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-[#f7faf8] to-green-50">

      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-14 text-center space-y-5">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-800">
          Municipal Offices
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
          Offices that carry out public services and local governance
          functions of the Municipality of La Trinidad.
        </p>
      </section>

      {/* ================= OFFICE CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {offices.length === 0 ? (
          <p className="text-center text-slate-500 text-base">
            No offices published yet.
          </p>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((o) => (
              <Card
                key={o._id}
                className="
                  group relative
                  rounded-[36px]
                  bg-white
                  p-10
                  transition-all duration-300
                  shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                  hover:-translate-y-2
                  hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                "
              >
                {/* GLOW LAYER */}
                <div
                  className="
                    pointer-events-none
                    absolute -inset-1
                    rounded-[40px]
                    opacity-0
                    blur-2xl
                    transition
                    duration-300
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-green-400/40
                    via-emerald-400/30
                    to-green-500/40
                  "
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col gap-4">
                  {o.image && (
                    <img
                      src={o.image}
                      alt={o.name}
                      className="h-14 w-14 object-contain"
                    />
                  )}

                  <h2 className="text-lg font-semibold text-green-800">
                    {o.name}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {o.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ================= MUNICIPAL INFO ================= */}
      {(info.mission || info.vision || info.history) && (
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-green-100/40 to-white" />

          <div className="relative max-w-5xl mx-auto px-6 space-y-16">

            <header className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800">
                Municipal Direction & Background
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
                The guiding principles and historical background of the
                Municipality of La Trinidad.
              </p>
            </header>

            {info.mission && <InfoBlock title="Mission" text={info.mission} />}
            {info.vision && <InfoBlock title="Vision" text={info.vision} />}
            {info.history && <InfoBlock title="History" text={info.history} />}

          </div>
        </section>
      )}

    </div>
  )
}

/* ================= HELPERS ================= */

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <Card
      className="
        relative
        rounded-[36px]
        bg-white
        p-10
        shadow-[0_12px_30px_rgba(0,0,0,0.12)]
      "
    >
      <h3 className="text-xl font-semibold text-green-800">
        {title}
      </h3>
      <div className="my-4 h-1 w-12 rounded-full bg-green-600" />
      <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </Card>
  )
}
