"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type Marker = {
  name: string
  slug: string
  lat: number
  lng: number
}

type Props = {
  lat?: number
  lng?: number
  name?: string
  markers?: Marker[]
}

export default function LeafletMap({
  lat,
  lng,
  name,
  markers = [],
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (!ref.current || mapRef.current) return

    const map = L.map(ref.current, {
      center: [16.45, 120.59],
      zoom: 13,
      scrollWheelZoom: false,
      zoomControl: false,
    })

    mapRef.current = map

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
    })

    markers.forEach((b) => {
      const marker = L.marker([b.lat, b.lng], { icon }).addTo(map)

      marker.on("click", () => {
        router.push(`/barangays/${b.slug}`)
      })

      marker.bindPopup(
        `<div class="text-center">
           <p class="font-semibold text-green-800">${b.name}</p>
           <p class="text-xs text-slate-500">View barangay</p>
         </div>`
      )
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [markers, router])

  // focus when lat/lng provided
  useEffect(() => {
    if (!mapRef.current || !lat || !lng) return
    mapRef.current.flyTo([lat, lng], 15, { animate: true })
  }, [lat, lng])

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
