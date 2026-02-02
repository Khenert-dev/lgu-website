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
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"
import { db, storage } from "@/lib/firebase"

type Barangay = {
  id?: string
  name: string
  slug: string
  description: string
  image: string
  lat?: number
  lng?: number
}

export default function AdminBarangaysPage() {
  const [items, setItems] = useState<Barangay[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const [form, setForm] = useState<Barangay>({
    name: "",
    slug: "",
    description: "",
    image: "",
    lat: undefined,
    lng: undefined,
  })

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const snap = await getDocs(collection(db, "barangays"))
    setItems(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Barangay, "id">),
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
    setForm({
      name: b.name,
      slug: b.slug,
      description: b.description,
      image: b.image || "",
      lat: b.lat,
      lng: b.lng,
    })
    setFile(null)
  }

  function reset() {
    setEditingId(null)
    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
      lat: undefined,
      lng: undefined,
    })
    setFile(null)
  }

  async function uploadImage(): Promise<string> {
    if (!file) return form.image || ""

    const storageRef = ref(
      storage,
      `barangays/${crypto.randomUUID()}-${file.name}`
    )

    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }

  async function save() {
    if (!form.name || !form.slug) {
      alert("Name and slug are required")
      return
    }

    setSaving(true)

    try {
      const imageUrl = await uploadImage()

      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        image: imageUrl,
        lat: form.lat ?? null,
        lng: form.lng ?? null,
      }

      if (editingId) {
        await setDoc(
          doc(db, "barangays", editingId),
          payload,
          { merge: true }
        )
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

      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-slate-800">
          Manage Barangays
        </h1>
        <p className="text-slate-500">
          Full barangay profiles with images and location data.
        </p>
      </header>

      {/* EDIT FORM */}
      <section className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-8 py-5">
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Barangay" : "Add Barangay"}
          </h2>
        </div>

        <div className="px-8 py-6 grid gap-6 md:grid-cols-2">
          <Field label="Barangay Name">
            <input
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
          </Field>

          <Field label="Slug">
            <input
              value={form.slug}
              onChange={(e) =>
                setForm({ ...form, slug: e.target.value })
              }
              className="input"
            />
          </Field>

          <Field label="Latitude">
            <input
              type="number"
              value={form.lat ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  lat: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="input"
            />
          </Field>

          <Field label="Longitude">
            <input
              type="number"
              value={form.lng ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  lng: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="input"
            />
          </Field>

          <Field label="Featured Image" full>
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
                alt=""
                className="mt-3 h-48 w-full object-cover rounded-lg border"
              />
            )}
          </Field>

          <Field label="Full Description" full>
            <textarea
              rows={8}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="input"
            />
          </Field>
        </div>

        <div className="flex justify-end gap-4 border-t bg-slate-50 px-8 py-4">
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
            {saving
              ? "Saving…"
              : editingId
              ? "Save Changes"
              : "Add Barangay"}
          </button>
        </div>
      </section>

      {/* LIST */}
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
            <div className="flex gap-4 text-sm">
              <button
                onClick={() => edit(b)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => remove(b)}
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

function Field({
  label,
  children,
  full,
}: {
  label: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? "md:col-span-2 space-y-1" : "space-y-1"}>
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>
      {children}
    </div>
  )
}
