"use client"

import { useEffect, useState } from "react"

type Official = {
  _id?: string
  name: string
  role: string
  image?: string
  order: number
}

const EMPTY: Official = {
  name: "",
  role: "",
  image: "",
  order: 0,
}

export default function AdminOfficialsPage() {
  const [items, setItems] = useState<Official[]>([])
  const [form, setForm] = useState<Official>(EMPTY)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await fetch("/api/officials")
    const data = await res.json()
    setItems(data)
  }

  function edit(o: Official) {
    setEditingId(o._id!)
    setForm(o)
    setFile(null)
  }

  function reset() {
    setEditingId(null)
    setForm(EMPTY)
    setFile(null)
  }

  async function uploadFile(): Promise<string | undefined> {
    if (!file) return form.image

    const data = new FormData()
    data.append("file", file)

    const res = await fetch("/api/upload/officials", {
      method: "POST",
      body: data,
    })

    const json = await res.json()
    return json.url
  }

  async function save() {
    if (!form.name || !form.role) {
      alert("Name and role required")
      return
    }

    setSaving(true)

    const imageUrl = await uploadFile()

    const payload = {
      ...form,
      image: imageUrl,
    }

    const url = editingId
      ? `/api/officials/${editingId}`
      : "/api/officials"

    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    reset()
    load()
    setSaving(false)
  }

  async function remove(id?: string) {
    if (!id) return
    if (!confirm("Delete this official?")) return

    await fetch(`/api/officials/${id}`, {
      method: "DELETE",
    })

    load()
  }

  return (
    <div className="max-w-5xl space-y-12">
      <h1 className="text-3xl font-bold text-green-800">
        Manage Officials
      </h1>

      {/* FORM */}
      <section className="space-y-4 border p-6 rounded-xl bg-white">
        <h2 className="font-semibold">
          {editingId ? "Edit Official" : "Add Official"}
        </h2>

        <input
          className="input"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Role (e.g. Municipal Mayor)"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        />

        {/* IMAGE URL */}
        <input
          className="input"
          placeholder="Image URL (optional)"
          value={form.image || ""}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        {/* FILE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] ?? null)
          }
        />

        {(file || form.image) && (
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : form.image
            }
            alt="Preview"
            className="h-40 w-40 rounded-full object-cover border"
          />
        )}

        <input
          type="number"
          className="input"
          placeholder="Order"
          value={form.order}
          onChange={(e) =>
            setForm({
              ...form,
              order: Number(e.target.value),
            })
          }
        />

        <div className="flex gap-4">
          {editingId && (
            <button
              onClick={reset}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="btn-primary"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </section>

      {/* LIST */}
      <section className="space-y-3">
        {items.map((o) => (
          <div
            key={o._id}
            className="flex justify-between items-center border p-4 rounded-lg bg-white"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  o.image || "/images/avatar-placeholder.png"
                }
                alt={o.name}
                className="h-12 w-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold">{o.name}</p>
                <p className="text-sm text-slate-500">
                  {o.role}
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-sm">
              <button
                onClick={() => edit(o)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => remove(o._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
