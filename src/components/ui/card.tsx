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
        relative overflow-hidden
        rounded-3xl
        border border-green-300/40
        bg-white/70 backdrop-blur-xl
        p-6
        shadow-lg
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-2xl
        hover:border-green-500/70
        group
        `,
        className
      )}
    >
      <div
        className="
          absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          bg-gradient-to-br
          from-green-200/40 via-transparent to-green-400/40
          pointer-events-none
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
