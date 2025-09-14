export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-6 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-3">Circle Food</h2>
          <p className="text-gray-400 text-sm">
            Circle Food menyajikan dimsum & street food halal dengan cita rasa
            autentik, harga terjangkau, dan pelayanan terbaik.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h2 className="text-xl font-bold mb-3">Navigasi</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#home" className="hover:text-yellow-400 transition-colors">
                Beranda
              </a>
            </li>
            <li>
              <a href="#produk" className="hover:text-yellow-400 transition-colors">
                Produk
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-yellow-400 transition-colors">
                Tentang
              </a>
            </li>
            <li>
              <a href="#kontak" className="hover:text-yellow-400 transition-colors">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h2 className="text-xl font-bold mb-3">Kontak</h2>
          <p className="text-gray-400 text-sm">
            📍 XHG7+X77, Bojongkunci, Kec. Pameungpeuk, Kabupaten Bandung, Jawa
            Barat 40376
          </p>
          <p className="text-gray-400 text-sm">📞 +62 895-3899-42494</p>
          <p className="text-gray-400 text-sm">
            Instagram:{" "}
            <a
              href="https://www.instagram.com/circle.foodfd/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
            >
              @circle.foodfd
            </a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Circle Food. All Rights Reserved.
      </div>
    </footer>
  )
}
