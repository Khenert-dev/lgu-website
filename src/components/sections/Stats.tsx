"use client"

const stats = [
  { label: "Barangays", value: "16" },
  { label: "Population", value: "140,000+" },
  { label: "Province Capital", value: "Benguet" },
  { label: "Known For", value: "Strawberries" },
]

export default function Stats() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50" />

      <div className="relative max-w-7xl mx-auto px-8 grid gap-10 md:grid-cols-4 text-center">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="
              relative group
              rounded-3xl
              border border-green-300/40
              bg-white/70 backdrop-blur-xl
              p-10
              shadow-lg
              transition-all duration-500
              hover:-translate-y-2
              hover:shadow-2xl
              hover:border-green-500/70
            "
          >
            <div
              className="
                absolute inset-0
                rounded-3xl
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
                bg-gradient-to-br
                from-green-200/40 via-transparent to-green-400/40
              "
            />

            <span
              className={`
                absolute top-0 left-0 h-1 w-full rounded-t-3xl
                bg-gradient-to-r
                ${i === 0 && "from-green-400 to-emerald-600"}
                ${i === 1 && "from-emerald-400 to-teal-600"}
                ${i === 2 && "from-teal-400 to-green-600"}
                ${i === 3 && "from-green-500 to-lime-600"}
              `}
            />

            <div className="relative z-10">
              <p className="text-4xl font-bold text-green-800 tracking-tight">
                {s.value}
              </p>
              <p className="mt-3 text-slate-600 text-lg">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
