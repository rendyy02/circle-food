"use client"

export default function ProductCard({ product, index }) {
  return (
    <div
      className="bg-white border border-gray-300 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 overflow-hidden"
      data-aos="zoom-in"
      data-aos-delay={index * 150}
    >
      <div className="relative">
        <img
          src={product.image_url || "/default-product.jpg"}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold shadow-md">
          Rp {Number(product.price || 0).toLocaleString("id-ID")}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-800 text-sm leading-relaxed">
            {product.description}
          </p>
        )}
      </div>
    </div>
  )
}
