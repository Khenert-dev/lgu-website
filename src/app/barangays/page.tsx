import Link from "next/link"
import Card from "@/components/ui/card"

const barangays = [
  { name: "Alapang", slug: "alapang" },
  { name: "Alno", slug: "alno" },
  { name: "Ambiong", slug: "ambiong" },
  { name: "Balili", slug: "balili" },
  { name: "Beckel", slug: "beckel" },
  { name: "Betag", slug: "betag" },
  { name: "Cruz", slug: "cruz" },
  { name: "Lubas", slug: "lubas" },
  { name: "Pico", slug: "pico" },
]

export default function BarangaysPage() {
  return (
    <section className="relative max-w-7xl mx-auto px-8 py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">
          Barangays of La Trinidad
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Select a barangay to view its profile, leadership, services, and local
          highlights.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {barangays.map((b, i) => (
          <Link
            key={b.slug}
            href={`/barangays/${b.slug}`}
            className="group"
          >
            <Card
              className="
                relative
                p-10
                h-full
                flex items-center justify-between
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-2xl
                cursor-pointer
              "
            >
              <span
                className={`
                  absolute top-0 left-0 h-1 w-full
                  bg-gradient-to-r
                  ${i % 3 === 0 && "from-green-400 to-emerald-600"}
                  ${i % 3 === 1 && "from-emerald-400 to-teal-600"}
                  ${i % 3 === 2 && "from-teal-400 to-green-600"}
                `}
              />

              <div>
                <p className="text-2xl font-semibold text-green-900">
                  {b.name}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Barangay profile & services
                </p>
              </div>

              <span
                className="
                  text-2xl text-green-700
                  transition-transform duration-300
                  group-hover:translate-x-2
                "
              >
                →
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
