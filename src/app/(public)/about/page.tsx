export const dynamic = "force-dynamic"

import Card from "@/components/ui/card"
import type { AboutData } from "@/types/about"
import { headers } from "next/headers"

async function getAbout(): Promise<AboutData | null> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/about`, {
    cache: "no-store",
  })

  if (!res.ok) return null
  return res.json()
}

export default async function AboutPage() {
  const data = await getAbout()

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center text-slate-500">
        About content not available.
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* ================= BACKGROUND IMAGE ================= */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url(/images/capitol.png)" }}
      />

      {/* ================= GLASS OVERLAY ================= */}
      <div
        className="
          absolute inset-0 -z-10
          bg-white/55
          backdrop-blur-[6px]
          backdrop-saturate-150
        "
      />

      <div className="relative max-w-6xl mx-auto px-8 py-20 space-y-24">

        {/* ================= PAGE HEADER ================= */}
        <header className="max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            About the Municipality
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 leading-tight">
            Municipality of La Trinidad
          </h1>

          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-500" />

          <p className="text-xl text-slate-700 leading-relaxed whitespace-pre-line">
            {data.overview}
          </p>
        </header>

        {/* ================= ROLE ================= */}
        <Section title="Role in the Province" description={data.role} />

        {/* ================= MISSION / VISION / VALUES ================= */}
        <section className="space-y-12">
          <SectionHeader
            title="Our Direction"
            subtitle="Guided by service, integrity, and sustainable growth."
          />

          <div className="grid gap-8 md:grid-cols-3">
            <InfoCard title="Mission" text={data.mission} />
            <InfoCard title="Vision" text={data.vision} />
            <InfoCard title="Core Values" text={data.values.join(", ")} />
          </div>
        </section>

        {/* ================= HISTORY ================= */}
        {data.history?.length > 0 && (
          <section className="space-y-16">
            <SectionHeader
              title="Historical Timeline"
              subtitle="Key milestones that shaped La Trinidad."
            />

            <div className="relative pl-8 space-y-10">
              <div className="absolute left-2 top-0 bottom-0 w-px bg-green-300/60" />

              {data.history.map((h, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[14px] top-1 h-4 w-4 rounded-full bg-green-600 ring-4 ring-green-200" />

                  <p className="text-sm font-semibold text-green-700">
                    {h.year}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {h.title}
                  </h3>

                  <p className="mt-2 text-slate-700 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= SEAL ================= */}
        <section className="space-y-12">
          <SectionHeader
            title="Municipal Seal & Symbolism"
            subtitle="Identity, heritage, and meaning."
          />

          <Card className="p-12 grid gap-10 md:grid-cols-2 items-center glass">
            <div className="flex justify-center">
              <img
                src="/images/municipal-seal.png"
                alt="Municipal Seal of La Trinidad"
                className="h-56 w-56 object-contain"
              />
            </div>

            <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {data.sealMeaning}
            </p>
          </Card>
        </section>

      </div>
    </div>
  )
}

/* ================= HELPERS ================= */

function Section({ title, description }: { title: string; description: string }) {
  return (
    <Card className="p-14 glass">
      <h2 className="text-3xl font-bold text-green-800 mb-4">{title}</h2>
      <div className="h-1 w-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 mb-6" />
      <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </Card>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl space-y-3">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800">
        {title}
      </h2>
      {subtitle && <p className="text-slate-600 text-lg">{subtitle}</p>}
    </div>
  )
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <Card className="p-9 glass glass-hover">
      <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
      <div className="h-1 w-10 rounded bg-gradient-to-r from-green-600 to-emerald-500 mb-4" />
      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </Card>
  )
}
