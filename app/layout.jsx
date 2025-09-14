"use client"

import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useEffect } from "react"
import "aos/dist/aos.css"
import { usePathname } from "next/navigation"

export default function RootLayout({ children }) {
  const pathname = usePathname() || ""
  const isAdminPage = pathname.startsWith("/admin")

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const mod = await import("aos")
        const AOS = mod?.default ?? mod
        if (!mounted || !AOS) return
        AOS.init({
          duration: 1000,
          once: true,
        })
      } catch (err) {
        console.warn("AOS load failed:", err)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <html lang="id">
      <body className="bg-white text-gray-900 antialiased">
        {/* Navbar & Footer hanya muncul di halaman non-admin */}
        {!isAdminPage && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!isAdminPage && <Footer />}
      </body>
    </html>
  )
}
