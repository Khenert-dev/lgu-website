import { NextResponse } from "next/server"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

type OpenAIMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY for AI responses." },
      { status: 400 }
    )
  }

  const body = await req.json()
  const messages = (body?.messages ?? []) as ChatMessage[]

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Messages payload is required." },
      { status: 400 }
    )
  }

  const systemMessage: OpenAIMessage = {
    role: "system",
    content:
      "You are the official AI assistant for the Municipality of La Trinidad. " +
      "Answer questions about municipal services, offices, barangays, events, and advisories. " +
      "Be concise, friendly, and accurate. If the answer is not available, say so and suggest where to ask.",
  }
  const messagesForOpenAI: OpenAIMessage[] = [systemMessage, ...messages]

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: messagesForOpenAI,
      temperature: 0.4,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return NextResponse.json(
      { error: errorText || "AI service error." },
      { status: response.status }
    )
  }

  const data = await response.json()
  const reply = data?.choices?.[0]?.message?.content?.trim()

  return NextResponse.json({ reply })
}
