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

const ROLES = [
  "Municipal Mayor",
  "Vice Mayor",
  "Councilor",
]

export default function AdminOfficialsPage() {
  const [items, setItems] = useState<Official[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState<Official>({
    role: "",
    name: "",
    img: "",
  })

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
    setLoading(false)
  }

  function update<K extends keyof Official>(key: K, value: Official[K]) {
    setForm({ ...form, [key]: value })
  }

  async function add() {
    if (!form.role || !form.name) return

    setSaving(true)
    await addDoc(collection(db, "officials"), form)

    setForm({ role: "", name: "", img: "" })
    setSaving(false)
    load()
  }

  async function remove(o: Official) {
    if (!o.id) return
    const ok = confirm(`Delete official "${o.name}"?`)
    if (!ok) return

    await deleteDoc(doc(db, "officials", o.id))
    load()
  }

  return (
    <div className="space-y-20">

      {/* ================= HEADER ================= */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">
          Manage Officials
        </h1>
        <p className="text-slate-500">
          Add, review, and remove municipal officials.
        </p>
      </header>

      {/* ================= ADD FORM ================= */}
      <section className="rounded-2xl border bg-white p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Add New Official
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <select
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            className="rounded-md border px-3 py-2"
          >
            <option value="">Select role</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <input
            placeholder="Full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="rounded-md border px-3 py-2"
          />

          <input
            placeholder="Image URL (optional)"
            value={form.img}
            onChange={(e) => update("img", e.target.value)}
            className="rounded-md border px-3 py-2"
          />
        </div>

        {form.img && (
          <div className="flex items-center gap-4">
            <img
              src={form.img}
              alt="Preview"
              className="h-24 w-24 rounded-full object-cover border"
            />
            <p className="text-sm text-slate-500">
              Image preview
            </p>
          </div>
        )}

        <button
          onClick={add}
          disabled={saving}
          className="rounded-lg bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add Official"}
        </button>
      </section>

      {/* ================= LIST ================= */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Existing Officials
        </h2>

        {loading ? (
          <p className="text-slate-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-slate-500">No officials yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={o.img || "/images/avatar-placeholder.png"}
                    alt={o.name}
                    className="h-12 w-12 rounded-full object-cover border"
                  />

                  <div>
                    <p className="font-semibold text-slate-800">
                      {o.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {o.role}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => remove(o)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
