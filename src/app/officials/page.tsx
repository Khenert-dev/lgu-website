import Card from "@/components/ui/card"

const officials = [
  { name: "Hon. Romeo K. Salda", role: "Municipal Mayor" },
  { name: "Hon. Roderick P. Balangcod", role: "Vice Mayor" },
  { name: "Municipal Council", role: "Sangguniang Bayan Members" },
]

export default function OfficialsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
      <h1 className="text-4xl font-bold text-green-700">
        Municipal Officials
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {officials.map((o) => (
          <Card key={o.name}>
            <h3 className="text-xl font-semibold">{o.name}</h3>
            <p className="mt-2 text-slate-600">{o.role}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
