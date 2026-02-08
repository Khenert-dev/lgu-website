"use client"

import { useState } from "react"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export default function AiChatbox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I can help with municipal services, office hours, and local advisories. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const nextMessages = [...messages, { role: "user", content: trimmed }]
    setMessages(nextMessages)
    setInput("")
    setIsLoading(true)
    setError("")

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: nextMessages }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      setError(data?.error ?? "Unable to reach the AI assistant right now.")
      setIsLoading(false)
      return
    }

    const data = await res.json()
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.reply ?? "Thanks for your message. We'll follow up shortly.",
      },
    ])
    setIsLoading(false)
  }

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_40px_-18px_rgba(16,185,129,0.4)]">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
          AI Citizen Concierge
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">
          Ask about services, permits, or advisories
        </h3>
        <p className="text-sm text-slate-600">
          Powered by a live AI endpoint for immediate answers and routing.
        </p>
      </div>

      <div className="mt-6 max-h-80 space-y-4 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-2xl px-4 py-3 text-sm ${
              message.role === "assistant"
                ? "bg-white text-slate-700 shadow-sm"
                : "bg-green-600 text-white"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-3 text-xs font-semibold text-rose-600">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Ask about permits, schedules, or services..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-green-500 focus:outline-none"
        />
        <Button
          onClick={handleSend}
          className="bg-green-700 hover:bg-green-800 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </Card>
  )
}
