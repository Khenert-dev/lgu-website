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
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
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

    const url = editingSlug
      ? `/api/barangays/${editingSlug}`
      : "/api/barangays"

    const method = editingSlug ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug: form.slug.toLowerCase().trim(),
      }),
    })

    setSaving(false)

    if (!res.ok) {
      alert("Failed to save")
      return
    }

    setForm(EMPTY)
    setEditingSlug(null)
    load()
  }

  function edit(b: Barangay) {
    setForm(b)
    setEditingSlug(b.slug)
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
              slug: editingSlug
                ? form.slug
                : slugify(e.target.value),
            })
          }
        />

        <input
          className="input bg-slate-100 cursor-not-allowed"
          placeholder="Slug"
          value={form.slug}
          disabled
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

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            className="input"
            placeholder="Latitude"
            value={form.lat ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                lat:
                  e.target.value === ""
                    ? undefined
                    : Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            className="input"
            placeholder="Longitude"
            value={form.lng ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                lng:
                  e.target.value === ""
                    ? undefined
                    : Number(e.target.value),
              })
            }
          />
        </div>

        <div className="flex gap-3">
          {editingSlug && (
            <button
              onClick={() => {
                setForm(EMPTY)
                setEditingSlug(null)
              }}
              className="border px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}

          <button
            onClick={save}
            disabled={saving}
            className="bg-green-700 text-white px-6 py-3 rounded"
          >
            {saving
              ? "Saving…"
              : editingSlug
              ? "Update Barangay"
              : "Add Barangay"}
          </button>
        </div>
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

            <div className="flex gap-3 text-sm">
              <button
                onClick={() => edit(b)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => remove(b.slug)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
