"use client"

import { useEffect, useState } from "react"

type Official = {
  name: string
  position: string
  photo?: string
}

type Barangay = {
  name: string
  slug: string
  description: string

  images: string[]
  famousFor: string[]

  lat?: number
  lng?: number
  officials?: Official[]
}

const EMPTY: Barangay = {
  name: "",
  slug: "",
  description: "",
  images: [],
  famousFor: [],
  officials: [],
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
    if (!form.name || !form.slug || !form.description || form.images.length === 0) {
      alert("Name, description, and at least one image are required")
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
    setForm({
      ...b,
      images: b.images ?? [],
      famousFor: b.famousFor ?? [],
      officials: b.officials ?? [],
    })
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
    <div className="max-w-5xl space-y-16">
      <h1 className="text-3xl font-bold">Manage Barangays</h1>

      {/* BASIC INFO */}
      <div className="border rounded-xl p-6 space-y-4 bg-white">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: editingSlug ? form.slug : slugify(e.target.value),
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
      </div>

      {/* IMAGES */}
      <div className="border rounded-xl p-6 bg-white space-y-4">
        <h2 className="text-xl font-semibold">Images (Carousel)</h2>

        {form.images.map((img, i) => (
          <div key={i} className="flex gap-3 items-center">
            <input
              className="input flex-1"
              placeholder="Image URL"
              value={img}
              onChange={(e) => {
                const images = [...form.images]
                images[i] = e.target.value
                setForm({ ...form, images })
              }}
            />
            <button
              className="text-red-600 text-sm"
              onClick={() => {
                const images = form.images.filter((_, idx) => idx !== i)
                setForm({ ...form, images })
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="border px-4 py-2 rounded"
          onClick={() =>
            setForm({ ...form, images: [...form.images, ""] })
          }
        >
          + Add Image
        </button>

        {form.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 pt-3">
            {form.images.map((img, i) => (
              img && (
                <img
                  key={i}
                  src={img}
                  className="h-24 w-full object-cover rounded"
                />
              )
            ))}
          </div>
        )}
      </div>

      {/* FAMOUS FOR */}
      <div className="border rounded-xl p-6 bg-white space-y-4">
        <h2 className="text-xl font-semibold">Famous For</h2>

        {form.famousFor.map((f, i) => (
          <div key={i} className="flex gap-3 items-center">
            <input
              className="input flex-1"
              placeholder="e.g. Strawberry Farms"
              value={f}
              onChange={(e) => {
                const famousFor = [...form.famousFor]
                famousFor[i] = e.target.value
                setForm({ ...form, famousFor })
              }}
            />
            <button
              className="text-red-600 text-sm"
              onClick={() => {
                const famousFor = form.famousFor.filter((_, idx) => idx !== i)
                setForm({ ...form, famousFor })
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="border px-4 py-2 rounded"
          onClick={() =>
            setForm({ ...form, famousFor: [...form.famousFor, ""] })
          }
        >
          + Add Item
        </button>
      </div>

      {/* OFFICIALS */}
      <div className="border rounded-xl p-6 bg-white space-y-4">
        <h2 className="text-xl font-semibold">Officials</h2>

        {form.officials!.map((o, i) => (
          <div key={i} className="grid gap-2 border p-4 rounded">
            <input
              className="input"
              placeholder="Name"
              value={o.name}
              onChange={(e) => {
                const officials = [...form.officials!]
                officials[i].name = e.target.value
                setForm({ ...form, officials })
              }}
            />
            <input
              className="input"
              placeholder="Position"
              value={o.position}
              onChange={(e) => {
                const officials = [...form.officials!]
                officials[i].position = e.target.value
                setForm({ ...form, officials })
              }}
            />
            <input
              className="input"
              placeholder="Photo URL"
              value={o.photo ?? ""}
              onChange={(e) => {
                const officials = [...form.officials!]
                officials[i].photo = e.target.value
                setForm({ ...form, officials })
              }}
            />
            <button
              className="text-red-600 text-sm self-end"
              onClick={() => {
                const officials = form.officials!.filter(
                  (_, idx) => idx !== i
                )
                setForm({ ...form, officials })
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="border px-4 py-2 rounded"
          onClick={() =>
            setForm({
              ...form,
              officials: [
                ...(form.officials ?? []),
                { name: "", position: "", photo: "" },
              ],
            })
          }
        >
          + Add Official
        </button>
      </div>

      {/* ACTIONS */}
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

      {/* LIST */}
      <div className="space-y-3">
        {items.map((b) => (
          <div
            key={b.slug}
            className="flex justify-between items-center border rounded p-4 bg-white"
          >
            <div className="flex items-center gap-4">
              {b.images?.[0] && (
                <img
                  src={b.images[0]}
                  alt={b.name}
                  className="h-12 w-12 rounded object-cover"
                />
              )}
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm text-slate-500">
                  /barangays/{b.slug}
                </p>
              </div>
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
