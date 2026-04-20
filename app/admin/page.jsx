"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/client"
import { 
  Package, 
  Users, 
  ArrowUpRight, 
  Loader2, 
  Clock, 
  Plus,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, users: 0 })
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      // 1. Ambil Statistik (Total Produk & Total Admin)
      const { count: prodCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
      
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // 2. Ambil 5 Produk Terbaru yang baru saja masuk
      const { data: recentData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        products: prodCount || 0,
        users: userCount || 0
      })
      setRecentProducts(recentData || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  )

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 text-sm">Monitoring aktivitas sistem Circle Food.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Server Status</p>
          <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Operational
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <Package size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Inventory Products</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{stats.products}</h3>
            <span className="text-slate-400 text-xs italic">Items</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Active Admins</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{stats.users}</h3>
            <span className="text-slate-400 text-xs italic">Accounts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Data Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-slate-400" />
              <h4 className="font-bold text-slate-800">Recently Added Products</h4>
            </div>
            <Link href="/admin/products" className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentProducts.length > 0 ? (
                  recentProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                            {item.image_url ? (
                              <img src={item.image_url} className="w-full h-full object-cover" alt="" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Package size={14} />
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-slate-700 truncate max-w-[150px]">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        Rp {item.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-[11px] text-slate-400 font-medium">
                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-10 text-center text-slate-400 text-sm italic">
                      Belum ada data produk baru.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-1">Quick Action</h4>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">Tambahkan menu baru ke katalog produk Anda dengan cepat.</p>
              <Link 
                href="/admin/products" 
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors"
              >
                <Plus size={16} /> Create Product
              </Link>
            </div>
            <Package className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-500" size={120} />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              System Info
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Database Role</span>
                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Admin / Superuser</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Environment</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}