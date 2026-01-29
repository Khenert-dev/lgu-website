import Card from "@/components/ui/card"

const OFFICIALS = [
  {
    role: "Municipal Mayor",
    name: "Roderick C. Awingan",
    img: "https://via.placeholder.com/300x300?text=Mayor",
  },
  {
    role: "Vice Mayor",
    name: "Atty. Guiller A. Galwan",
    img: "https://via.placeholder.com/300x300?text=Vice+Mayor",
  },
  {
    role: "Councilor",
    name: "Frederick D. Guzman",
    img: "https://via.placeholder.com/300x300?text=Councilor",
  },
  {
    role: "Councilor",
    name: "Nestor T. Fongwan Jr.",
    img: "https://via.placeholder.com/300x300?text=Councilor",
  },
  {
    role: "Councilor",
    name: "Jayson C. Dangwa",
    img: "https://via.placeholder.com/300x300?text=Councilor",
  },
]

export default function OfficialsPage() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h1 className="text-4xl font-bold text-green-700 mb-12">
        Municipal Officials
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {OFFICIALS.map((o) => (
          <Card
            key={o.name}
            className="text-center hover:shadow-xl transition"
          >
            <img
              src={o.img}
              alt={o.name}
              className="mx-auto h-40 w-40 rounded-full object-cover mb-4"
            />
            <p className="text-sm uppercase text-slate-500">
              {o.role}
            </p>
            <h3 className="text-xl font-semibold mt-1">
              {o.name}
            </h3>
          </Card>
        ))}
      </div>
    </section>
  )
}
