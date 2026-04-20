"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/client"
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Loader2, 
  Search,
  X,
  ChevronLeft,
  Package,
  Upload,
  Image as ImageIcon
} from "lucide-react"
import Link from "next/link"

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: ""
  })

  // 1. Ambil Data Produk
  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setProducts(data)
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  // 2. Fungsi Upload Gambar ke Storage
  const handleFileUpload = async (e) => {
    try {
      setUploading(true)
      const file = e.target.files[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload file ke bucket 'product-images'
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Ambil Public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)
      
      setForm({ ...form, image_url: data.publicUrl })
    } catch (error) {
      alert("Error uploading image: " + error.message)
    } finally {
      setUploading(false)
    }
  }

  // 3. Simpan Data ke Tabel
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { 
      name: form.name, 
      price: parseFloat(form.price), 
      description: form.description, 
      image_url: form.image_url 
    }

    const { error } = editingId 
      ? await supabase.from("products").update(payload).eq("id", editingId)
      : await supabase.from("products").insert([payload])

    if (!error) {
      setForm({ name: "", price: "", description: "", image_url: "" })
      setEditingId(null)
      setIsModalOpen(false)
      fetchProducts()
    } else {
      alert(error.message)
    }
    setLoading(false)
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronLeft size={20} className="text-slate-500" />
            </Link>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Product Management</h1>
              <p className="text-xs text-slate-500 md:block hidden">Add, edit, or remove items from your menu</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none w-full md:w-60"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => { setEditingId(null); setForm({name:"", price:"", description:"", image_url:""}); setIsModalOpen(true); }}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm shadow-blue-200"
            >
              <Plus size={18} /> <span className="hidden sm:inline">Add Item</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {loading && !isModalOpen ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p className="text-sm font-medium">Loading inventory...</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-[11px] font-bold tracking-wider uppercase">
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                          {product.image_url ? (
                            <img src={product.image_url} className="w-full h-full object-cover" alt={product.name} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Package size={20} />
                            </div>
                          )}
                        </div>
                        <span className="font-semibold text-slate-800 text-sm">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-bold text-slate-700">Rp {product.price?.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-500 max-w-xs truncate">{product.description || "-"}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingId(product.id); setForm(product); setIsModalOpen(true); }} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-all">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={async () => { if(confirm("Delete this item?")) { await supabase.from("products").delete().eq("id", product.id); fetchProducts(); } }} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-bold text-slate-800 text-lg">{editingId ? 'Edit Product' : 'Add New Item'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50 relative group overflow-hidden">
                {form.image_url ? (
                  <div className="relative w-full h-32">
                    <img src={form.image_url} className="w-full h-full object-contain rounded-lg" alt="preview" />
                    <button type="button" onClick={() => setForm({...form, image_url: ""})} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-lg"><X size={14}/></button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer py-4 w-full">
                    <div className="p-3 bg-white rounded-full shadow-sm text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                      {uploading ? <Loader2 className="animate-spin" size={24}/> : <Upload size={24} />}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {uploading ? "Uploading..." : "Click to upload image"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Product Name</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium" placeholder="Nasi Goreng Spesial" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Price (IDR)</label>
                  <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium" placeholder="25000" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Description</label>
                  <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium resize-none" placeholder="Tuliskan detail menu..." />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" disabled={loading || uploading} className="flex-1 px-4 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 disabled:bg-slate-300 transition-all shadow-xl shadow-slate-200">
                  {loading ? 'Processing...' : editingId ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}