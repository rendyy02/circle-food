"use client"

import { X, ShoppingCart, Phone } from "lucide-react"

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Background overlay untuk tutup saat klik luar */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Konten Modal */}
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-2xl rounded-t-[2rem] md:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Gambar Produk */}
          <div className="w-full md:w-1/2 h-72 md:h-auto">
            <img 
              src={product.image_url || "/placeholder-food.jpg"} 
              className="w-full h-full object-cover"
              alt={product.name}
            />
          </div>

          {/* Info Produk */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                {product.name}
              </h2>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-bold mb-4">
                Tersedia
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {product.description || "Nikmati hidangan spesial kami yang dibuat dengan bahan premium dan bumbu rahasia Circle Food."}
              </p>
            </div>

            <div>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                {formatHarga(product.price)}
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/62895389942494?text=Halo, saya mau pesan ${product.name}`}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20"
                >
                  <Phone size={20} />
                  Pesan via WA
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}