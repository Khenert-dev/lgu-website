"use client"

import dynamic from "next/dynamic"

const LeafletMap = dynamic(
  () => import("./LeafletMap"),
  { ssr: false }
)

export default function BarangayMap() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Barangay Map
      </h2>

      <div className="glass rounded-2xl overflow-hidden h-[420px]">
        <LeafletMap />
      </div>
    </section>
  )
}
