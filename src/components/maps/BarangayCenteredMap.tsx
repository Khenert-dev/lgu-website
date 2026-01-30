"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type Props = {
  lat: number
  lng: number
  name: string
}

export default function BarangayCenteredMap({ lat, lng, name }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const map = L.map(ref.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(name)
      .openPopup()

    return () => {
      map.remove()
    }
  }, [lat, lng, name])

  return (
    <div
      ref={ref}
      className="
        h-[320px] w-full
        rounded-3xl
        overflow-hidden
        border border-green-300/40
        shadow-xl
      "
    />
  )
}
