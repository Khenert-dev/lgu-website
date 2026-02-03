export const dynamic = "force-dynamic"

import Card from "@/components/ui/card"
import { headers } from "next/headers"

type Official = {
  _id: string
  role: string
  name: string
  image?: string
}

async function getOfficials(): Promise<Official[]> {
  const h = headers()
  const host = h.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/officials`, {
    cache: "no-store",
  })

  if (!res.ok) return []
  return res.json()
}

export default async function OfficialsPage() {
  const officials = await getOfficials()

  return (
    <section className="max-w-7xl mx-auto px-8 py-32">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-16">
        Municipal Officials
      </h1>

      {officials.length === 0 ? (
        <p className="text-center text-slate-500">
          No officials published yet.
        </p>
      ) : (
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          {officials.map((o) => (
            <Card key={o._id} className="p-10 text-center">
              {o.image && (
                <img
                  src={o.image}
                  className="h-40 w-40 mx-auto rounded-full object-cover mb-6"
                />
              )}

              <p className="text-xs uppercase text-slate-500">
                {o.role}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-green-900">
                {o.name}
              </h3>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
