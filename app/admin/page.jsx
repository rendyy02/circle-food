"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/client"

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
  })
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error) setProducts(data)
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Kelola Produk</h1>

      {/* Form tambah/edit produk */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-12 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-3">
          {editingId ? "Edit Produk" : "Tambah Produk"}
        </h2>
        <form onSubmit={handleAddOrUpdate} className="space-y-5">
          <input
            type="text"
            placeholder="Nama Produk"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-5 py-3 rounded-lg text-black placeholder-gray-400"
          />
          <input
            type="number"
            placeholder="Harga"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border px-5 py-3 rounded-lg text-black placeholder-gray-400"
          />
          <textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border px-5 py-3 rounded-lg text-black placeholder-gray-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-5 py-3 rounded-lg text-black placeholder-gray-400"
          />
          {uploading && <p>Mengupload gambar...</p>}
          {form.image_url && (
            <img
              src={form.image_url}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border text-black placeholder-gray-400"
            />
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-black placeholder-gray-400"
            >
              {editingId ? "Update" : "Tambah"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setForm({ name: "", price: "", description: "", image_url: "" })
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg text-black placeholder-gray-400"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border shadow-md rounded-xl overflow-hidden"
          >
            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800">{p.name}</h3>
              <p className="text-blue-600 font-semibold">Rp {p.price}</p>
              <p className="text-sm text-gray-600 mb-4">{p.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
