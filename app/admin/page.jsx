"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/client"
import {
  Loader2,
  PlusCircle,
  XCircle,
  Edit,
  Trash2,
  Image as ImageIcon,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
  })
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredProducts(filtered)
    setCurrentPage(1) // reset ke page pertama saat search
  }, [search, products])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error) setProducts(data)
    setLoading(false)
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      setUploading(true)
      const ext = file.name.split(".").pop()
      const fileName = `${Date.now()}.${ext}`
      const filePath = `products/${fileName}`

      const { error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file)
      if (error) throw error

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath)

      setForm({ ...form, image_url: urlData.publicUrl })
    } catch (err) {
      alert("Upload gagal: " + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleAddOrUpdate = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price) return alert("Nama & Harga wajib diisi!")

    if (editingId) {
      await supabase.from("products").update(form).eq("id", editingId)
      setEditingId(null)
    } else {
      await supabase.from("products").insert([form])
    }

    setForm({ name: "", price: "", description: "", image_url: "" })
    fetchProducts()
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return
    await supabase.from("products").delete().eq("id", id)
    fetchProducts()
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      image_url: p.image_url,
    })
  }

  // pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(
    startIdx,
    startIdx + itemsPerPage
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 Kelola Produk</h1>

      {/* Search bar */}
      <div className="relative mb-6 w-full sm:w-1/2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
        />
      </div>

      {/* Form tambah/edit produk */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-12 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            {editingId ? (
              <>
                <Edit size={20} /> Edit Produk
              </>
            ) : (
              <>
                <PlusCircle size={20} /> Tambah Produk
              </>
            )}
          </h2>
          {editingId && (
            <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
              Sedang mengedit
            </span>
          )}
        </div>

        <form onSubmit={handleAddOrUpdate} className="space-y-5">
          <input
            type="text"
            placeholder="Nama Produk"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-5 py-3 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Harga"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border px-5 py-3 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border px-5 py-3 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <label className="flex items-center gap-3 cursor-pointer w-full border px-5 py-3 rounded-lg hover:bg-gray-50">
            <ImageIcon size={20} className="text-gray-500" />
            <span className="text-gray-600">
              {uploading ? "Mengupload..." : "Pilih Gambar"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {form.image_url && (
            <img
              src={form.image_url}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              {uploading && <Loader2 className="animate-spin" size={20} />}
              {editingId ? "Update" : "Tambah"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setForm({ name: "", price: "", description: "", image_url: "" })
                }}
                className="bg-gray-500 hover:bg-gray-600 transition text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <XCircle size={20} /> Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List produk */}
      {loading ? (
        <div className="text-center py-10 text-gray-600">Memuat produk...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          Tidak ada produk yang cocok 🔍
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((p, idx) => (
              <div
                key={p.id}
                className="bg-white border shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl animate-fadeIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500">
                    <ImageIcon size={40} />
                  </div>
                )}
                <div className="p-5 flex flex-col justify-between h-[220px]">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{p.name}</h3>
                    <p className="text-blue-600 font-semibold">
                      Rp {p.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {p.description}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Trash2 size={16} /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1"
            >
              <ChevronLeft size={18} /> Prev
            </button>
            <span className="text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
