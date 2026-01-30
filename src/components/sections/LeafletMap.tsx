"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const BARANGAYS = [
  { name: "Poblacion", coords: [16.456, 120.59] },
  { name: "Balili", coords: [16.468, 120.596] },
  { name: "Buyagan", coords: [16.452, 120.603] },
]

export default function LeafletMap() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const map = L.map(ref.current, {
      center: [16.45, 120.59],
      zoom: 13,
      scrollWheelZoom: false,
      zoomControl: false,
    })

    L.control.zoom({ position: "bottomright" }).addTo(map)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)

    const icon = L.divIcon({
      className: "",
      html: `
        <div class="relative">
          <span class="absolute -inset-2 rounded-full bg-green-400/30 animate-ping"></span>
          <span class="relative block h-4 w-4 rounded-full bg-green-600 border-2 border-white shadow-lg"></span>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    })

    BARANGAYS.forEach((b) => {
      L.marker(b.coords as [number, number], { icon })
        .addTo(map)
        .bindPopup(
          `<div class="text-center">
             <p class="font-semibold text-green-800">${b.name}</p>
             <p class="text-xs text-slate-500">Barangay</p>
           </div>`
        )
    })

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div
      ref={ref}
      className="
        h-full w-full
        rounded-3xl
        overflow-hidden
        border border-green-300/40
        shadow-xl
      "
    />
  )
}
