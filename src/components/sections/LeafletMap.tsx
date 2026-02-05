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

const DEFAULT_CENTER: [number, number] = [16.45, 120.59]

export default function LeafletMap({
  lat,
  lng,
  name,
  markers = [],
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // ⛔ do NOT type these — Leaflet typings are unreliable in Next
  const mapRef = useRef<any>(null)
  const markersLayerRef = useRef<any>(null)

  const router = useRouter()

  /* ================= INIT MAP ================= */
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: DEFAULT_CENTER,
      zoom: 13,
      scrollWheelZoom: false,
      zoomControl: false,
    })

    mapRef.current = map

    L.control.zoom({ position: "bottomright" }).addTo(map)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)

    markersLayerRef.current = L.layerGroup().addTo(map)

    setTimeout(() => {
      map.invalidateSize()
    }, 300)

    return () => {
      map.remove()
      mapRef.current = null
      markersLayerRef.current = null
    }
  }, [])

  /* ================= MARKERS ================= */
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return

    markersLayerRef.current.clearLayers()

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

    for (const b of markers) {
      const marker = L.marker([b.lat, b.lng], { icon })

      marker.on("click", () => {
        router.push(`/barangays/${b.slug}`)
      })

      marker.bindPopup(`
        <div style="text-align:center">
          <strong style="color:#166534">${b.name}</strong>
          <div style="font-size:12px;color:#64748b">View barangay</div>
        </div>
      `)

      marker.addTo(markersLayerRef.current)
    }
  }, [markers, router])

  /* ================= FOCUS ================= */
  useEffect(() => {
    if (!mapRef.current || lat == null || lng == null) return
    mapRef.current.flyTo([lat, lng], 15, { animate: true })
  }, [lat, lng])

  return (
    <div
      ref={containerRef}
      className="
        relative
        w-full
        h-[420px]
        rounded-3xl
        overflow-hidden
        border border-green-300/40
        shadow-xl
        bg-white
      "
    />
  )
}
