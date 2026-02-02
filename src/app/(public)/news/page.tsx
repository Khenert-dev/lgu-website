import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Card from "@/components/ui/card"

type NewsItem = {
  id: string
  title: string
  body: string
  createdAt?: { seconds: number }
}

async function getNews(): Promise<NewsItem[]> {
  const q = query(collection(db, "news"), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)

  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<NewsItem, "id">),
  }))
}

export default async function NewsPage() {
  const items = await getNews()

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-8 py-32 space-y-24">

        {/* ================= PAGE HEADER ================= */}
        <header className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-700">
            Public Information
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-green-900">
            News & Announcements
          </h1>

          <p className="text-xl text-slate-700 leading-relaxed">
            Official announcements, advisories, and public notices from the
            Municipality of La Trinidad.
          </p>
        </header>

        {/* ================= NEWS LIST ================= */}
        {items.length === 0 ? (
          <Card className="p-16 text-center max-w-xl mx-auto">
            <p className="text-lg text-slate-600">
              No announcements available at this time.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Please check back later for updates.
            </p>
          </Card>
        ) : (
          <section className="space-y-12">
            {items.map((n, i) => (
              <Card
                key={n.id}
                className="
                  relative
                  p-10
                  space-y-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >
                {/* accent */}
                <span
                  className={`
                    absolute top-0 left-0 h-1 w-full
                    ${i % 2 === 0
                      ? "bg-gradient-to-r from-green-400 to-emerald-600"
                      : "bg-gradient-to-r from-emerald-400 to-teal-600"}
                  `}
                />

                <h2 className="text-2xl font-semibold text-green-900">
                  {n.title}
                </h2>

                <div className="h-px w-16 bg-green-300" />

                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {n.body}
                </p>
              </Card>
            ))}
          </section>
        )}

      </div>
    </div>
  )
}
