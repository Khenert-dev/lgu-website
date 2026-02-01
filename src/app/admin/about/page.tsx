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
  const [values, setValues] = useState<string[]>([])
  const [sealMeaning, setSealMeaning] = useState("")
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
        setValues(Array.isArray(d.values) ? d.values : [])
        setSealMeaning(d.sealMeaning ?? "")
        setHistory(Array.isArray(d.history) ? d.history : [])
      }
      setLoading(false)
    }
    load()
  }, [])

  function updateHistory(index: number, key: keyof HistoryItem, value: string) {
    const copy = [...history]
    copy[index] = { ...copy[index], [key]: value }
    setHistory(copy)
  }

  async function save() {
    setSaving(true)

    await setDoc(doc(db, "pages", "about"), {
      overview,
      role,
      mission,
      vision,
      values,
      sealMeaning,
      history,
      updatedAt: serverTimestamp(),
    })

    setSaving(false)
    alert("About page saved")
  }

  if (loading) {
    return <p className="text-slate-500">Loading editor…</p>
  }

  return (
    <div className="max-w-5xl space-y-12">
      <h1 className="text-3xl font-bold text-green-800">
        Edit About Page
      </h1>

      {/* OVERVIEW */}
      <Section title="Overview">
        <Textarea value={overview} onChange={setOverview} />
      </Section>

      {/* ROLE */}
      <Section title="Role in the Province">
        <Textarea value={role} onChange={setRole} />
      </Section>

      {/* MISSION / VISION */}
      <div className="grid md:grid-cols-2 gap-8">
        <Section title="Mission">
          <Textarea value={mission} onChange={setMission} />
        </Section>

        <Section title="Vision">
          <Textarea value={vision} onChange={setVision} />
        </Section>
      </div>

      {/* VALUES */}
      <Section title="Core Values">
        <div className="space-y-2">
          {values.map((v, i) => (
            <input
              key={i}
              value={v}
              onChange={(e) => {
                const copy = [...values]
                copy[i] = e.target.value
                setValues(copy)
              }}
              className="w-full border rounded-lg p-2"
            />
          ))}
          <button
            onClick={() => setValues([...values, ""])}
            className="text-sm text-green-700"
          >
            + Add value
          </button>
        </div>
      </Section>

      {/* HISTORY */}
      <Section title="Historical Timeline">
        <div className="space-y-6">
          {history.map((h, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-2">
              <input
                placeholder="Year"
                value={h.year}
                onChange={(e) =>
                  updateHistory(i, "year", e.target.value)
                }
                className="w-full border rounded p-2"
              />
              <input
                placeholder="Title"
                value={h.title}
                onChange={(e) =>
                  updateHistory(i, "title", e.target.value)
                }
                className="w-full border rounded p-2"
              />
              <textarea
                placeholder="Description"
                value={h.description}
                onChange={(e) =>
                  updateHistory(i, "description", e.target.value)
                }
                rows={4}
                className="w-full border rounded p-2"
              />
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
            + Add timeline entry
          </button>
        </div>
      </Section>

      {/* SEAL */}
      <Section title="Municipal Seal Meaning">
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

/* ---------- small helpers ---------- */

function Section({
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={6}
      className="w-full border rounded-lg p-4"
    />
  )
}
