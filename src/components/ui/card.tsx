import { ReactNode } from "react"
import { cn } from "../../lib/utils"

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        `
        group relative overflow-hidden
        rounded-3xl
        bg-white
        border border-slate-200/60
        p-6
        shadow-[0_12px_32px_-18px_rgba(0,0,0,0.25)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]
        `,
        className
      )}
    >
      {/* GREEN GLOW RING (HOVER ONLY) */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-3xl
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
          ring-1 ring-green-500/40
          shadow-[0_0_0_0_rgba(34,197,94,0),0_25px_60px_rgba(34,197,94,0.35)]
        "
      />

      {/* SOFT SURFACE SHEEN */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-br
          from-white/60
          via-transparent
          to-green-50/40
          opacity-60
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
