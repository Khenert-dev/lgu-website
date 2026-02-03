"use client"

import { useEffect, useState } from "react"

type Office = {
  _id?: string
  name: string
  description: string
  image?: string
}

const EMPTY: Office = {
  name: "",
  description: "",
  image: "",
}

export default function AdminOfficesPage() {
  const [items, setItems] = useState<Office[]>([])
  const [form, setForm] = useState<Office>(EMPTY)
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

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

    if (!res.ok) {
      throw new Error("Upload failed")
    }

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

      const res = await fetch("/api/offices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          image,
        }),
      })

      if (!res.ok) {
        throw new Error("Save failed")
      }

      setForm(EMPTY)
      setFile(null)
      await load()
    } catch (err) {
      console.error(err)
      alert("Failed to save office")
    } finally {
      setSaving(false) // ✅ GUARANTEED RESET
    }
  }

  async function remove(id?: string) {
    if (!id) return
    if (!confirm("Delete this office?")) return

    await fetch(`/api/offices/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div className="max-w-4xl space-y-16">
      <h1 className="text-3xl font-bold">Manage Offices</h1>

      {/* FORM */}
      <div className="rounded-2xl border bg-white p-8 space-y-4">
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

        <button
          onClick={save}
          disabled={saving}
          className="bg-green-700 text-white px-6 py-3 rounded"
        >
          {saving ? "Saving…" : "Add Office"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {items.map((o) => (
          <div
            key={o._id}
            className="flex justify-between items-center rounded-xl border bg-white p-4"
          >
            <p className="font-semibold">{o.name}</p>
            <button
              onClick={() => remove(o._id)}
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
