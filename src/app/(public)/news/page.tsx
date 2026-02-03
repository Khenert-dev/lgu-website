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
    <section className="relative max-w-7xl mx-auto px-8 py-28 space-y-16">
      {/* HEADER */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">
          News & Announcements
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Official updates and public advisories from the Municipality of La Trinidad.
        </p>
      </header>

      {/* FEATURED */}
      {featured && (
        <Link href={`/news/${featured._id}`}>
          <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition">
            {featured.image && (
              <div className="relative w-full bg-slate-100 flex items-center justify-center">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="
                    max-h-[420px]
                    w-auto
                    max-w-full
                    object-contain
                  "
                />
              </div>
            )}

            <div className="p-8 space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-green-900">
                {featured.title}
              </h2>
              <p className="text-slate-700 line-clamp-4 whitespace-pre-line">
                {featured.body}
              </p>
            </div>
          </Card>
        </Link>
      )}

      {/* COMPACT GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((n) => (
          <Link key={n._id} href={`/news/${n._id}`}>
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition">
              {n.image && (
                <div className="relative w-full aspect-[4/3] bg-slate-100 flex items-center justify-center">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="
                      max-h-full
                      max-w-full
                      object-contain
                    "
                  />
                </div>
              )}

              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-green-900 leading-snug">
                  {n.title}
                </h3>
                <p className="text-sm text-slate-700 line-clamp-3 whitespace-pre-line">
                  {n.body}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
