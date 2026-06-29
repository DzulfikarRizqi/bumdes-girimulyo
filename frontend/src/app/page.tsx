"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Leaf, MapPin, Phone, Mail, Circle, Square, Triangle,
  ChevronDown, ArrowRight, Menu, X, ExternalLink
} from "lucide-react";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${scrolled ? "bg-[#F7F3EC]/96 backdrop-blur-md shadow-sm border-b border-[#2C5F1A]/10" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#2C5F1A] flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className={`font-bold text-sm tracking-wide transition-colors ${scrolled ? "text-[#1C1A16]" : "text-white"}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            BUMDes <span className="text-[#8B5E3C]">GIRIMULYO</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Beranda", to: "/" },
            { label: "Girimulyo Farm", to: "/girimulyofarm" },
            { label: "Manahayu Resort", to: "/manahayuresort" },
          ].map(l => (
            <Link key={l.to} href={l.to}
              className={`text-sm font-medium transition-colors hover:text-[#2C5F1A] ${scrolled ? "text-[#1C1A16]/70" : "text-white/80"}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {l.label}
            </Link>
          ))}
          <a href="https://desagiripurno.id" target="_blank" rel="noopener noreferrer"
            className="bg-[#2C5F1A] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#3A7A22] transition-colors flex items-center gap-1.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Portal Desa <ExternalLink className="w-3 h-3" />
          </a>
        </nav>

        <button className={`md:hidden ${scrolled ? "text-[#1C1A16]" : "text-white"}`} onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#F7F3EC] border-t border-[#2C5F1A]/10 px-6 py-5 flex flex-col gap-4">
          {[{ label: "Beranda", to: "/" }, { label: "Girimulyo Farm", to: "/girimulyofarm" }, { label: "Manahayu Resort", to: "/manahayuresort" }].map(l => (
            <Link key={l.to} href={l.to} onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#1C1A16]/70 hover:text-[#2C5F1A]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {l.label}
            </Link>
          ))}
          <a href="https://desagiripurno.id" target="_blank" rel="noopener noreferrer"
            className="bg-[#2C5F1A] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center flex items-center justify-center gap-1.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Portal Desa <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0D2408]">
        <img src="https://images.unsplash.com/photo-1556019947-8695cb3d4e81?w=1600&h=900&fit=crop&auto=format"
          alt="Pemandangan udara desa berlatar pegunungan hijau" className="w-full h-full object-cover opacity-50 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D2408]/65 via-[#1C3A10]/25 to-[#0D2408]/85" />
      </div>
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2C5F1A] via-[#8B5E3C] to-[#2C5F1A]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/75 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <Leaf className="w-3 h-3 text-[#6DBF40]" />
          Desa Giripurno · Kota Batu · Jawa Timur
        </div>
        <h1 className="text-5xl md:text-[68px] font-bold text-white leading-[1.04] mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
          Menggerakkan Ekonomi,
          <br /><em className="italic font-light text-[#A8D97A]">Membangun Desa</em>
        </h1>
        <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          BUMDes Girimulyo adalah motor penggerak ekonomi lokal Desa Giripurno — mengelola pertanian organik dan pariwisata resort untuk kesejahteraan bersama.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => document.getElementById("unit-usaha")?.scrollIntoView({ behavior: "smooth" })}
            className="group bg-[#2C5F1A] hover:bg-[#3A7A22] text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-[#2C5F1A]/30 hover:-translate-y-0.5 cursor-pointer"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Lihat Unit Usaha <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35">
        <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Scroll ke bawah</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

function BusinessUnits() {
  const router = useRouter();
  return (
    <section id="unit-usaha" className="py-24 bg-[#F7F3EC]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8B5E3C] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Unit Usaha</div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1A16]" style={{ fontFamily: "'Fraunces', serif" }}>Dua Pilar Unggulan</h2>
          <p className="mt-4 text-[#6B5E4A] max-w-lg mx-auto text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Dari ladang organik hingga resort alam — kami kelola dengan sepenuh hati untuk kemakmuran warga dan kenyamanan tamu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Farm Card */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-[#2C5F1A]/10 hover:shadow-2xl hover:shadow-[#2C5F1A]/10 transition-all duration-500 hover:-translate-y-1.5">
            <div className="relative h-72 bg-[#1C3A10] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1762414103968-0e1c31b1aaca?w=800&h=520&fit=crop&auto=format"
                alt="Keranjang hasil panen sayuran dan buah organik Girimulyo Farm"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A10]/70 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#2C5F1A] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Leaf className="w-3 h-3" /> Pertanian Organik
              </div>
              <div className="absolute bottom-5 left-6">
                <p className="text-white/60 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Hasil panen langsung dari kebun</p>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#1C1A16] mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Girimulyo Farm</h3>
              <p className="text-[#6B5E4A] text-sm leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Pertanian organik terpadu di lahan subur Giripurno. Menghasilkan sayuran segar, buah lokal, dan produk olahan yang dipasarkan langsung ke konsumen dan restoran Kota Batu.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Sayuran Organik", "Buah Musiman", "Agrowisata", "Edukasi Tani"].map(tag => (
                  <span key={tag} className="bg-[#EDE6D8] text-[#4A3F30] text-xs font-medium px-3 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{tag}</span>
                ))}
              </div>
              <button onClick={() => router.push("/girimulyofarm")}
                className="group/btn w-full bg-[#2C5F1A] hover:bg-[#3A7A22] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Jelajahi Farm <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Resort Card */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-[#8B5E3C]/10 hover:shadow-2xl hover:shadow-[#8B5E3C]/10 transition-all duration-500 hover:-translate-y-1.5">
            <div className="relative h-72 bg-[#3A1F0A] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1760942992111-a65227a3b266?w=800&h=520&fit=crop&auto=format"
                alt="Kolam renang resort dengan tanaman tropis dan gazebo bambu"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A1F0A]/70 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#8B5E3C] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                🌿 Resort & Wisata
              </div>
              <div className="absolute bottom-5 left-6">
                <p className="text-white/60 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pengalaman menginap di alam terbuka</p>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#1C1A16] mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Manahayu Resort</h3>
              <p className="text-[#6B5E4A] text-sm leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Penginapan eksklusif bernuansa alam tropis di ketinggian Giripurno. Cottage kayu, villa view panorama, dan paket wisata alam — pelarian sempurna dari hiruk-pikuk kota.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Cottage Kayu", "Villa Panorama", "Paket Wisata", "Gathering"].map(tag => (
                  <span key={tag} className="bg-[#F5EDE3] text-[#6B3A1F] text-xs font-medium px-3 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{tag}</span>
                ))}
              </div>
              <button onClick={() => router.push("/manahayuresort")}
                className="group/btn w-full bg-[#8B5E3C] hover:bg-[#A0703F] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Lihat Resort <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const items = [
    { icon: "🌱", title: "Berbasis Komunitas", desc: "Semua keuntungan kembali ke warga Desa Giripurno melalui program pemberdayaan." },
    { icon: "♻️", title: "Berkelanjutan", desc: "Praktik pertanian dan pariwisata yang menjaga kelestarian alam pegunungan Batu." },
    { icon: "🤝", title: "Terbuka untuk Mitra", desc: "Kami mengundang investor dan mitra bisnis untuk tumbuh bersama desa." },
    { icon: "📍", title: "Lokasi Strategis", desc: "Terletak di Kecamatan Bumiaji, pusat agrowisata dan alam Kota Batu, Jawa Timur." },
  ];
  return (
    <section className="py-24 bg-[#EDE6D8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8B5E3C] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Mengapa Kami</div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1A16]" style={{ fontFamily: "'Fraunces', serif" }}>
            Nilai yang Kami Jaga
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-6 border border-[#2C5F1A]/8 hover:border-[#2C5F1A]/25 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="font-bold text-[#1C1A16] mb-2 text-base" style={{ fontFamily: "'Fraunces', serif" }}>{item.title}</h4>
              <p className="text-[#6B5E4A] text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1C1A16] text-white/60 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#2C5F1A] flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                BUMDes <span className="text-[#8B5E3C]">GIRIMULYO</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Badan Usaha Milik Desa Giripurno — menggerakkan ekonomi lokal melalui pertanian organik dan pariwisata resort.
            </p>
            <div className="flex gap-3">
              {[Circle, Square, Triangle].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tautan</h4>
            <ul className="space-y-2.5">
              {[{ l: "Beranda", to: "/" }, { l: "Girimulyo Farm", to: "/girimulyofarm" }, { l: "Manahayu Resort", to: "/manahayuresort" }, { l: "Portal Desa Giripurno", to: "#" }].map(({ l, to }) => (
                <li key={l}><Link href={to} className="text-sm hover:text-white transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2C5F1A] shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Desa Giripurno, Kec. Bumiaji,<br />Kota Batu, Jawa Timur 65336</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2C5F1A] shrink-0" />
                <a href="tel:+6234112345" className="text-sm hover:text-white transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>(0341) 123-4567</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#2C5F1A] shrink-0" />
                <a href="mailto:bumdes@giripurno.desa.id" className="text-sm hover:text-white transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>bumdes@giripurno.desa.id</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>© 2026 BUMDes Girimulyo. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            {/* <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Portal Desa Giripurno</a> */}
            <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pemerintah Kota Batu</p>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            {/* <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pemerintah Kota Batu</a> */}
            <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>© 2026 BUMDes Girimulyo. Hak cipta dilindungi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      <Header />
      <Hero />
      <BusinessUnits />
      <WhySection />
      <Footer />
    </div>
  );
}
