"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import ProductModal from "@/components/ProductModal"

export default function HomePage() {
  const [produk, setProduk] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null) // State untuk Popup
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
        <div className="relative z-10 px-4">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-xl">
            Circle Food
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto font-medium">
            Dimsum & Street Food Lezat, Halal, dan Terjangkau
          </p>

          <button
            onClick={scrollToProduk}
            className="mt-8 inline-block bg-gradient-to-r from-yellow-400 to-red-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Lihat Produk
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="text-center md:text-left">
              <img
                src="/logo.png"
                alt="Circle Food"
                className="w-64 h-64 object-cover rounded-full shadow-2xl mx-auto md:mx-0 border-4 border-white dark:border-slate-800"
              />
            </div>
            <div data-aos="fade-left">
              <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Tentang Kami</h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg">
                Circle Food hadir untuk memberikan pengalaman kuliner terbaik
                dengan berbagai pilihan dimsum dan street food. Kami selalu
                menggunakan bahan-bahan berkualitas dan menjaga cita rasa autentik.
              </p>
              <h3 className="mt-6 font-semibold text-slate-900 dark:text-slate-100 italic">Mau Tahu Lebih Lanjut?</h3>
              <button
                onClick={() => router.push("/about")}
                className="mt-4 w-full md:w-max px-8 bg-gradient-to-r from-red-400 to-yellow-400 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                Tentang Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Section */}
      <section id="produk" className="py-24 bg-slate-50 dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white" data-aos="fade-down">
            Produk Kami
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {produk.length > 0 ? (
              produk.map((item, index) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedProduct(item)} 
                  className="cursor-pointer"
                >
                  <ProductCard product={item} index={index} />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-slate-500 py-10 italic">
                Belum ada produk tersedia
              </p>
            )}
          </div>

          {/* Tombol Order Global */}
          {produk.length > 0 && (
            <div className="flex justify-center mt-16">
              <a
                href="https://wa.me/62895389942494?text=Halo,%20saya%20mau%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105"
              >
                Order via WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Popup / Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Lokasi Section */}
      <section id="lokasi" className="py-24 bg-white dark:bg-slate-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white" data-aos="fade-up">
          Lokasi Kami
        </h2>
        <div className="container mx-auto px-6">
          <div
            className="w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
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
        </div>
      </section>
    </>
  )
}