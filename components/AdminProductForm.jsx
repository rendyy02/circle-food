"use client"

export default function AdminProductForm({
  form,
  setForm,
  editingId,
  uploading,
  handleAddOrUpdate,
  handleFileChange,
  cancelEdit,
}) {
  return (
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
          className="w-full border px-5 py-3 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Harga"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-5 py-3 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <textarea
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-5 py-3 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border px-5 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        {uploading && <p>Mengupload gambar...</p>}
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editingId ? "Update" : "Tambah"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
