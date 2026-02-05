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
  markers = [],
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
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
      preferCanvas: true,
    })

    mapRef.current = map

    L.control.zoom({ position: "bottomright" }).addTo(map)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)

    markersLayerRef.current = L.layerGroup().addTo(map)

    setTimeout(() => map.invalidateSize(), 300)

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
        <div style="position:relative">
          <span style="
            position:absolute;
            inset:-10px;
            border-radius:9999px;
            background:rgba(34,197,94,0.25);
            animation:pulse 2s infinite;
          "></span>
          <span style="
            position:relative;
            display:block;
            height:14px;
            width:14px;
            border-radius:9999px;
            background:#16a34a;
            border:2px solid white;
            box-shadow:0 6px 16px rgba(0,0,0,0.35);
          "></span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })

    for (const b of markers) {
      const marker = L.marker([b.lat, b.lng], { icon })

      marker.on("click", () => {
        router.push(`/barangays/${b.slug}`)
      })

      marker.bindPopup(`
        <div style="text-align:center;padding:6px 8px">
          <div style="font-weight:600;color:#14532d">${b.name}</div>
          <div style="font-size:12px;color:#64748b">View barangay</div>
        </div>
      `)

      marker.addTo(markersLayerRef.current)
    }
  }, [markers, router])

  /* ================= FOCUS ================= */
  useEffect(() => {
    if (!mapRef.current || lat == null || lng == null) return
    mapRef.current.flyTo([lat, lng], 15, {
      animate: true,
      duration: 1.2,
    })
  }, [lat, lng])

  return (
    <div
      ref={containerRef}
      className="
        relative
        w-full
        h-[520px]
        rounded-3xl
        overflow-hidden
        bg-white
        ring-1 ring-slate-200
        shadow-[0_45px_120px_-45px_rgba(0,0,0,0.9)]
      "
    />
  )
}
