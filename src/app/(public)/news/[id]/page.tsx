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
    <section className="relative max-w-4xl mx-auto px-8 py-32 space-y-12">
      {/* BACK BUTTON */}
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline"
        >
          ← Back to News
        </Link>
      </div>

      {/* TITLE */}
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-green-900">
          {item.title}
        </h1>
      </header>

      {/* CONTENT */}
      <Card className="overflow-hidden">
        {item.image && (
          <div className="relative w-full aspect-[16/9] bg-slate-200">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-10">
          <p className="text-lg text-slate-700 whitespace-pre-line leading-relaxed">
            {item.body}
          </p>
        </div>
      </Card>
    </section>
  )
}
