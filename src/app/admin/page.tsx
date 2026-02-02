"use client"

import { useEffect, useState } from "react"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

type HistoryItem = {
  year: string
  title: string
  description: string
}

export default function AdminAboutPage() {
  const [overview, setOverview] = useState("")
  const [role, setRole] = useState("")
  const [mission, setMission] = useState("")
  const [vision, setVision] = useState("")
  const [sealMeaning, setSealMeaning] = useState("")
  const [values, setValues] = useState<string[]>([])
  const [history, setHistory] = useState<HistoryItem[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "pages", "about"))
      if (snap.exists()) {
        const d = snap.data()
        setOverview(d.overview ?? "")
        setRole(d.role ?? "")
        setMission(d.mission ?? "")
        setVision(d.vision ?? "")
        setSealMeaning(d.sealMeaning ?? "")
        setValues(d.values ?? [])
        setHistory(d.history ?? [])
      }
      setLoading(false)
    }
    load()
  }, [])

  async function save() {
    setSaving(true)

    await setDoc(
      doc(db, "pages", "about"),
      {
        overview,
        role,
        mission,
        vision,
        sealMeaning,
        values,
        history,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    setSaving(false)
    alert("About page updated successfully")
  }

  if (loading) {
    return <p>Loading editor…</p>
  }

  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl font-bold text-green-800">
        Edit About Page
      </h1>

      {/* OVERVIEW */}
      <Section label="Overview">
        <Textarea value={overview} onChange={setOverview} />
      </Section>

      {/* ROLE */}
      <Section label="Role in the Province">
        <Textarea value={role} onChange={setRole} />
      </Section>

      {/* MISSION */}
      <Section label="Mission">
        <Textarea value={mission} onChange={setMission} />
      </Section>

      {/* VISION */}
      <Section label="Vision">
        <Textarea value={vision} onChange={setVision} />
      </Section>

      {/* VALUES */}
      <Section label="Core Values">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={v}
              onChange={(e) => {
                const copy = [...values]
                copy[i] = e.target.value
                setValues(copy)
              }}
              className="flex-1 border rounded p-2"
            />
            <button
              onClick={() =>
                setValues(values.filter((_, idx) => idx !== i))
              }
              className="text-red-600"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={() => setValues([...values, ""])}
          className="text-sm text-green-700"
        >
          + Add value
        </button>
      </Section>

      {/* HISTORY */}
      <Section label="History Timeline">
        {history.map((h, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-2">
            <input
              placeholder="Year"
              value={h.year}
              onChange={(e) => {
                const copy = [...history]
                copy[i].year = e.target.value
                setHistory(copy)
              }}
              className="w-full border rounded p-2"
            />

            <input
              placeholder="Title"
              value={h.title}
              onChange={(e) => {
                const copy = [...history]
                copy[i].title = e.target.value
                setHistory(copy)
              }}
              className="w-full border rounded p-2"
            />

            <textarea
              placeholder="Description"
              value={h.description}
              onChange={(e) => {
                const copy = [...history]
                copy[i].description = e.target.value
                setHistory(copy)
              }}
              className="w-full border rounded p-2"
              rows={3}
            />

            <button
              onClick={() =>
                setHistory(history.filter((_, idx) => idx !== i))
              }
              className="text-sm text-red-600"
            >
              Remove entry
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setHistory([
              ...history,
              { year: "", title: "", description: "" },
            ])
          }
          className="text-sm text-green-700"
        >
          + Add history entry
        </button>
      </Section>

      {/* SEAL */}
      <Section label="Municipal Seal Meaning">
        <Textarea value={sealMeaning} onChange={setSealMeaning} />
      </Section>

      <button
        onClick={save}
        disabled={saving}
        className="bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  )
}

/* ---------- helpers ---------- */

function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">{label}</h2>
      {children}
    </div>
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full border rounded-lg p-3"
    />
  )
}
