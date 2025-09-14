"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ProductCard from "@/components/ProductCard"

export default function HomePage() {
  const [produk, setProduk] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProduk(data))
      .catch((err) => console.error("Error fetching products:", err))
  }, [])

  // Fungsi smooth scroll
  const scrollToProduk = () => {
    const element = document.getElementById("produk")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center bg-[url('/background.jpeg')] bg-cover bg-center relative"
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-xl">
            Circle Food
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto">
            Dimsum & Street Food Lezat, Halal, dan Terjangkau
          </p>

          {/* Tombol scroll ke Produk */}
          <button
            onClick={scrollToProduk}
            className="mt-8 inline-block bg-gradient-to-r from-yellow-400 to-red-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition"
          >
            Lihat Produk
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" className="text-center md:text-left">
            <img
              src="/logo.png"
              alt="Circle Food"
              className="w-64 h-64 object-cover rounded-full shadow-2xl mx-auto md:mx-0"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold mb-4">Tentang Kami</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Circle Food hadir untuk memberikan pengalaman kuliner terbaik
              dengan berbagai pilihan dimsum dan street food. Kami selalu
              menggunakan bahan-bahan berkualitas dan menjaga cita rasa autentik.
            </p>
            <h3 className="mt-4 font-semibold">Mau Tahu Lebih Lanjut?</h3>
            <button
              onClick={() => router.push("/about")}
              className="mt-4 w-full bg-gradient-to-r from-red-400 to-yellow-400 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            >
              Tentang Kami
            </button>
          </div>
        </div>
      </section>

      {/* Produk Section */}
      <section id="produk" className="py-24 bg-gray-200">
        <h2
          className="text-4xl font-bold text-center mb-16 text-gray-900"
          data-aos="fade-down"
        >
          Produk Kami
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 container mx-auto px-6">
          {produk.length > 0 ? (
            produk.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-700 text-lg">
              Belum ada produk tersedia
            </p>
          )}
        </div>

        {/* Tombol Order di tengah bawah semua produk */}
        {produk.length > 0 && (
          <div className="flex justify-center mt-12">
            <a
              href="https://wa.me/62895389942494?text=Halo,%20saya%20mau%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-green-600 transition"
            >
              Order Sekarang
            </a>
          </div>
        )}
      </section>

      {/* Lokasi Section */}
      <section id="lokasi" className="py-24">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
          Lokasi Kami
        </h2>
        <div
          className="w-full h-[450px] container mx-auto px-6 rounded-2xl overflow-hidden shadow-lg"
          data-aos="fade-up"
          data-aos-delay={300}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8868621384086!2d107.5631782!3d-7.0225830999999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ed00448da597%3A0x7909fc0e050c5a7c!2sDimsum%20Circlefood!5e0!3m2!1sid!2sid!4v1757549598786!5m2!1sid!2sid"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  )
}
