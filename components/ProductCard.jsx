"use client"

import { ShoppingCart } from "lucide-react"

export default function ProductCard({ product, index }) {
  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga)
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="bg-white dark:bg-slate-800 group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700"
    >
      {/* Container Gambar */}
      <div className="relative h-36 md:h-52 overflow-hidden">
        <img
          src={product.image_url || "/placeholder-food.jpg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Konten Card */}
      <div className="p-3 md:p-5">
        <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-1 truncate">
          {product.name}
        </h3>
        <p className="hidden md:block text-slate-500 dark:text-slate-400 text-xs mb-4 line-clamp-2 h-8">
          {product.description || "Hidangan lezat khas Circle Food."}
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between pt-2 md:pt-4 border-t border-slate-50 dark:border-slate-700">
          <span className="text-sm md:text-xl font-black text-red-500 dark:text-red-400">
            {formatHarga(product.price)}
          </span>

          <a
            href={`https://wa.me/62895389942494?text=Halo, saya ingin pesan ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex justify-center py-2 md:p-3 rounded-lg md:rounded-xl hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white transition-colors"
          >
            <ShoppingCart size={18} className="md:w-5 md:h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}