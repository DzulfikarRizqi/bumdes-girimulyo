import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-[#2C5F1A]/10 flex items-center justify-center mx-auto mb-6 overflow-hidden">
          <Image
            src="/logo-bumdes.png"
            alt="Logo BUMDes Girimulyo"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <h1 className="text-6xl font-bold font-serif text-[#2C5F1A] mb-3">404</h1>
        <p className="text-[#6B5E4A] text-sm mb-8">Halaman tidak ditemukan.</p>
        <Link href="/" className="bg-[#2C5F1A] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#3A7A22] transition-colors text-sm">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
