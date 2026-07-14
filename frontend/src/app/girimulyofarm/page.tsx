"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import {
  Bird, Wheat, CalendarDays, Scale,
  Phone, ChevronRight, CheckCircle2,
  Maximize2, Egg, Palette, ShieldCheck,
} from "lucide-react";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "lohmann" | "telur";

// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  {
    icon: Bird,
    label: "Populasi",
    value: "1.271",
    unit: "Ekor",
    desc: "Ayam betina produktif aktif",
    bg: "#FFF7ED",
    iconColor: "#C2551C",
  },
  {
    icon: Wheat,
    label: "Pakan",
    value: "Complete",
    unit: "Feed",
    desc: "Pakan formulasi seimbang",
    bg: "#F0FDF4",
    iconColor: "#2C5F1A",
  },
  {
    icon: CalendarDays,
    label: "Masa Produktif",
    value: ">100",
    unit: "Minggu",
    desc: "Umur produktif panjang",
    bg: "#FFF7ED",
    iconColor: "#8B5E3C",
  },
  {
    icon: Scale,
    label: "Ransum Harian",
    value: "125",
    unit: "gram",
    desc: "2× sehari, pagi & sore",
    bg: "#F0FDF4",
    iconColor: "#2C5F1A",
  },
];

const EGG_QUALITIES = [
  {
    icon: Maximize2,
    label: "Ukuran",
    variants: ["Besar", "Sedang", "Kecil"],
    variantColors: ["bg-[#8B5E3C]/15 text-[#6B3A1F]", "bg-[#A07850]/15 text-[#8B5E3C]", "bg-[#C4A882]/20 text-[#8B6040]"],
    desc: "Dikelompokkan berdasarkan berat telur per butir.",
  },
  {
    icon: Egg,
    label: "Bentuk",
    variants: ["Oval", "Bulat"],
    variantColors: ["bg-[#2C5F1A]/10 text-[#1C4010]", "bg-[#4A8A30]/10 text-[#2C5F1A]"],
    desc: "Standar bentuk ideal untuk konsumsi dan kemasan.",
  },
  {
    icon: ShieldCheck,
    label: "Keutuhan Kerabang",
    variants: ["Kompak", "Retak"],
    variantColors: ["bg-[#2C5F1A]/10 text-[#1C4010]", "bg-red-100 text-red-700"],
    desc: "Kerabang kompak lebih tahan lama dan aman konsumsi.",
  },
  {
    icon: Palette,
    label: "Warna",
    variants: ["Cokelat Muda", "Cokelat", "Cokelat Gelap"],
    variantColors: [],
    isColor: true,
    swatches: ["#D4A88A", "#A0704A", "#6B3A20"],
    desc: "Variasi warna alami kulit telur ayam Lohmann Brown.",
  },
];

const FEATURES = [
  "Tingkat produksi telur 85–92% per hari",
  "Tahan terhadap penyakit lingkungan tropis",
  "Konversi pakan sangat efisien (FCR <2)",
  "Telur berukuran konsisten dan bernilai jual tinggi",
  "Tidak agresif, mudah dikelola dalam kandang koloni",
];

