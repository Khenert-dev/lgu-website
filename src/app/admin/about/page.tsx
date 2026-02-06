"use client"

import { useEffect, useState } from "react"
import Card from "@/components/ui/card"

type HistoryItem = {
  year: string
  title: string
  description: string
}

type AboutData = {
  overview: string
  role: string
  mission: string
  vision: string
  values: string[]
  sealMeaning: string
  history: HistoryItem[]
}

const EMPTY: AboutData = {
  overview: "",
  role: "",
  mission: "",
  vision: "",
  values: [],
  sealMeaning: "",
  history: [],
}

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<null | "saved" | "error">(null)

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => d && setData({ ...EMPTY, ...d }))
      .finally(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    setStatus(null)

    const res = await fetch("/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setSaving(false)
    setStatus(res.ok ? "saved" : "error")
  }

  if (loading) {
    return (
      <div className="max-w-5xl">
        <Card className="p-8 text-sm text-gray-500">
          Loading About content…
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-8 pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          About Page Content
        </h1>
        <StatusBadge status={status} />
      </header>

      <Section title="Overview">
        <Textarea
          value={data.overview}
          onChange={(v) => set("overview", v)}
        />
      </Section>

      <Section title="Role in the Province">
        <Textarea
          value={data.role}
          onChange={(v) => set("role", v)}
        />
      </Section>

      <Section title="Mission">
        <Textarea
          value={data.mission}
          onChange={(v) => set("mission", v)}
        />
      </Section>

      <Section title="Vision">
        <Textarea
          value={data.vision}
          onChange={(v) => set("vision", v)}
        />
      </Section>

      <Section title="Core Values">
        {data.values.length === 0 && (
          <EmptyHint text="No values added yet." />
        )}

        <div className="space-y-2">
          {data.values.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="input flex-1"
                value={v}
                onChange={(e) => {
                  set("values", (prev) =>
                    prev.map((x, idx) =>
                      idx === i ? e.target.value : x
                    )
                  )
                }}
              />
              <DangerButton
                onClick={() =>
                  set("values", (prev) =>
                    prev.filter((_, idx) => idx !== i)
                  )
                }
              >
                Remove
              </DangerButton>
            </div>
          ))}

          <ActionButton
            onClick={() =>
              set("values", (prev) => [...prev, ""])
            }
          >
            + Add Value
          </ActionButton>
        </div>
      </Section>

      <Section title="History Timeline">
        {data.history.length === 0 && (
          <EmptyHint text="No history entries yet." />
        )}

        <div className="space-y-4">
          {data.history.map((h, i) => (
            <Card key={i} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="input"
                  placeholder="Year"
                  value={h.year}
                  onChange={(e) =>
                    updHistory(i, "year", e.target.value)
                  }
                />
                <input
                  className="input"
                  placeholder="Title"
                  value={h.title}
                  onChange={(e) =>
                    updHistory(i, "title", e.target.value)
                  }
                />
              </div>

              <textarea
                className="input"
                rows={3}
                placeholder="Description"
                value={h.description}
                onChange={(e) =>
                  updHistory(i, "description", e.target.value)
                }
              />

              <DangerButton
                onClick={() =>
                  set("history", (prev) =>
                    prev.filter((_, idx) => idx !== i)
                  )
                }
              >
                Remove Entry
              </DangerButton>
            </Card>
          ))}

          <ActionButton
            onClick={() =>
              set("history", (prev) => [
                ...prev,
                { year: "", title: "", description: "" },
              ])
            }
          >
            + Add History Entry
          </ActionButton>
        </div>
      </Section>

      <Section title="Municipal Seal Meaning">
        <Textarea
          value={data.sealMeaning}
          onChange={(v) => set("sealMeaning", v)}
        />
      </Section>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-end gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="bg-green-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )

  function set<K extends keyof AboutData>(
    k: K,
    v:
      | AboutData[K]
      | ((prev: AboutData[K]) => AboutData[K])
  ) {
    setData((prev) => ({
      ...prev,
      [k]: typeof v === "function" ? v(prev[k]) : v,
    }))
  }

  function updHistory(
    i: number,
    k: keyof HistoryItem,
    v: string
  ) {
    set("history", (prev) =>
      prev.map((h, idx) =>
        idx === i ? { ...h, [k]: v } : h
      )
    )
  }
}

/* ================= UI ================= */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-lg font-medium">{title}</h2>
      {children}
    </Card>
  )
}

function Textarea({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <textarea
      className="input"
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function ActionButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="text-sm text-green-700 hover:underline"
    >
      {children}
    </button>
  )
}

function DangerButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="text-sm text-red-600 hover:underline"
    >
      {children}
    </button>
  )
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="text-sm text-gray-500">
      {text}
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: null | "saved" | "error"
}) {
  if (!status) return null

  return (
    <span
      className={`text-sm ${
        status === "saved"
          ? "text-green-700"
          : "text-red-600"
      }`}
    >
      {status === "saved" ? "Saved" : "Save failed"}
    </span>
  )
}
