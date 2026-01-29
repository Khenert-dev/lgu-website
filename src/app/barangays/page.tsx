import Card from "@/components/ui/card"

const barangays = [
  "Alapang",
  "Alno",
  "Ambiong",
  "Balili",
  "Beckel",
  "Betag",
  "Cruz",
  "Lubas",
  "Pico",
]

export default function BarangaysPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
      <h1 className="text-4xl font-bold text-green-700">
        Barangays
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {barangays.map((b) => (
          <Card key={b}>
            <p className="text-lg font-medium">{b}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
