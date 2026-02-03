"use client"

import { useEffect, useState } from "react"

type Barangay = {
  name: string
  slug: string
  description: string
  image?: string
  lat?: number
  lng?: number
}

const EMPTY: Barangay = {
  name: "",
  slug: "",
  description: "",
  image: "",
}

export default function AdminBarangayPage() {
  const [items, setItems] = useState<Barangay[]>([])
  const [form, setForm] = useState<Barangay>(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await fetch("/api/barangays")
    setItems(await res.json())
  }

  function slugify(v: string) {
    return v
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  async function save() {
    if (!form.name || !form.slug || !form.description) {
      alert("Missing fields")
      return
    }

    setSaving(true)

    const res = await fetch("/api/barangays", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    setSaving(false)

    if (!res.ok) {
      alert("Failed to save")
      return
    }

    setForm(EMPTY)
    load()
  }

  async function remove(slug: string) {
    if (!confirm("Delete this barangay?")) return

    const res = await fetch(`/api/barangays/${slug}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      alert("Delete failed")
      return
    }

    load()
  }

  return (
    <div className="max-w-4xl space-y-12">
      <h1 className="text-3xl font-bold">Manage Barangays</h1>

      <div className="border rounded-xl p-6 space-y-4 bg-white">
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: slugify(e.target.value),
            })
          }
        />

        <input
          className="input"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <textarea
          className="input"
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={save}
          disabled={saving}
          className="bg-green-700 text-white px-6 py-3 rounded"
        >
          {saving ? "Saving…" : "Add Barangay"}
        </button>
      </div>

      <div className="space-y-3">
        {items.map((b) => (
          <div
            key={b.slug}
            className="flex justify-between items-center border rounded p-4 bg-white"
          >
            <div>
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm text-slate-500">
                /barangays/{b.slug}
              </p>
            </div>
            <button
              onClick={() => remove(b.slug)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
