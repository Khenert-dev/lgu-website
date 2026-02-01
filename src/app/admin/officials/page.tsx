"use client"

import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

type Official = {
  id?: string
  role: string
  name: string
  img: string
}

export default function AdminOfficialsPage() {
  const [items, setItems] = useState<Official[]>([])
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [img, setImg] = useState("")

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const snap = await getDocs(collection(db, "officials"))
    setItems(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Official),
      }))
    )
  }

  async function add() {
    if (!role || !name) return

    await addDoc(collection(db, "officials"), {
      role,
      name,
      img,
    })

    setRole("")
    setName("")
    setImg("")
    load()
  }

  async function remove(id?: string) {
    if (!id) return
    await deleteDoc(doc(db, "officials", id))
    load()
  }

  return (
    <div className="max-w-5xl space-y-10">
      <h1 className="text-3xl font-bold text-green-800">
        Manage Officials
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded p-3"
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-3"
        />
        <input
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="border rounded p-3"
        />
      </div>

      <button
        onClick={add}
        className="bg-green-700 text-white px-6 py-3 rounded"
      >
        Add Official
      </button>

      <div className="space-y-4">
        {items.map((o) => (
          <div
            key={o.id}
            className="flex items-center justify-between border rounded p-4"
          >
            <div>
              <p className="font-semibold">{o.name}</p>
              <p className="text-sm text-slate-500">{o.role}</p>
            </div>
            <button
              onClick={() => remove(o.id)}
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
