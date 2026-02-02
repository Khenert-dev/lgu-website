"use client"

import { useEffect, useState } from "react"
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

type Barangay = {
  id?: string
  name: string
  slug: string
  description: string
  imageUrl: string
  lat?: number
  lng?: number
}

export default function AdminBarangaysPage() {
  const [items, setItems] = useState<Barangay[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState<Barangay>({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
  })

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const snap = await getDocs(collection(db, "barangays"))
    setItems(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Barangay),
      }))
    )
  }

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  function edit(b: Barangay) {
    setEditingId(b.id!)
    setForm(b)
  }

  function reset() {
    setEditingId(null)
    setForm({
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
    })
  }

  async function save() {
    if (!form.name || !form.slug) {
      alert("Name and slug are required")
      return
    }

    setSaving(true)

    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        imageUrl: form.imageUrl,
        lat: form.lat ?? null,
        lng: form.lng ?? null,
      }

      if (editingId) {
        await setDoc(doc(db, "barangays", editingId), payload, {
          merge: true,
        })
      } else {
        await addDoc(collection(db, "barangays"), payload)
      }

      reset()
      await load()
    } catch (err) {
      console.error(err)
      alert("Failed to save barangay")
    } finally {
      setSaving(false)
    }
  }

  async function remove(b: Barangay) {
    if (!b.id) return
    if (!confirm(`Delete "${b.name}"?`)) return
    await deleteDoc(doc(db, "barangays", b.id))
    load()
  }

  return (
    <div className="space-y-16">
      <header>
        <h1 className="text-3xl font-bold">Manage Barangays</h1>
        <p className="text-slate-500">
          Use public image URLs (Facebook, Imgur, etc.)
        </p>
      </header>

      <section className="rounded-2xl border bg-white p-8 space-y-6">
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Barangay" : "Add Barangay"}
        </h2>

        <input
          placeholder="Barangay Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: editingId
                ? form.slug
                : autoSlug(e.target.value),
            })
          }
          className="input"
        />

        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
          className="input"
        />

        <input
          placeholder="Image URL (https://...)"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({ ...form, imageUrl: e.target.value })
          }
          className="input"
        />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt=""
            className="h-48 w-full object-cover rounded-lg border"
          />
        )}

        <textarea
          rows={6}
          placeholder="Full description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="input"
        />

        <div className="flex justify-end gap-4">
          {editingId && (
            <button onClick={reset} className="btn-secondary">
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

      <section className="space-y-3">
        {items.map((b) => (
          <div
            key={b.id}
            className="flex justify-between rounded-xl border bg-white p-4"
          >
            <div>
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm text-slate-500">
                /barangays/{b.slug}
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => edit(b)} className="text-blue-600">
                Edit
              </button>
              <button onClick={() => remove(b)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
