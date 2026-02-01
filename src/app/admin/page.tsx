"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Card from "@/components/ui/card"

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setChecking(false)
    })
    return () => unsub()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Checking access…
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-green-800">
          Admin Dashboard
        </h1>
        <p className="text-slate-600">
          Manage public content and site information.
        </p>
      </header>

      {/* QUICK STATS */}
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <StatCard label="Pages" value="3" />
        <StatCard label="Officials" value="—" />
        <StatCard label="News Posts" value="—" />
        <StatCard label="Barangays" value="9" />
      </section>

      {/* MANAGEMENT LINKS */}
      <section className="grid gap-8 md:grid-cols-2">
        <DashboardLink
          title="Edit About Page"
          desc="Overview, mission, vision, history, values."
          href="/admin/about"
        />

        <DashboardLink
          title="Manage Officials"
          desc="Mayor, vice mayor, councilors."
          href="/admin/officials"
        />

        <DashboardLink
          title="Manage News"
          desc="Announcements and public notices."
          href="/admin/news"
         
        />

        <DashboardLink
          title="Barangays"
          desc="Profiles, highlights, locations."
          href="/admin/barangays"
          
        />
      </section>
    </div>
  )
}

/* ---------- components ---------- */

function StatCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Card className="p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-green-800">
        {value}
      </p>
    </Card>
  )
}

function DashboardLink({
  title,
  desc,
  href,
  disabled = false,
}: {
  title: string
  desc: string
  href: string
  disabled?: boolean
}) {
  if (disabled) {
    return (
      <Card className="p-8 opacity-50 cursor-not-allowed">
        <h3 className="text-xl font-semibold text-slate-400">
          {title}
        </h3>
        <p className="mt-2 text-slate-500">{desc}</p>
        <p className="mt-4 text-xs text-slate-400">
          Coming soon
        </p>
      </Card>
    )
  }

  return (
    <Link href={href}>
      <Card className="p-8 hover:shadow-xl transition cursor-pointer">
        <h3 className="text-xl font-semibold text-green-800">
          {title}
        </h3>
        <p className="mt-2 text-slate-600">{desc}</p>
        <p className="mt-4 text-sm text-green-700 font-medium">
          Open →
        </p>
      </Card>
    </Link>
  )
}
