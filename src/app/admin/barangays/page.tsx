"use client"

import { useEffect, useState } from "react"

type Barangay = {
  _id?: string
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

export default function AdminBarangaysPage() {
  const [items, setItems] = useState<Barangay[]>([])
  const [form, setForm] = useState<Barangay>(EMPTY)
  const [file, setFile] = useState<File | null>(null)
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

  async function upload(): Promise<string | undefined> {
    if (!file) return form.image
    const data = new FormData()
    data.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: data })
    const json = await res.json()
    return json.url
  }

  async function save() {
    if (!form.name || !form.slug || !form.description) {
      alert("Required fields missing")
      return
    }

    setSaving(true)
    try {
      const image = await upload()

      await fetch("/api/barangays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image }),
      })

      setForm(EMPTY)
      setFile(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  async function remove(id?: string) {
    if (!id) return
    if (!confirm("Delete this barangay?")) return
    await fetch(`/api/barangays/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div className="max-w-4xl space-y-14">
      <h1 className="text-3xl font-bold">Manage Barangays</h1>

      <div className="rounded-2xl border bg-white p-8 space-y-4">
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

        <input
          className="input"
          placeholder="Image URL (optional)"
          value={form.image || ""}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] ?? null)
          }
        />

        {(file || form.image) && (
          <img
            src={file ? URL.createObjectURL(file) : form.image}
            className="h-32 rounded object-cover border"
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Latitude"
            type="number"
            value={form.lat ?? ""}
            onChange={(e) =>
              setForm({ ...form, lat: Number(e.target.value) })
            }
          />
          <input
            className="input"
            placeholder="Longitude"
            type="number"
            value={form.lng ?? ""}
            onChange={(e) =>
              setForm({ ...form, lng: Number(e.target.value) })
            }
          />
        </div>

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
            key={b._id}
            className="flex justify-between rounded-xl border bg-white p-4"
          >
            <div>
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm text-slate-500">
                /barangays/{b.slug}
              </p>
            </div>
            <button
              onClick={() => remove(b._id)}
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
