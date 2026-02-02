import Card from "@/components/ui/card"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

type Official = {
  id: string
  role: string
  name: string
  img: string
}

async function getOfficials(): Promise<Official[]> {
  const q = query(collection(db, "officials"), orderBy("role"))
  const snap = await getDocs(q)

  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Official, "id">),
  }))
}

export default async function OfficialsPage() {
  const officials = await getOfficials()

  return (
    <section className="relative max-w-7xl mx-auto px-8 py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">
          Municipal Officials
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Dedicated public servants committed to transparent, accountable, and
          citizen-first governance.
        </p>
      </div>

      {officials.length === 0 ? (
        <p className="relative text-center text-slate-500">
          No officials published yet.
        </p>
      ) : (
        <div className="relative grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          {officials.map((o) => (
            <Card
              key={o.id}
              className="p-10 text-center transition-transform duration-500 hover:scale-[1.03]"
            >
              <div className="relative mx-auto h-44 w-44 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-300 to-emerald-600 blur-lg opacity-30" />
                <img
                  src={o.img}
                  alt={o.name}
                  className="relative z-10 h-44 w-44 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>

              <p className="text-xs tracking-widest uppercase text-slate-500">
                {o.role}
              </p>

              <h3 className="mt-2 text-xl font-semibold text-green-900">
                {o.name}
              </h3>

              <div className="mt-6 mx-auto h-px w-12 bg-gradient-to-r from-green-400 to-emerald-600" />
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
