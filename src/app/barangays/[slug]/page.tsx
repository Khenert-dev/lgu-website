import { notFound } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import Card from "@/components/ui/card"
import { BARANGAYS } from "../data"

const BarangayCenteredMap = dynamic(
  () => import("@/components/maps/BarangayCenteredMap"),
  { ssr: false }
)

type Props = {
  params: { slug: string }
}

export default function BarangayPage({ params }: Props) {
  const barangay = BARANGAYS.find(b => b.slug === params.slug)
  if (!barangay) notFound()

  return (
    <section className="relative max-w-5xl mx-auto px-8 py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative space-y-12">
        <nav className="text-sm text-slate-500">
          <Link href="/barangays" className="hover:text-green-700">
            Barangays
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-700">
            {barangay.name}
          </span>
        </nav>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">
            Barangay {barangay.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            {barangay.description}
          </p>
        </div>

        <BarangayCenteredMap
          lat={barangay.lat}
          lng={barangay.lng}
          name={barangay.name}
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Overview
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {barangay.description}
            </p>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Highlights
            </h3>

            {barangay.highlights ? (
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {barangay.highlights.map(h => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">
                No highlights available.
              </p>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
