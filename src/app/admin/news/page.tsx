"use client"

import { useEffect, useState } from "react"
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

type News = {
  id?: string
  title: string
  body: string
  createdAt?: any
}

export default function AdminNewsPage() {
  const [items, setItems] = useState<News[]>([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const snap = await getDocs(collection(db, "news"))
    setItems(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as News),
      }))
    )
  }

  async function add() {
    if (!title || !body) return

    await addDoc(collection(db, "news"), {
      title,
      body,
      createdAt: serverTimestamp(),
    })

    setTitle("")
    setBody("")
    load()
  }

  async function remove(id?: string) {
    if (!id) return
    await deleteDoc(doc(db, "news", id))
    load()
  }

  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl font-bold text-green-800">
        News & Announcements
      </h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-3"
      />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={6}
        className="w-full border rounded p-3"
      />

      <button
        onClick={add}
        className="bg-green-700 text-white px-6 py-3 rounded"
      >
        Publish
      </button>

      <div className="space-y-4">
        {items.map((n) => (
          <div
            key={n.id}
            className="border rounded p-4 space-y-2"
          >
            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-sm text-slate-600">{n.body}</p>
            <button
              onClick={() => remove(n.id)}
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
