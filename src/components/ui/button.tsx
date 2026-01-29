import { ButtonHTMLAttributes } from "react"

export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className="
        rounded-xl
        bg-green-700
        px-8 py-4
        text-white text-base font-semibold
        shadow-lg
        transition
        hover:bg-green-800
        hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-green-600
      "
    />
  )
}
