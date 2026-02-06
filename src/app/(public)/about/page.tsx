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
      <div className="max-w-5xl mx-auto px-6 py-28 text-center text-base md:text-lg text-slate-400">
        About content not available.
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-100 via-green-50 to-emerald-100">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: "url(/images/capitol.png)" }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100/90 via-white/60 to-emerald-100/90" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 space-y-28">

        {/* HEADER */}
        <header className="max-w-4xl space-y-7">
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase text-green-800">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
            About the Municipality
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 leading-tight">
            Municipality of La Trinidad
          </h1>

          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />

          <p className="text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-line">
            {data.overview}
          </p>
        </header>

        {/* ROLE */}
        <HoverCard>
          <SectionContent
            title="Role in the Province"
            text={data.role}
          />
        </HoverCard>

        {/* PARALLAX */}
        <section
          className="relative h-[34vh] rounded-3xl overflow-hidden bg-fixed bg-center bg-cover shadow-lg"
          style={{ backgroundImage: "url(/images/latri.png)" }}
        >
          <div className="absolute inset-0 bg-green-900/70" />
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white max-w-4xl">
              A Municipality at the Heart of Benguet Province
            </h2>
          </div>
        </section>

        {/* MISSION / VISION / VALUES */}
        <section className="space-y-16">
          <SectionHeader
            title="Our Direction"
            subtitle="Guided by service, integrity, and sustainable growth."
          />

          <div className="grid gap-12 md:grid-cols-3">
            <HoverCard>
              <InfoContent title="Mission" text={data.mission} />
            </HoverCard>
            <HoverCard>
              <InfoContent title="Vision" text={data.vision} />
            </HoverCard>
            <HoverCard>
              <InfoContent title="Core Values" text={data.values.join(", ")} />
            </HoverCard>
          </div>
        </section>

        {/* HISTORY */}
        {data.history?.length > 0 && (
          <section className="space-y-16">
            <SectionHeader
              title="Historical Timeline"
              subtitle="Key milestones that shaped La Trinidad."
            />

            <div className="relative pl-10 space-y-14">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-green-400/60" />

              {data.history.map((h, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[18px] top-1 h-5 w-5 rounded-full bg-green-600 ring-4 ring-green-300" />

                  <p className="text-sm md:text-base font-semibold text-green-700">
                    {h.year}
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-slate-900">
                    {h.title}
                  </h3>

                  <p className="mt-3 text-base md:text-lg text-slate-700 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEAL */}
        <section className="space-y-16">
          <SectionHeader
            title="Municipal Seal & Symbolism"
            subtitle="Identity, heritage, and meaning."
          />

          <HoverCard>
            <div className="grid gap-14 md:grid-cols-2 items-center">
              <div className="flex justify-center">
                <img
                  src="/images/municipal-seal.png"
                  alt="Municipal Seal of La Trinidad"
                  className="h-56 w-56 md:h-64 md:w-64 object-contain"
                />
              </div>

              <p className="text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-line">
                {data.sealMeaning}
              </p>
            </div>
          </HoverCard>
        </section>

      </div>
    </div>
  )
}

/* ================= REUSABLE ================= */

function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <Card
      className="
        group
        relative
        bg-white/80
        backdrop-blur
        border border-green-200
        p-12 md:p-14
        transition-all duration-300
        hover:-translate-y-2
        hover:border-green-400
        hover:shadow-[0_20px_45px_-15px_rgba(16,185,129,0.45)]
      "
    >
      {children}
    </Card>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function SectionContent({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
        {title}
      </h2>
      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 mb-8" />
      <p className="text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </>
  )
}

function InfoContent({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-3">
        {title}
      </h3>
      <div className="h-1 w-12 rounded bg-gradient-to-r from-green-600 to-emerald-500 mb-5" />
      <p className="text-base md:text-lg text-slate-700 leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </>
  )
}
