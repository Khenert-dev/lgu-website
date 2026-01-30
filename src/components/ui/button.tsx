import { ButtonHTMLAttributes } from "react"

export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className = "", ...rest } = props

  return (
    <button
      {...rest}
      className={`
        relative overflow-hidden
        rounded-xl
        bg-gradient-to-r from-green-600 to-green-700
        px-8 py-4
        text-white text-base font-semibold
        shadow-lg
        transition-all duration-300
        hover:from-green-700 hover:to-green-800
        hover:-translate-y-0.5
        hover:shadow-2xl
        focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2
        active:translate-y-0 active:shadow-md
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <span className="relative z-10">{props.children}</span>

      <span
        className="
          absolute inset-0
          opacity-0 hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-br from-white/20 via-transparent to-black/10
        "
      />
    </button>
  )
}
