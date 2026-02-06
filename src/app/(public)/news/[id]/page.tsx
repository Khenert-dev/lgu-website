export const dynamic = "force-dynamic"

import Card from "@/components/ui/card"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import Link from "next/link"

type NewsItem = {
  _id: string
  title: string
  body: string
  image?: string
  createdAt?: string
}

async function getNewsItem(id: string): Promise<NewsItem | null> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/news/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) return null
  return res.json()
}

export default async function NewsDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const item = await getNewsItem(params.id)
  if (!item) notFound()

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100/40">

      {/* SOFT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-green-300/25 blur-3xl" />
        <div className="absolute top-32 -right-32 h-[360px] w-[360px] rounded-full bg-emerald-300/25 blur-3xl" />
      </div>

      <section className="relative max-w-4xl mx-auto px-6 py-28 space-y-14">

        {/* BACK */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition"
        >
          ← Back to News
        </Link>

        {/* HEADER */}
        <header className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-green-900 leading-tight">
            {item.title}
          </h1>

          {item.createdAt && (
            <p className="text-sm text-slate-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          )}
        </header>

        {/* CONTENT CARD */}
        <Card
          className="
            relative
            overflow-hidden
            rounded-[36px]
            bg-white
            shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)]
          "
        >
          {/* IMAGE */}
          {item.image && (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
            </div>
          )}

          {/* BODY */}
          <div className="p-10 md:p-14">
            <p className="text-base md:text-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {item.body}
            </p>
          </div>
        </Card>

      </section>
    </main>
  )
}
