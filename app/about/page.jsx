"use client"

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function AboutPage() {
  const router = useRouter()
  const [pegawai, setPegawai] = useState(0)
  const [customer, setCustomer] = useState(0)

  useEffect(() => {
    AOS.init({ duration: 1000, once: true })

    // Counter Pegawai
    let pegawaiStart = 0
    const pegawaiEnd = 10
    const pegawaiDuration = 2000
    const pegawaiStep = Math.floor(pegawaiDuration / pegawaiEnd)
    const pegawaiTimer = setInterval(() => {
      pegawaiStart += 1
      setPegawai(pegawaiStart)
      if (pegawaiStart === pegawaiEnd) clearInterval(pegawaiTimer)
    }, pegawaiStep)

    // Counter Customer
    let customerStart = 0
    const customerEnd = 100
    const customerDuration = 2000
    const customerStep = Math.floor(customerDuration / customerEnd)
    const customerTimer = setInterval(() => {
      customerStart += 1
      setCustomer(customerStart)
      if (customerStart === customerEnd) clearInterval(customerTimer)
    }, customerStep)

    return () => {
      clearInterval(pegawaiTimer)
      clearInterval(customerTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-800">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-5 left-5 z-50 bg-black/80 text-white shadow-md px-4 py-2 rounded-xl hover:bg-black transition"
      >
        ← Kembali
      </button>

      {/* Hero Owner */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/owner.jpg"
            alt="Owner Circle Food"
            width={200}
            height={200}
            className="rounded-full shadow-2xl border-4 border-blue-500"
          />
        </motion.div>
        <h1 className="text-3xl font-bold mt-6 text-blue-700">
          Founder & Owner Circle Food
        </h1>
        <p className="text-gray-600 max-w-2xl mt-3">
          Circle Food didirikan oleh <span className="font-semibold">Nuryani</span>, 
          seorang pengusaha muda dengan visi menghadirkan makanan berkualitas, sehat, 
          dan terjangkau untuk semua kalangan.
        </p>
      </section>

      {/* Sejarah */}
      <section className="mt-16 px-6">
        <h2 className="text-2xl font-bold text-center mb-10 text-blue-700">
          Sejarah Circle Food
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            { year: "2020", text: "Circle Food pertama kali berdiri sebagai usaha kecil rumahan." },
            { year: "2021", text: "Mulai membuka cabang pertama dan memperluas menu." },
            { year: "2023", text: "Circle Food berhasil memiliki 50+ pegawai dan loyal customer." },
          ].map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className="bg-white shadow-md rounded-xl p-6 flex items-start space-x-4 border-l-4 border-gradient-to-r from-yellow-400 to-red-500"
            >
              <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full font-bold">
                {item.year}
              </span>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Counter Section */}
      <section className="mt-20 text-center px-6">
        <h2 className="text-2xl font-bold mb-10 text-blue-700">Circle Food dalam Angka</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {/* Pegawai */}
          <motion.div
            data-aos="fade-up"
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-8"
          >
            <p className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {pegawai}+
            </p>
            <p className="text-gray-600 mt-2">Pegawai Berdedikasi</p>
          </motion.div>

          {/* Customers */}
          <motion.div
            data-aos="fade-up"
            data-aos-delay="200"
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-8"
          >
            <p className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {customer}+
            </p>
            <p className="text-gray-600 mt-2">Pelanggan Puas</p>
          </motion.div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="mt-20 px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10 text-blue-700">
          Testimoni Customer
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Sarah", text: "Makanannya enak banget, harganya terjangkau!" },
            { name: "Andi", text: "Circle Food selalu jadi pilihan utama keluarga saya." },
            { name: "Lisa", text: "Pelayanan cepat, kualitas makanan top!" },
          ].map((testi, i) => (
            <motion.div
              key={i}
              data-aos="zoom-in"
              className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <p className="italic text-gray-700">"{testi.text}"</p>
              <h4 className="mt-4 font-bold text-blue-700">{testi.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
