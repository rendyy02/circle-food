"use client"

import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  const testimonials = [
    {
      name: "Rina W.",
      text: "Dimsum-nya enak banget, dan pelayanannya ramah. Selalu puas setiap datang!",
    },
    {
      name: "Andi P.",
      text: "Harga terjangkau tapi rasanya tetap premium. Recomended banget!",
    },
    {
      name: "Siti H.",
      text: "Circle Food jadi tempat favorit saya dan keluarga. Always halal & fresh!",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 relative font-sans">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md z-50"
      >
        ← Kembali
      </button>

      {/* Hero / Foto Owner */}
      <section
        className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-white text-center px-6"
        data-aos="fade-up"
      >
        <img
          src="/owner.jpg"
          alt="Owner Circle Food"
          className="w-64 h-64 object-cover rounded-full shadow-2xl mb-6"
        />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Circle Food</h1>
        <p className="text-gray-700 text-lg max-w-2xl">
          Circle Food hadir untuk memberikan pengalaman kuliner terbaik dengan berbagai pilihan dimsum
          & street food halal. Kami selalu menggunakan bahan-bahan berkualitas dan menjaga cita rasa autentik.
        </p>
      </section>

      {/* Visi & Misi */}
      <section className="py-24 bg-white text-center px-6" data-aos="fade-up">
        <h2 className="text-4xl font-semibold mb-8">Visi & Misi</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-yellow-50 p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-3">Visi</h3>
            <p>Menyediakan dimsum & street food halal terbaik dengan kualitas premium dan harga terjangkau.</p>
          </div>
          <div className="bg-yellow-50 p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-3">Misi</h3>
            <ul className="list-disc list-inside space-y-2 text-left">
              <li>Selalu menggunakan bahan-bahan berkualitas.</li>
              <li>Menyajikan makanan yang lezat dan sehat.</li>
              <li>Mengutamakan pelayanan ramah dan cepat.</li>
              <li>Menjaga kepuasan pelanggan sebagai prioritas utama.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sejarah / Cerita */}
      <section className="py-24 bg-gray-100 text-center px-6" data-aos="fade-up">
        <h2 className="text-4xl font-semibold mb-8">Cerita Kami</h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
          Circle Food berdiri dengan tujuan menghadirkan makanan halal yang lezat dan berkualitas
          untuk semua kalangan. Berawal dari usaha kecil, kini Circle Food menjadi pilihan utama
          untuk dimsum & street food di kota kami, dengan reputasi yang terus berkembang.
        </p>
      </section>

      {/* Testimoni */}
      <section className="py-24 bg-white text-center px-6" data-aos="fade-up">
        <h2 className="text-4xl font-semibold mb-12">Apa Kata Pelanggan?</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-yellow-50 p-6 rounded-2xl shadow-md text-gray-800"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <p className="mb-4">&quot;{t.text}&quot;</p>
              <h4 className="font-bold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-200 text-center px-6">
        <p className="text-gray-700">&copy; {new Date().getFullYear()} Circle Food. All rights reserved.</p>
      </footer>
    </div>
  )
}
