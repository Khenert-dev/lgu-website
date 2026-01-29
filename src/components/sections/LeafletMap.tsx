"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const BARANGAYS = [
  { name: "Poblacion", coords: [16.456, 120.590] },
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
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

    BARANGAYS.forEach((b) => {
      L.marker(b.coords as [number, number])
        .addTo(map)
        .bindPopup(b.name)
    })

    return () => {
      map.remove()
    }
  }, [])

  return <div ref={ref} className="h-full w-full" />
}
