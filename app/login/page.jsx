"use client"

import { useState } from "react"
import { supabase } from "@/utils/supabase/client"  // pakai client.js
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      return
    }

    // sementara langsung redirect ke /admin
    router.push("/admin")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Form */}
      <form
        onSubmit={handleLogin}
        data-aos="fade-up"
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl"
      >
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="Circle Food Logo"
            className="w-20 h-20 mx-auto rounded-full shadow-md mb-3 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800">Login Admin</h2>
          <p className="text-gray-500 text-sm mt-1">
            Masuk untuk mengelola produk Circle Food
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded-lg 
                     text-gray-800 placeholder-gray-400 
                     focus:ring-2 focus:ring-orange-400 focus:outline-none mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded-lg 
                     text-gray-800 placeholder-gray-400 
                     focus:ring-2 focus:ring-orange-400 focus:outline-none mb-4"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black py-2 rounded-lg font-semibold hover:opacity-95 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}
