"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = L.map(mapRef.current).setView([16.45, 120.59], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

    L.marker([16.45, 120.59])
      .addTo(map)
      .bindPopup("La Trinidad")

    return () => {
      map.remove()
    }
  }, [])

  return <div ref={mapRef} className="h-full w-full" />
}
