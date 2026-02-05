"use client"

import dynamic from "next/dynamic"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

type Props = {
  lat?: number
  lng?: number
  name?: string
}

export default function BarangayMap({ lat, lng, name }: Props) {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-16">

      {/* HEADER */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 tracking-tight">
            Barangay Map
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Explore barangay locations and boundaries
          </p>
        </div>
      </div>

      {/* MAP CONTAINER */}
      <div
        className="
          relative h-[520px]
          rounded-2xl
          overflow-hidden
          bg-white
          border border-green-100
          shadow-sm
        "
      >
        {/* MAP */}
        <LeafletMap lat={lat} lng={lng} name={name} />

        {/* TOP GRADIENT FOR CONTROLS */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-green-900/20 to-transparent" />

        {/* INFO / LEGEND */}
        <div
          className="
            absolute bottom-5 left-5
            max-w-xs
            rounded-xl
            bg-white
            border border-green-100
            px-5 py-4
            shadow-md
          "
        >
          <p className="font-semibold text-green-900 mb-2">
            {name ? "Selected Barangay" : "Map Legend"}
          </p>

          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-600 ring-2 ring-green-200" />
            </span>
            <span>{name ?? "Barangay Center"}</span>
          </div>
        </div>

        {/* BOTTOM DEPTH FADE */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-green-900/10 to-transparent" />
      </div>
    </section>
  )
}
