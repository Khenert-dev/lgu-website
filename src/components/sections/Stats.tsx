"use client"

import { useEffect, useState } from "react"

const stats = [
  { label: "Barangays", value: 16 },
  { label: "Population", value: 137404 },
  { label: "Municipal Offices", value: 18 },
  { label: "Public Services", value: 42 },
]

export default function Stats() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass rounded-2xl p-8 text-center glass-hover"
          >
            <div className="text-4xl font-bold text-green-700">
              {visible ? s.value.toLocaleString() : 0}
            </div>
            <p className="mt-2 text-slate-600 text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
