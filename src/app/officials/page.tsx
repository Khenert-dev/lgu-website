import Card from "@/components/ui/card"

const OFFICIALS = [
  {
    role: "Municipal Mayor",
    name: "Roderick C. Awingan",
    img: "https://via.placeholder.com/400x400?text=Mayor",
  },
  {
    role: "Vice Mayor",
    name: "Atty. Guiller A. Galwan",
    img: "https://via.placeholder.com/400x400?text=Vice+Mayor",
  },
  {
    role: "Councilor",
    name: "Frederick D. Guzman",
    img: "https://via.placeholder.com/400x400?text=Councilor",
  },
  {
    role: "Councilor",
    name: "Nestor T. Fongwan Jr.",
    img: "https://via.placeholder.com/400x400?text=Councilor",
  },
  {
    role: "Councilor",
    name: "Jayson C. Dangwa",
    img: "https://via.placeholder.com/400x400?text=Councilor",
  },
]

export default function OfficialsPage() {
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

      <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
        {OFFICIALS.map((o) => (
          <Card
            key={o.name}
            className="
              p-10
              text-center
              hover:scale-[1.03]
              transition-transform duration-500
            "
          >
            <div className="relative mx-auto h-44 w-44 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-300 to-emerald-600 blur-lg opacity-30" />
              <img
                src={o.img}
                alt={o.name}
                className="
                  relative z-10
                  h-44 w-44
                  rounded-full
                  object-cover
                  border-4 border-white
                  shadow-xl
                "
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
    </section>
  )
}
