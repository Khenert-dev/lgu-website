"use client"

import { useEffect, useState } from "react"

type NewsItem = {
  _id?: string
  title: string
  body: string
  image?: string
}

const EMPTY: NewsItem = {
  title: "",
  body: "",
  image: "",
}

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [form, setForm] = useState<NewsItem>(EMPTY)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const res = await fetch("/api/news")
    setItems(await res.json())
    setLoading(false)
  }

  async function upload(): Promise<string | undefined> {
    if (!file) return form.image
    const fd = new FormData()
    fd.append("file", file)

    const res = await fetch("/api/upload/news", {
      method: "POST",
      body: fd,
    })

    if (!res.ok) return undefined
    const json = await res.json()
    return json.url
  }

  async function save() {
    setError(null)

    if (!form.title || !form.body) {
      setError("Title and body are required.")
      return
    }

    setSaving(true)
    const imageUrl = await upload()

    const res = await fetch(
      editingId ? `/api/news/${editingId}` : "/api/news",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
        }),
      }
    )

    setSaving(false)

    if (!res.ok) {
      setError("Failed to save news item.")
      return
    }

    resetForm()
    load()
  }

  function edit(n: NewsItem) {
    setForm({
      title: n.title,
      body: n.body,
      image: n.image ?? "",
    })
    setEditingId(n._id ?? null)
    setFile(null)
  }

  async function remove(id?: string) {
    if (!id) return
    if (!window.confirm("This will permanently delete the news item.")) return
    await fetch(`/api/news/${id}`, { method: "DELETE" })
    load()
  }

  function resetForm() {
    setForm(EMPTY)
    setEditingId(null)
    setFile(null)
    setError(null)
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Loading news…</p>
  }

  return (
    <div className="max-w-6xl space-y-10 pb-32">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">News & Announcements</h1>
        {editingId && (
          <span className="text-sm text-blue-600">
            Editing mode
          </span>
        )}
      </header>

      {/* ================= FORM ================= */}
      <section className="border rounded-lg bg-white p-6 space-y-5">
        <h2 className="text-lg font-medium">
          {editingId ? "Edit News" : "Create News"}
        </h2>

        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        <input
          className="input"
          placeholder="Headline"
          value={form.title}
          onChange={(e) =>
            setForm((p) => ({ ...p, title: e.target.value }))
          }
        />

        <textarea
          className="input"
          rows={6}
          placeholder="Full article"
          value={form.body}
          onChange={(e) =>
            setForm((p) => ({ ...p, body: e.target.value }))
          }
        />

        <input
          className="input"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={(e) =>
            setForm((p) => ({ ...p, image: e.target.value }))
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {(file || form.image) && (
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : form.image
            }
            className="h-48 w-full object-cover rounded border"
          />
        )}
      </section>

      {/* ================= STICKY ACTION BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-end gap-3">
          {editingId && (
            <button
              onClick={resetForm}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="bg-green-700 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {saving ? "Saving…" : editingId ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <section className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-slate-500">
            No news items yet.
          </p>
        )}

        {items.map((n) => (
          <div
            key={n._id}
            className="flex justify-between items-center border rounded p-4 bg-white"
          >
            <div className="flex items-center gap-4">
              {n.image && (
                <img
                  src={n.image}
                  className="h-12 w-12 rounded object-cover"
                />
              )}
              <p className="font-medium">{n.title}</p>
            </div>

            <div className="flex gap-4 text-sm">
              <button
                className="text-blue-600"
                onClick={() => edit(n)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => remove(n._id)}
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
