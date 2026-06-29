import Link from "next/link";
import { Leaf, ArrowLeft, ShoppingBag, Users, Phone, CheckCircle } from "lucide-react";

const PRODUCTS = [
  {
    img: "photo-1706784694581-4c6e001c3c37",
    name: "Sayuran Segar Campur",
    desc: "Aneka sayuran organik segar langsung dari kebun — bayam, kangkung, wortel, dan brokoli.",
    price: "Rp 15.000 / kg",
    badge: "Tersedia",
    badgeColor: "bg-[#2C5F1A]",
  },
  {
    img: "photo-1659822887922-c1386185cc6b",
    name: "Paket Sayur Harian",
    desc: "Paket sayuran pilihan untuk kebutuhan dapur harian. Segar, bersih, tanpa pestisida kimia.",
    price: "Rp 45.000 / paket",
    badge: "Best Seller",
    badgeColor: "bg-[#8B5E3C]",
  },
  {
    img: "photo-1553787434-45e1d245bfbb",
    name: "Aneka Umbi & Rempah",
    desc: "Jahe, kunyit, temulawak, dan umbi lokal pilihan. Ideal untuk jamu, masakan, dan UMKM.",
    price: "Rp 20.000 / kg",
    badge: "Organik",
    badgeColor: "bg-[#2C5F1A]",
  },
  {
    img: "photo-1741112477809-b776ab602c2d",
    name: "Petai & Kacang Lokal",
    desc: "Petai segar, kacang panjang, dan polong-polongan khas ladang Giripurno yang subur.",
    price: "Rp 18.000 / ikat",
    badge: "Tersedia",
    badgeColor: "bg-[#2C5F1A]",
  },
  {
    img: "photo-1762414103968-0e1c31b1aaca",
    name: "Paket Hamper Panen",
    desc: "Keranjang buah dan sayur segar pilihan — cocok untuk hadiah, oleh-oleh, dan acara spesial.",
    price: "Rp 120.000 / keranjang",
    badge: "Populer",
    badgeColor: "bg-[#8B5E3C]",
  },
  {
    img: "photo-1655178353433-2e774ba32ff4",
    name: "Paket Agrowisata",
    desc: "Kunjungan kebun + petik langsung + edukasi pertanian organik untuk keluarga dan sekolah.",
    price: "Rp 75.000 / orang",
    badge: "Wisata",
    badgeColor: "bg-[#2C5F1A]",
  },
];

const PROGRAMS = [
  { icon: "🌱", title: "Pertanian Organik", desc: "Budidaya tanpa pestisida kimia. Menjaga kesuburan tanah jangka panjang." },
  { icon: "🎓", title: "Edukasi Agrowisata", desc: "Program kunjungan kebun untuk pelajar, keluarga, dan komunitas." },
  { icon: "🤝", title: "Kemitraan Petani", desc: "Memberdayakan petani lokal melalui sistem bagi hasil yang adil." },
  { icon: "📦", title: "Distribusi Langsung", desc: "Pengiriman ke pasar, restoran, dan konsumen di Kota Batu tanpa perantara." },
];

const WA_FARM = "6281234567890";

