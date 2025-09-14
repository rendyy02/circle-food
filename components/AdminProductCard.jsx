"use client"

export default function AdminProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.image_url || "/default-product.jpg"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold shadow-md">
          Rp {Number(product.price || 0).toLocaleString("id-ID")}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-700 text-sm line-clamp-3 mb-4">
            {product.description}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}
