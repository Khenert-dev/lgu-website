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
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => d && setData({ ...EMPTY, ...d }))
  }, [])

  async function save() {
    setSaving(true)

    const res = await fetch("/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setSaving(false)
    if (!res.ok) alert("Save failed")
    else alert("Saved")
  }

  return (
    <div className="max-w-5xl space-y-12">
      <h1 className="text-3xl font-bold text-green-800">
        Edit About Page
      </h1>

      {/* ================= OVERVIEW ================= */}
      <EditorSection title="Overview (Header Text)">
        <Textarea
          value={data.overview}
          onChange={(v) => set("overview", v)}
        />
      </EditorSection>

      {/* ================= ROLE ================= */}
      <EditorSection title="Role in the Province">
        <Textarea
          value={data.role}
          onChange={(v) => set("role", v)}
        />
      </EditorSection>

      {/* ================= MISSION / VISION / VALUES ================= */}
      <EditorSection title="Mission">
        <Textarea
          value={data.mission}
          onChange={(v) => set("mission", v)}
        />
      </EditorSection>

      <EditorSection title="Vision">
        <Textarea
          value={data.vision}
          onChange={(v) => set("vision", v)}
        />
      </EditorSection>

      <EditorSection title="Core Values">
        <div className="space-y-2">
          {data.values.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="input flex-1"
                value={v}
                onChange={(e) => {
                  const copy = [...data.values]
                  copy[i] = e.target.value
                  set("values", copy)
                }}
              />
              <button
                onClick={() =>
                  set(
                    "values",
                    data.values.filter((_, idx) => idx !== i)
                  )
                }
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => set("values", [...data.values, ""])}
            className="text-sm text-green-700"
          >
            + Add Value
          </button>
        </div>
      </EditorSection>

      {/* ================= HISTORY ================= */}
      <EditorSection title="History Timeline">
        <div className="space-y-4">
          {data.history.map((h, i) => (
            <Card key={i} className="p-4 space-y-2">
              <input
                className="input"
                placeholder="Year"
                value={h.year}
                onChange={(e) => updHistory(i, "year", e.target.value)}
              />
              <input
                className="input"
                placeholder="Title"
                value={h.title}
                onChange={(e) => updHistory(i, "title", e.target.value)}
              />
              <textarea
                className="input"
                rows={3}
                placeholder="Description"
                value={h.description}
                onChange={(e) =>
                  updHistory(i, "description", e.target.value)
                }
              />
              <button
                onClick={() =>
                  set(
                    "history",
                    data.history.filter((_, idx) => idx !== i)
                  )
                }
                className="text-sm text-red-600"
              >
                Remove
              </button>
            </Card>
          ))}

          <button
            onClick={() =>
              set("history", [
                ...data.history,
                { year: "", title: "", description: "" },
              ])
            }
            className="text-sm text-green-700"
          >
            + Add History Entry
          </button>
        </div>
      </EditorSection>

      {/* ================= SEAL ================= */}
      <EditorSection title="Municipal Seal Meaning">
        <Textarea
          value={data.sealMeaning}
          onChange={(v) => set("sealMeaning", v)}
        />
      </EditorSection>

      <button
        onClick={save}
        disabled={saving}
        className="bg-green-700 text-white px-8 py-3 rounded-lg"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  )

  function set<K extends keyof AboutData>(k: K, v: AboutData[K]) {
    setData({ ...data, [k]: v })
  }

  function updHistory(
    i: number,
    k: keyof HistoryItem,
    v: string
  ) {
    const copy = [...data.history]
    copy[i] = { ...copy[i], [k]: v }
    set("history", copy)
  }
}

/* ================= UI HELPERS ================= */

function EditorSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-green-800">
        {title}
      </h2>
      {children}
    </section>
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
