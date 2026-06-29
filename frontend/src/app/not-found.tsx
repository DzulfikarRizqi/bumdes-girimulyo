import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-[#2C5F1A]/10 flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-7 h-7 text-[#2C5F1A]" />
        </div>
        <h1 className="text-6xl font-bold text-[#2C5F1A] mb-3" style={{ fontFamily: "'Fraunces', serif" }}>404</h1>
        <p className="text-[#6B5E4A] text-sm mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Halaman tidak ditemukan.</p>
        <Link href="/" className="bg-[#2C5F1A] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#3A7A22] transition-colors text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
