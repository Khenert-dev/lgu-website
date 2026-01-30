"use client"

import dynamic from "next/dynamic"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

export default function BarangayMap() {
  return (
    <section className="relative max-w-7xl mx-auto px-8 py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 pointer-events-none" />

      <div className="relative">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-10">
          Barangay Map
        </h2>

        <div
          className="
            relative h-[450px]
            rounded-3xl
            overflow-hidden
            border border-green-300/40
            bg-white/60 backdrop-blur-xl
            shadow-2xl
          "
        >
          <LeafletMap />

          <div
            className="
              absolute bottom-5 left-5
              rounded-2xl
              border border-green-300/40
              bg-white/80 backdrop-blur-md
              px-5 py-4
              shadow-lg
            "
          >
            <p className="font-semibold text-green-800 mb-2">
              Legend
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="inline-block h-3 w-3 rounded-full bg-green-600 ring-2 ring-green-300" />
              <span>Barangay Center</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
