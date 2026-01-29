import { ReactNode } from "react"

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="glass glass-hover rounded-2xl p-10">
      {children}
    </div>
  )
}
