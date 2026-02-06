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
  officials: Official[]
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
    const res = await fetch("/api/barangays", { cache: "no-store" })
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

    const res = await fetch(
      editingSlug ? `/api/barangays/${editingSlug}` : "/api/barangays",
      {
        method: editingSlug ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    )

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
      name: b.name,
      slug: b.slug,
      description: b.description,
      images: b.images ?? [],
      famousFor: b.famousFor ?? [],
      lat: b.lat,
      lng: b.lng,
      officials: b.officials ?? [],
    })
    setEditingSlug(b.slug)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function remove(slug: string) {
    if (!confirm("Delete this barangay?")) return
    const res = await fetch(`/api/barangays/${slug}`, { method: "DELETE" })
    if (!res.ok) {
      alert("Delete failed")
      return
    }
    load()
  }

  return (
    <div className="max-w-5xl space-y-16">
      <h1 className="text-3xl font-bold">
        {editingSlug ? "Edit Barangay" : "Add Barangay"}
      </h1>

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

        <input className="input bg-slate-100" value={form.slug} disabled />

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
        <h2 className="text-xl font-semibold">Images</h2>

        {form.images.map((img, i) => (
          <div key={i} className="flex gap-3">
            <input
              className="input flex-1"
              value={img}
              placeholder="Image URL"
              onChange={(e) => {
                const images = [...form.images]
                images[i] = e.target.value
                setForm({ ...form, images })
              }}
            />
            <button
              className="text-red-600"
              onClick={() =>
                setForm({
                  ...form,
                  images: form.images.filter((_, idx) => idx !== i),
                })
              }
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
      </div>

      {/* FAMOUS FOR */}
      <div className="border rounded-xl p-6 bg-white space-y-4">
        <h2 className="text-xl font-semibold">Famous For</h2>

        {form.famousFor.map((f, i) => (
          <div key={i} className="flex gap-3">
            <input
              className="input flex-1"
              value={f}
              onChange={(e) => {
                const famousFor = [...form.famousFor]
                famousFor[i] = e.target.value
                setForm({ ...form, famousFor })
              }}
            />
            <button
              className="text-red-600"
              onClick={() =>
                setForm({
                  ...form,
                  famousFor: form.famousFor.filter((_, idx) => idx !== i),
                })
              }
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
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Officials</h2>
          <button
            className="border px-4 py-2 rounded"
            onClick={() =>
              setForm({
                ...form,
                officials: [
                  ...form.officials,
                  { name: "", position: "", photo: "" },
                ],
              })
            }
          >
            + Add Official
          </button>
        </div>

        {form.officials.map((o, i) => (
          <div key={i} className="grid gap-2 border p-4 rounded">
            <input
              className="input"
              placeholder="Name"
              value={o.name}
              onChange={(e) => {
                const officials = [...form.officials]
                officials[i].name = e.target.value
                setForm({ ...form, officials })
              }}
            />
            <input
              className="input"
              placeholder="Position"
              value={o.position}
              onChange={(e) => {
                const officials = [...form.officials]
                officials[i].position = e.target.value
                setForm({ ...form, officials })
              }}
            />
            <input
              className="input"
              placeholder="Photo URL"
              value={o.photo ?? ""}
              onChange={(e) => {
                const officials = [...form.officials]
                officials[i].photo = e.target.value
                setForm({ ...form, officials })
              }}
            />
            <button
              className="text-red-600 text-sm self-end"
              onClick={() =>
                setForm({
                  ...form,
                  officials: form.officials.filter((_, idx) => idx !== i),
                })
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        {editingSlug && (
          <button
            className="border px-5 py-2 rounded"
            onClick={() => {
              setForm(EMPTY)
              setEditingSlug(null)
            }}
          >
            Cancel
          </button>
        )}

        <button
          onClick={save}
          disabled={saving}
          className="bg-green-700 text-white px-6 py-3 rounded"
        >
          {saving ? "Saving…" : editingSlug ? "Update Barangay" : "Add Barangay"}
        </button>
      </div>

      {/* LIST */}
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

            <div className="flex gap-4">
              <button
                onClick={() => edit(b)}
                className="text-blue-600 font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => remove(b.slug)}
                className="text-red-600 font-semibold"
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
