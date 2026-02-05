"use client"

import { useEffect, useState } from "react"

type Office = {
  _id?: string
  name: string
  description: string
  image?: string
  order?: number
}

const EMPTY: Office = {
  name: "",
  description: "",
  image: "",
  order: 0,
}

export default function AdminOfficesPage() {
  const [items, setItems] = useState<Office[]>([])
  const [form, setForm] = useState<Office>(EMPTY)
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await fetch("/api/offices")
    setItems(await res.json())
  }

  async function uploadImage(): Promise<string | undefined> {
    if (!file) return form.image

    const data = new FormData()
    data.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    })

    if (!res.ok) throw new Error("Upload failed")
    const json = await res.json()
    return json.url
  }

  async function save() {
    if (!form.name || !form.description) {
      alert("Name and description are required")
      return
    }

    setSaving(true)

    try {
      const image = await uploadImage()

      const res = await fetch(
        editingId ? `/api/offices/${editingId}` : "/api/offices",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            description: form.description,
            image,
            order: form.order,
          }),
        }
      )

      if (!res.ok) throw new Error("Save failed")

      reset()
      load()
    } catch {
      alert("Failed to save office")
    } finally {
      setSaving(false)
    }
  }

  function edit(o: Office) {
    setForm(o)
    setEditingId(o._id!)
    setFile(null)
  }

  function reset() {
    setForm(EMPTY)
    setEditingId(null)
    setFile(null)
  }

  async function remove(id?: string) {
    if (!id) return
    if (!confirm("Delete this office?")) return
    await fetch(`/api/offices/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div className="max-w-4xl space-y-14">

      <h1 className="text-3xl font-bold">Manage Offices</h1>

      {/* FORM */}
      <div className="rounded-3xl border bg-white p-8 space-y-5">
        <input
          className="input"
          placeholder="Office name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
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
          type="number"
          className="input"
          placeholder="Display order (lower = higher)"
          value={form.order ?? ""}
          onChange={(e) =>
            setForm({ ...form, order: Number(e.target.value) })
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
            className="h-24 object-contain border rounded"
          />
        )}

        <div className="flex gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="bg-green-700 text-white px-6 py-3 rounded"
          >
            {saving
              ? "Saving…"
              : editingId
              ? "Update Office"
              : "Add Office"}
          </button>

          {editingId && (
            <button
              onClick={reset}
              className="border px-6 py-3 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {items.map((o) => (
          <div
            key={o._id}
            className="flex justify-between items-center rounded-xl border bg-white p-4"
          >
            <div>
              <p className="font-semibold">
                {o.order}. {o.name}
              </p>
              <p className="text-sm text-slate-600">
                {o.description}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => edit(o)}
                className="text-green-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => remove(o._id)}
                className="text-red-600 text-sm"
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
