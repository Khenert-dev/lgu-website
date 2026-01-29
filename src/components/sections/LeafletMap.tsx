"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = L.map(mapRef.current).setView([16.45, 120.59], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map)

    L.marker([16.45, 120.59])
      .addTo(map)
      .bindPopup("La Trinidad")
      .openPopup()

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
    />
  )
}
