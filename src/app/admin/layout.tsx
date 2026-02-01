"use client"

import Link from "next/link"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAdminAuth } from "@/lib/useAdminAuth"
import { useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAdminAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [signingIn, setSigningIn] = useState(false)

  async function login() {
    if (!email || !password) {
      setError("Email and password required")
      return
    }

    setError(null)
    setSigningIn(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setError("Invalid credentials")
    } finally {
      setSigningIn(false)
    }
  }

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Checking access…
      </div>
    )
  }

  /* ---------- LOGIN ---------- */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass w-full max-w-sm rounded-3xl p-10">
          <h1 className="mb-6 text-center text-2xl font-bold text-green-800">
            Admin Login
          </h1>

          {error && (
            <p className="mb-4 text-sm text-red-600">{error}</p>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border bg-white/80 p-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border bg-white/80 p-3"
            />
          </div>

          <button
            onClick={login}
            disabled={signingIn}
            className="mt-6 w-full rounded-xl bg-green-700 py-3 text-white font-semibold hover:bg-green-800 disabled:opacity-60"
          >
            {signingIn ? "Signing in…" : "Sign In"}
          </button>
        </div>
      </div>
    )
  }

  /* ---------- ADMIN ---------- */
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 glass border-b">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-green-800">
              LT GovConnect — Admin
            </p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>

          <nav className="flex gap-6 text-sm">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/about">About</Link>
            <Link href="/admin/officials">Officials</Link>
            <Link href="/admin/news">News</Link>
            <Link href="/admin/barangays">Barangays</Link>
            <button
              onClick={() => signOut(auth)}
              className="text-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        {children}
      </main>
    </div>
  )
}
