"use client"

import { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline"
}

export default function Button({
  variant = "solid",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-lg font-semibold transition focus:outline-none focus:ring-4 focus:ring-green-400/40",
        variant === "solid" &&
          "bg-green-700 text-white hover:bg-green-800 px-8 py-4",
        variant === "outline" &&
          "border-2 border-green-700 text-green-700 hover:bg-green-50 px-8 py-4",
        className
      )}
    />
  )
}