export default function GirimulyoFarm() {
  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#F7F3EC]/96 backdrop-blur-md border-b border-[#2C5F1A]/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#2C5F1A] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide text-[#1C1A16]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              BUMDes <span className="text-[#8B5E3C]">GIRIMULYO</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {[{ l: "Beranda", to: "/" }, { l: "Girimulyo Farm", to: "/girimulyofarm" }, { l: "Manahayu Resort", to: "/manahayuresort" }].map(({ l, to }) => (
              <Link key={to} href={to} className="text-sm font-medium text-[#1C1A16]/70 hover:text-[#2C5F1A] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l}</Link>
            ))}
          </nav>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-[#6B5E4A] hover:text-[#2C5F1A] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <ArrowLeft className="w-4 h-4" /> Beranda
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#0D2408]">
          <img src="https://images.unsplash.com/photo-1762414103968-0e1c31b1aaca?w=1600&h=800&fit=crop&auto=format"
            alt="Keranjang hasil panen sayuran dan buah segar Girimulyo Farm"
            className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2408] via-[#0D2408]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <div className="inline-flex items-center gap-2 bg-[#2C5F1A] text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <Leaf className="w-3 h-3" /> Unit Usaha BUMDes
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Girimulyo <em className="italic font-light text-[#A8D97A]">Farm</em>
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Pertanian organik terpadu di jantung Desa Giripurno — menyehatkan meja makan dan menghidupkan ekonomi petani lokal.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-[#2C5F1A]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map(p => (
              <div key={p.title} className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{p.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-[#F7F3EC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#8B5E3C] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Produk & Program</div>
            <h2 className="text-4xl font-bold text-[#1C1A16]" style={{ fontFamily: "'Fraunces', serif" }}>Hasil Kebun & Paket Kami</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(p => (
              <div key={p.name} className="group bg-white rounded-2xl overflow-hidden border border-[#2C5F1A]/8 hover:shadow-lg hover:shadow-[#2C5F1A]/8 hover:border-[#2C5F1A]/20 transition-all duration-400 hover:-translate-y-1">
                <div className="relative h-48 bg-[#1C3A10] overflow-hidden">
                  <img src={`https://images.unsplash.com/${p.img}?w=600&h=400&fit=crop&auto=format`}
                    alt={p.name} className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-600" />
                  <div className={`absolute top-3 left-3 ${p.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.badge}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1C1A16] mb-2 text-base" style={{ fontFamily: "'Fraunces', serif" }}>{p.name}</h3>
                  <p className="text-[#6B5E4A] text-xs leading-relaxed mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#2C5F1A] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.price}</span>
                    <a href={`https://wa.me/${WA_FARM}?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(p.name)}%20dari%20Girimulyo%20Farm`}
                      target="_blank" rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1DAE55] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <ShoppingBag className="w-3 h-3" /> Pesan
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#EDE6D8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#2C5F1A] rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="text-xs font-semibold tracking-widest uppercase text-[#A8D97A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Bergabung Bersama Kami</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
                Beli Langsung dari Petani,
                <br /><em className="italic font-light text-[#A8D97A]">atau Jadi Mitra Kami</em>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Kami melayani pembelian langsung, langganan mingguan, dan kemitraan untuk restoran, hotel, serta distributor di wilayah Malang Raya.
              </p>
              <ul className="mt-4 space-y-2">
                {["Harga langsung dari petani", "Pengiriman ke area Batu & Malang", "Paket langganan mingguan tersedia"].map(t => (
                  <li key={t} className="flex items-center gap-2 text-white/80 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <CheckCircle className="w-4 h-4 text-[#A8D97A] shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 shrink-0">
              <a href={`https://wa.me/${WA_FARM}?text=Halo,%20saya%20ingin%20memesan%20produk%20Girimulyo%20Farm`}
                target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1DAE55] text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-colors text-sm shadow-lg"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Phone className="w-4 h-4" /> Hubungi via WhatsApp
              </a>
              <a href={`https://wa.me/${WA_FARM}?text=Halo,%20saya%20tertarik%20menjadi%20mitra%20Girimulyo%20Farm`}
                target="_blank" rel="noopener noreferrer"
                className="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-colors text-sm justify-center"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Users className="w-4 h-4" /> Jadi Mitra Farm
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1A16] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#2C5F1A] flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>BUMDes <span className="text-[#8B5E3C]">GIRIMULYO</span></span>
          </div>
          <p className="text-white/30 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Desa Giripurno, Kec. Bumiaji, Kota Batu, Jawa Timur · © 2024</p>
          <Link href="/manahayuresort" className="text-[#8B5E3C] hover:text-[#A07050] text-sm font-medium transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Manahayu Resort →
          </Link>
        </div>
      </footer>
    </div>
  );
}
