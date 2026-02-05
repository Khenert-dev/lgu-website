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
      <div className="max-w-7xl mx-auto px-8 grid gap-10 md:grid-cols-4 text-center">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="
              group
              relative
              rounded-3xl
              p-10
              bg-white
              border border-slate-200/60
              shadow-[0_18px_45px_-25px_rgba(0,0,0,0.25)]
              transition-all duration-300
              hover:-translate-y-2
              hover:shadow-[0_35px_80px_-30px_rgba(22,163,74,0.45)]
            "
          >
            {/* GREEN GLOW RING */}
            <div
              className="
                pointer-events-none
                absolute inset-0
                rounded-3xl
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
                ring-1 ring-green-400/40
                shadow-[0_0_0_1px_rgba(22,163,74,0.25),0_25px_60px_rgba(22,163,74,0.35)]
              "
            />

            {/* TOP ACCENT LINE */}
            <span
              className={`
                absolute top-0 left-6 right-6 h-[3px] rounded-full
                ${
                  i === 0
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : i === 1
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                    : i === 2
                    ? "bg-gradient-to-r from-teal-500 to-green-500"
                    : "bg-gradient-to-r from-green-600 to-lime-500"
                }
              `}
            />

            {/* CONTENT */}
            <div className="relative z-10">
              <p className="text-4xl font-extrabold text-green-900 tracking-tight">
                {s.value}
              </p>
              <p className="mt-3 text-slate-700 text-lg font-medium">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
