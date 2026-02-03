"use client"

import { useEffect, useState } from "react"

type Official = {
  _id: string
  role: string
  name: string
  image?: string
}

const EMPTY = { role: "", name: "", image: "" }

export default function AdminOfficialsPage() {
  const [items, setItems] = useState<Official[]>([])
  const [form, setForm] = useState<any>(EMPTY)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await fetch("/api/officials")
    setItems(await res.json())
  }

  async function save() {
    if (!form.role || !form.name) {
      alert("Missing fields")
      return
    }

    const url = editingId
      ? `/api/officials/${editingId}`
      : "/api/officials"

    const method = editingId ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      alert("Save failed")
      return
    }

    setForm(EMPTY)
    setEditingId(null)
    load()
  }

  function edit(o: Official) {
    setForm({
      role: o.role,
      name: o.name,
      image: o.image || "",
    })
    setEditingId(o._id)
  }

  async function remove(id: string) {
    if (!confirm("Delete this official?")) return

    const res = await fetch(`/api/officials/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      alert("Delete failed")
      return
    }

    load()
  }

  return (
    <div className="max-w-4xl space-y-14">
      <h1 className="text-3xl font-bold">Manage Officials</h1>

      <div className="border rounded-xl p-6 bg-white space-y-4">
        <input
          className="input"
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <div className="flex gap-4">
          {editingId && (
            <button
              onClick={() => {
                setForm(EMPTY)
                setEditingId(null)
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          )}

          <button
            onClick={save}
            className="bg-green-700 text-white px-6 py-3 rounded"
          >
            {editingId ? "Save Changes" : "Add Official"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((o) => (
          <div
            key={o._id}
            className="flex justify-between items-center border rounded p-4 bg-white"
          >
            <div>
              <p className="font-semibold">{o.name}</p>
              <p className="text-sm text-slate-500">{o.role}</p>
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
      </div>
    </div>
  )
}
