"use client"

import dynamic from "next/dynamic"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

export default function BarangayMap() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Barangay Map
      </h2>

      <div className="relative h-[450px] rounded-2xl overflow-hidden glass">
        <LeafletMap />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md rounded-xl px-4 py-3 text-sm shadow">
          <p className="font-semibold mb-1">Legend</p>
          <p>📍 Barangay Center</p>
        </div>
      </div>
    </section>
  )
}
