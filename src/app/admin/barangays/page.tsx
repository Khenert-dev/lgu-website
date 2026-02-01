"use client"

import { useEffect, useState } from "react"
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

type Barangay = {
  id?: string
  name: string
  slug: string
  description: string
  lat: number
  lng: number
}

export default function AdminBarangaysPage() {
  const [items, setItems] = useState<Barangay[]>([])
  const [form, setForm] = useState<Barangay>({
    name: "",
    slug: "",
    description: "",
    lat: 0,
    lng: 0,
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

  async function add() {
    if (!form.name || !form.slug) return

    await addDoc(collection(db, "barangays"), form)
    setForm({
      name: "",
      slug: "",
      description: "",
      lat: 0,
      lng: 0,
    })
    load()
  }

  async function remove(id?: string) {
    if (!id) return
    await deleteDoc(doc(db, "barangays", id))
    load()
  }

  return (
    <div className="max-w-5xl space-y-10">
      <h1 className="text-3xl font-bold text-green-800">
        Manage Barangays
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border rounded p-3"
        />
        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
          className="border rounded p-3"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          rows={3}
          className="border rounded p-3 md:col-span-2"
        />
        <input
          placeholder="Latitude"
          type="number"
          value={form.lat}
          onChange={(e) =>
            setForm({ ...form, lat: Number(e.target.value) })
          }
          className="border rounded p-3"
        />
        <input
          placeholder="Longitude"
          type="number"
          value={form.lng}
          onChange={(e) =>
            setForm({ ...form, lng: Number(e.target.value) })
          }
          className="border rounded p-3"
        />
      </div>

      <button
        onClick={add}
        className="bg-green-700 text-white px-6 py-3 rounded"
      >
        Add Barangay
      </button>

      <div className="space-y-3">
        {items.map((b) => (
          <div
            key={b.id}
            className="flex justify-between border rounded p-4"
          >
            <div>
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm text-slate-500">{b.slug}</p>
            </div>
            <button
              onClick={() => remove(b.id)}
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
