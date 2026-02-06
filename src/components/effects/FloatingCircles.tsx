"use client"

import { useEffect, useState } from "react"

type Circle = {
  id: number
  size: number
  left: number
  top: number
  duration: number
  delay: number
}

export default function FloatingCircles() {
  const [circles, setCircles] = useState<Circle[]>([])

  useEffect(() => {
    const items: Circle[] = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      size: 160 + Math.random() * 260,
      left: Math.random() * 100,
      top: 100 + Math.random() * 40,
      duration: 22 + Math.random() * 20,
      delay: Math.random() * 8,
    }))

    setCircles(items)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {circles.map((c) => (
        <span
          key={c.id}
          style={{
            width: c.size,
            height: c.size,
            left: `${c.left}%`,
            bottom: `${c.top}%`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
          className="
            absolute
            rounded-full
            bg-gradient-to-br
            from-green-400/40
            via-emerald-300/30
            to-green-500/40
            blur-[120px]
            animate-float
          "
        />
      ))}
    </div>
  )
}