// ─── Components ──────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-16 relative overflow-hidden bg-[#1C1008]">
      {/* BG image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1694984716468-e61f15c4f851?w=1600&h=700&fit=crop&auto=format"
          alt="Ayam Lohmann Brown di padang rumput hijau Girimulyo Farm"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1008]/90 via-[#1C1008]/60 to-[#1C1008]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#8B5E3C]/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-7">
            <Bird className="w-3 h-3" /> Unit Peternakan · BUMDes Girimulyo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-4 font-serif">
            Girimulyo <em className="italic font-light text-[#D4A882]">Farm</em>
          </h1>
          <p className="text-[#D4A882] font-semibold text-base md:text-lg mb-3 tracking-wide">
            Pusat Peternakan Ayam Petelur Berkualitas
          </p>
          <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-lg">
            Mengembangkan populasi ayam Lohmann Brown pilihan di ketinggian Desa Giripurno untuk
            menghasilkan telur segar bermutu tinggi bagi pasar lokal Kota Batu.
          </p>

          {/* Quick stats strip */}
          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { v: "1.271", l: "Ekor Ayam" },
              { v: "85–92%", l: "Produksi/Hari" },
              { v: ">100", l: "Minggu Produktif" },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="text-2xl font-bold text-white font-serif">{v}</div>
                <div className="text-white/45 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TabbedContent() {
  const [tab, setTab] = useState<Tab>("lohmann");

  return (
    <section className="py-20 bg-[#FDF8F0]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="text-center mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[#8B5E3C] mb-3">
            Data Teknis
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1A16] font-serif">
            Profil Unggas & Kualitas Produk
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[#EDE6D8] rounded-2xl p-1.5 gap-1">
            {([
              { id: "lohmann" as Tab, label: "🐔 Ayam Lohmann" },
              { id: "telur" as Tab, label: "🥚 Kualitas Telur" },
            ] as const).map(({ id, label }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 whitespace-nowrap ${
                  tab === id
                    ? "bg-white text-[#1C1A16] shadow-sm shadow-[#8B5E3C]/10"
                    : "text-[#6B5E4A] hover:text-[#1C1A16]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB: Ayam Lohmann ── */}
        {tab === "lohmann" && (
          <div className="animate-in fade-in duration-300">
            {/* 2×2 stat cards */}
            <div className="grid grid-cols-2 gap-5 mb-12">
              {STATS.map(({ icon: Icon, label, value, unit, desc, bg, iconColor }) => (
                <div key={label}
                  className="bg-white rounded-2xl p-6 md:p-7 border border-[#8B5E3C]/8 hover:border-[#8B5E3C]/25 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                      <Icon className="w-5 h-5" style={{ color: iconColor }} />
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C4A882] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#A08060] mb-1.5">
                    {label}
                  </p>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-3xl font-bold text-[#1C1A16] font-serif">{value}</span>
                    <span className="text-sm font-semibold text-[#8B5E3C]">{unit}</span>
                  </div>
                  <p className="text-xs text-[#9B8878] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Breed info card */}
            <div className="bg-[#1C1008] rounded-2xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-72 h-52 md:h-auto shrink-0 bg-[#2A1A0A] overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1694984717361-6ad859014d2a?w=600&h=500&fit=crop&auto=format"
                    alt="Ayam Lohmann Brown close-up di Girimulyo Farm"
                    fill
                    sizes="288px"
                    className="object-cover opacity-70"
                  />
                </div>
                <div className="p-7 md:p-9 flex-1">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#D4A882]/70 mb-3">
                    Mengapa Lohmann Brown?
                  </div>
                  <h3 className="text-xl font-bold text-white mb-5 font-serif">
                    Ras Unggulan Pilihan Girimulyo Farm
                  </h3>
                  <ul className="space-y-3">
                    {FEATURES.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#6DBF40] shrink-0 mt-0.5" />
                        <span className="text-white/65 text-sm leading-relaxed">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Kualitas Telur ── */}
        {tab === "telur" && (
          <div className="animate-in fade-in duration-300">
            {/* Hero egg image */}
            <div className="relative h-52 rounded-2xl overflow-hidden mb-10 bg-[#2A1A0A]">
              <Image
                src="https://images.unsplash.com/photo-1635843125569-b7fb33d26fab?w=1200&h=400&fit=crop&auto=format"
                alt="Telur cokelat segar dalam keranjang hasil panen Girimulyo Farm"
                fill
                sizes="100vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1008]/80 via-[#1C1008]/30 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8">
                <div>
                  <p className="text-[#D4A882] text-xs font-bold tracking-widest uppercase mb-2">
                    Standar Kualitas
                  </p>
                  <h3 className="text-3xl font-bold text-white font-serif">
                    Telur Segar <em className="italic font-light text-[#D4A882]">Girimulyo</em>
                  </h3>
                </div>
              </div>
            </div>

            {/* Quality cards */}
            <div className="space-y-4">
              {EGG_QUALITIES.map(({ icon: Icon, label, variants, variantColors, desc, isColor, swatches }) => (
                <div key={label}
                  className="bg-white rounded-2xl p-6 border border-[#8B5E3C]/8 hover:border-[#8B5E3C]/20 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-[#8B5E3C]" style={{ width: "18px", height: "18px" }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <h4 className="font-bold text-[#1C1A16] text-sm mb-1">
                            {label}
                          </h4>
                          <p className="text-[#9B8878] text-xs leading-relaxed">
                            {desc}
                          </p>
                        </div>

                        {/* Variant chips */}
                        <div className="flex flex-wrap gap-2 shrink-0">
                          {isColor && swatches
                            ? variants.map((v, i) => (
                              <div key={v} className="flex items-center gap-2 bg-[#F9F5EE] rounded-full px-3 py-1.5 border border-[#E8DFD0]">
                                <span
                                  className="w-4 h-4 rounded-full shrink-0 border border-white shadow-sm"
                                  style={{ background: swatches[i] }}
                                />
                                <span className="text-[#4A3F30] text-xs font-medium">
                                  {v}
                                </span>
                              </div>
                            ))
                            : variants.map((v, i) => (
                              <span key={v}
                                className={`${variantColors[i] || "bg-[#F0EBE0] text-[#6B5E4A]"} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                                {v}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Egg grade note */}
            <div className="mt-8 bg-[#F0FDF4] border border-[#2C5F1A]/15 rounded-2xl px-6 py-5 flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-[#2C5F1A] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#1C4010] text-sm mb-1">
                  Seleksi Telur Dilakukan Setiap Hari
                </p>
                <p className="text-[#4A7040] text-xs leading-relaxed">
                  Setiap telur diseleksi berdasarkan ukuran, bentuk, keutuhan kerabang, dan warna sebelum dikemas dan didistribusikan ke pasar. Hanya telur berkualitas Grade A yang lolos seleksi.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="py-16 bg-[#EDE6D8]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#2C5F1A] rounded-3xl px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center gap-10 justify-between">
          <div className="max-w-md">
            <p className="text-[#A8D97A] text-xs font-bold tracking-widest uppercase mb-3">
              Hubungi Kami
            </p>
            <h2 className="text-3xl font-bold text-white mb-3 font-serif">
              Pesan Telur atau<br />
              <em className="italic font-light text-[#A8D97A]">Kunjungi Farm Kami</em>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Kami melayani pembelian langsung, pengiriman ke area Batu–Malang, dan kunjungan edukasi agrowisata untuk sekolah dan keluarga.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[220px]">
            <a href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20memesan%20telur%20dari%20Girimulyo%20Farm"
              target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1DAE55] text-white font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm">
              <Phone className="w-4 h-4" /> WhatsApp Pesan Telur
            </a>
            <a href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20kunjungan%20agrowisata%20Girimulyo%20Farm"
              target="_blank" rel="noopener noreferrer"
              className="border border-white/25 hover:border-white/50 text-white font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm">
              Daftar Agrowisata
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// function Footer() {
//   return (
//     <footer className="bg-[#1C1008] py-10">
//       <div className="max-w-5xl mx-auto px-6">
//         <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
//           {/* Brand */}
//           <div className="max-w-xs">
//             <div className="flex items-center gap-2.5 mb-3">
//               <div className="w-7 h-7 rounded-full bg-[#2C5F1A] flex items-center justify-center">
//                 <Leaf className="w-3.5 h-3.5 text-white" />
//               </div>
//               <span className="text-white font-bold text-sm tracking-wide"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//                 Girimulyo <span className="text-[#D4A882]">Farm</span>
//               </span>
//             </div>
//             <p className="text-white/35 text-xs leading-relaxed"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//               Unit peternakan ayam petelur milik BUMDes Girimulyo, Desa Giripurno, Kota Batu.
//             </p>
//           </div>

//           {/* Contact */}
//           <div className="space-y-3">
//             <div className="flex items-start gap-3">
//               <MapPin className="w-4 h-4 text-[#8B5E3C] shrink-0 mt-0.5" />
//               <p className="text-white/45 text-xs leading-relaxed"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//                 Desa Giripurno, Kec. Bumiaji<br />Kota Batu, Jawa Timur 65336
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <Phone className="w-4 h-4 text-[#8B5E3C] shrink-0" />
//               <a href="tel:+6281234567890" className="text-white/45 text-xs hover:text-white/70 transition-colors"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//                 +62 812-3456-7890
//               </a>
//             </div>
//             <div className="flex items-center gap-3">
//               <Mail className="w-4 h-4 text-[#8B5E3C] shrink-0" />
//               <a href="mailto:farm@giripurno.desa.id" className="text-white/45 text-xs hover:text-white/70 transition-colors"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//                 farm@giripurno.desa.id
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
//           <p className="text-white/20 text-xs"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//             © 2024 Girimulyo Farm · BUMDes Girimulyo
//           </p>
//           <div className="flex gap-5">
//             <Link href="/" className="text-white/20 hover:text-white/45 text-xs transition-colors"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//               Beranda BUMDes
//             </Link>
//             <Link href="/manahayuresort" className="text-white/20 hover:text-white/45 text-xs transition-colors"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//               Manahayu Resort
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GirimulyoFarm() {
  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      <Navbar />
      <Hero />
      <TabbedContent />
      <ContactCTA />
      <Footer />
    </div>
  );
}
