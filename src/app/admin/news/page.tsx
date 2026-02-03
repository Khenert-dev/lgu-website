"use client"

import { useEffect, useState } from "react"

type NewsItem = {
  _id?: string
  title: string
  body: string
  image?: string
}

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await fetch("/api/news")
    const data = await res.json()
    setItems(data)
  }

  async function upload(): Promise<string | undefined> {
    if (!file) return image
    const fd = new FormData()
    fd.append("file", file)

    const res = await fetch("/api/upload/news", {
      method: "POST",
      body: fd,
    })

    const json = await res.json()
    return json.url
  }

  async function publish() {
    if (!title || !body) {
      alert("Title and body required")
      return
    }

    setSaving(true)
    const imageUrl = await upload()

    await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        image: imageUrl,
      }),
    })

    setTitle("")
    setBody("")
    setImage("")
    setFile(null)
    setSaving(false)
    load()
  }

  async function remove(id?: string) {
    if (!id) return
    if (!confirm("Delete this news item?")) return
    await fetch(`/api/news/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div className="max-w-5xl space-y-12">
      <h1 className="text-3xl font-bold text-green-800">
        News & Announcements
      </h1>

      {/* CREATE */}
      <section className="border rounded-xl bg-white p-6 space-y-4">
        <input
          className="input"
          placeholder="Headline"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input"
          rows={6}
          placeholder="Full article"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <input
          className="input"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] ?? null)
          }
        />

        {(file || image) && (
          <img
            src={file ? URL.createObjectURL(file) : image}
            className="h-48 w-full object-cover rounded-lg border"
          />
        )}

        <button
          onClick={publish}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? "Publishing…" : "Publish"}
        </button>
      </section>

      {/* LIST */}
      <section className="space-y-4">
        {items.map((n) => (
          <div
            key={n._id}
            className="border rounded-lg p-4 bg-white"
          >
            <p className="font-semibold">{n.title}</p>
            <button
              onClick={() => remove(n._id)}
              className="text-sm text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}
