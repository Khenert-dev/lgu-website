import Link from "next/link"
import Card from "@/components/ui/card"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

type Barangay = {
  id: string
  name: string
  slug: string
  description: string
}

async function getBarangays(): Promise<Barangay[]> {
  const q = query(collection(db, "barangays"), orderBy("name"))
  const snap = await getDocs(q)

  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Barangay, "id">),
  }))
}

export default async function BarangaysPage() {
  const barangays = await getBarangays()

  return (
    <main className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 space-y-24">

        {/* ================= PAGE HEADER ================= */}
        <header className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-green-700">
            Municipality Information
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-green-900">
            Barangays of La Trinidad
          </h1>

          <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
            Below is a list of all barangays in the Municipality of La Trinidad.
            Click a barangay to view its background, location, and other important information.
          </p>
        </header>

        {/* ================= BARANGAY CARDS ================= */}
        {barangays.length === 0 ? (
          <Card className="p-16 text-center max-w-xl mx-auto">
            <p className="text-lg text-slate-600">
              No barangay information is available at the moment.
            </p>
            <p className="mt-2 text-base text-slate-500">
              Please check back later.
            </p>
          </Card>
        ) : (
          <section className="space-y-6">

            {/* Accessibility hint */}
            <p className="text-base text-slate-600">
              Tip: Click on a barangay card to view its full profile.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {barangays.map((b, i) => (
                <Link
                  key={b.id}
                  href={`/barangays/${b.slug}`}
                  className="focus:outline-none focus:ring-4 focus:ring-green-400/40 rounded-2xl"
                >
                  <Card
                    className="h-full p-8 flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Accent bar */}
                    <span
                      className={`
                        absolute top-0 left-0 h-1 w-full
                        ${i % 3 === 0 ? "bg-gradient-to-r from-green-400 to-emerald-600" : ""}
                        ${i % 3 === 1 ? "bg-gradient-to-r from-emerald-400 to-teal-600" : ""}
                        ${i % 3 === 2 ? "bg-gradient-to-r from-teal-400 to-green-600" : ""}
                      `}
                    />

                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold text-green-900">
                        {b.name}
                      </h2>

                      <p className="text-base text-slate-700 leading-relaxed line-clamp-5">
                        {b.description || "Click to view detailed information about this barangay."}
                      </p>
                    </div>

                    <div className="mt-8">
                      <span className="inline-block rounded-lg bg-green-700 px-5 py-3 text-base font-semibold text-white">
                        View Barangay Profile
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
