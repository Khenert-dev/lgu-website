"use client"

const stats = [
  { label: "Barangays", value: "16" },
  { label: "Population", value: "140,000+" },
  { label: "Province Capital", value: "Benguet" },
  { label: "Known For", value: "Strawberries" },
]

export default function Stats() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-4xl font-bold text-green-700">
              {s.value}
            </p>
            <p className="mt-2 text-slate-600">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
