"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"
import { LogOut, Menu, X } from "lucide-react"

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      if (profile?.role !== "admin") {
        router.push("/")
        return
      }

      setLoading(false)
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 bg-gray-900/95 backdrop-blur-md text-white p-6 flex-col">
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <a
                href="/admin"
                className="block py-2 px-3 rounded-lg hover:bg-gray-800 transition"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/products"
                className="block py-2 px-3 rounded-lg hover:bg-gray-800 transition"
              >
                Produk
              </a>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Sidebar (mobile overlay with animation) */}
      <div
        className={`fixed inset-0 z-50 flex md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar sliding */}
        <aside
          className={`relative z-50 w-64 bg-gray-900 text-white p-6 flex flex-col transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={28} />
            </button>
          </div>
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <a
                  href="/admin"
                  className="block py-2 px-3 rounded-lg hover:bg-gray-800 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/admin/products"
                  className="block py-2 px-3 rounded-lg hover:bg-gray-800 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  Produk
                </a>
              </li>
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </aside>
      </div>

      {/* Topbar (mobile) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 py-3 shadow-md">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={28} />
        </button>
        <h1 className="font-bold text-lg">Admin Panel</h1>
      </div>

      {/* Konten */}
      <main className="flex-1 p-6 md:p-10 mt-14 md:mt-0">{children}</main>
    </div>
  )
}
