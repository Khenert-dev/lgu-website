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
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100/40">

      <section className="relative max-w-7xl mx-auto px-6 py-24 space-y-20">

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
                relative
                overflow-hidden
                rounded-[36px]
                bg-white
                border border-slate-200/70
                shadow-[0_18px_45px_-25px_rgba(0,0,0,0.35)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_40px_90px_-35px_rgba(16,185,129,0.45)]
              "
            >
              {featured.image && (
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-200">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              )}

              <div className="relative z-10 p-10 space-y-4 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold text-green-900 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-700 leading-relaxed line-clamp-4 whitespace-pre-line">
                  {featured.body}
                </p>
              </div>
            </Card>
          </Link>
        )}

        {/* GRID */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <Link key={n._id} href={`/news/${n._id}`} className="group">
              <Card
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-[32px]
                  bg-white
                  border border-slate-200/70
                  transition-all duration-300
                  shadow-[0_14px_36px_-24px_rgba(0,0,0,0.3)]
                  hover:-translate-y-1
                  hover:shadow-[0_32px_80px_-35px_rgba(16,185,129,0.4)]
                "
              >
                {n.image && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 p-6 space-y-3 bg-white">
                  <h3 className="text-lg font-semibold text-green-900 leading-snug">
                    {n.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-3 whitespace-pre-line">
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
