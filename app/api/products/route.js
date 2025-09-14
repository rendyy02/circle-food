import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase/client" // pakai client.js biasa

// GET → Ambil semua produk
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase GET error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error("Route GET error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST → Tambah produk baru
export async function POST(req) {
  try {
    const body = await req.json()

    const { data, error } = await supabase.from("products").insert([
      {
        name: body.name,
        description: body.description,
        price: body.price,
        image_url: body.image_url,
      },
    ])

    if (error) {
      console.error("Supabase POST error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error("Route POST error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
