"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // efek saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // fungsi untuk scroll ke section
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false) // tutup menu mobile setelah klik
    }
  }

  const tabs = ["home", "about", "produk", "lokasi"]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <div
          className="text-white font-bold text-2xl cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          Circle Food
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => scrollTo(tab)}
              className="text-white font-semibold hover:text-yellow-400 transition-colors"
            >
              {tab === "home"
                ? "Beranda"
                : tab === "about"
                ? "Tentang"
                : tab === "produk"
                ? "Produk"
                : "Lokasi"}
            </button>
          ))}
        </nav>

        {/* Tombol hamburger untuk mobile */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md flex flex-col items-center py-6 gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => scrollTo(tab)}
              className="text-white text-xl font-semibold hover:text-yellow-400 transition-colors"
            >
              {tab === "home"
                ? "Beranda"
                : tab === "about"
                ? "Tentang"
                : tab === "produk"
                ? "Produk"
                : "Lokasi"}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
