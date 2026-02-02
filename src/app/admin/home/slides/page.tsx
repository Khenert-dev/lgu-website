"use client"

import { useEffect, useState } from "react"
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

type Slide = {
  id: string
  title: string
  desc: string
  order: number
}

export default function AdminHomeSlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const snap = await getDocs(
      query(collection(db, "home_slides"), orderBy("order"))
    )
    setSlides(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Slide, "id">),
      }))
    )
    setLoading(false)
  }

  async function add() {
    await addDoc(collection(db, "home_slides"), {
      title: "New Slide",
      desc: "Slide description",
      order: slides.length + 1,
    })
    load()
  }

  async function update(id: string, data: Partial<Slide>) {
    await updateDoc(doc(db, "home_slides", id), data)
    load()
  }

  async function remove(id: string) {
    if (!confirm("Delete this slide?")) return
    await deleteDoc(doc(db, "home_slides", id))
    load()
  }

  if (loading) return <p>Loading…</p>

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">Home Slides</h1>

      {slides.map((s) => (
        <div key={s.id} className="border rounded-lg p-4 space-y-2">
          <input
            value={s.title}
            onChange={(e) =>
              update(s.id, { title: e.target.value })
            }
            className="w-full border p-2"
          />

          <textarea
            value={s.desc}
            onChange={(e) =>
              update(s.id, { desc: e.target.value })
            }
            className="w-full border p-2"
            rows={2}
          />

          <input
            type="number"
            value={s.order}
            onChange={(e) =>
              update(s.id, { order: Number(e.target.value) })
            }
            className="w-32 border p-2"
          />

          <button
            onClick={() => remove(s.id)}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={add}
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        + Add Slide
      </button>
    </div>
  )
}
