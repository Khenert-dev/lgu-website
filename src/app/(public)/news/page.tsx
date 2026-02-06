export const dynamic = "force-dynamic"

import Link from "next/link"
import Card from "@/components/ui/card"
import { headers } from "next/headers"

type NewsItem = {
  _id: string
  title: string
  body: string
  image?: string
}

async function getNews(): Promise<NewsItem[]> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/news`, {
    cache: "no-store",
  })

  if (!res.ok) return []
  return res.json()
}

export default async function NewsPage() {
  const items = await getNews()
  const featured = items[0]
  const rest = items.slice(1)

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-100 via-green-50 to-emerald-100">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.05]"
        style={{ backgroundImage: "url(/images/capitol.png)" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100/90 via-white/60 to-emerald-100/90" />

      <section className="relative max-w-7xl mx-auto px-6 py-20 space-y-16">

        {/* HEADER */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 tracking-tight">
            News & Announcements
          </h1>
          <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Official updates and public advisories from the Municipality of La Trinidad.
          </p>
        </header>

        {/* FEATURED */}
        {featured && (
          <Link href={`/news/${featured._id}`} className="group">
            <Card
              className="
                overflow-hidden
                rounded-[32px]
                bg-white/85
                backdrop-blur
                border border-slate-200
                transition-all duration-300
                hover:-translate-y-1
                hover:border-green-400
                hover:shadow-[0_18px_40px_-14px_rgba(16,185,129,0.45)]
              "
            >
              {featured.image && (
                <div className="relative w-full aspect-[5/3] overflow-hidden bg-slate-200">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                </div>
              )}

              <div className="p-8 space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-green-900 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-700 leading-relaxed line-clamp-3 whitespace-pre-line">
                  {featured.body}
                </p>
              </div>
            </Card>
          </Link>
        )}

        {/* GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <Link key={n._id} href={`/news/${n._id}`} className="group">
              <Card
                className="
                  h-full
                  overflow-hidden
                  rounded-[28px]
                  bg-white/85
                  backdrop-blur
                  border border-slate-200
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-green-400
                  hover:shadow-[0_16px_36px_-14px_rgba(16,185,129,0.45)]
                "
              >
                {n.image && (
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-200">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                  </div>
                )}

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-semibold text-green-900 leading-snug line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-2 whitespace-pre-line">
                    {n.body}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </section>
    </main>
  )
}
