"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import {
  Bird, Wheat, CalendarDays, Scale,
  Phone, CheckCircle2,
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
              { v: "25 jam", l: "Jadwal Bertelur" },
              { v: "> 100 Minggu", l: "Usia Produktif" },
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
    <section className="py-20 md:py-28 bg-[#FDF8F0]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header — left-aligned, editorial */}
        <div className="mb-14 md:mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C] mb-4">
            Data Teknis
          </p>
          <h2 className="text-4xl md:text-[3.25rem] font-bold text-[#1C1A16] font-serif leading-[1.08]">
            Profil Unggas<br className="hidden md:block" />{" "}
            <span className="text-[#8B5E3C]/40">&</span>{" "}
            Kualitas Produk
          </h2>
        </div>

        {/* Tab bar — underline indicator, left-aligned */}
        <div className="flex gap-7 mb-14 border-b border-[#8B5E3C]/12">
          {([
            { id: "lohmann" as Tab, label: "Ayam Lohmann" },
            { id: "telur" as Tab, label: "Kualitas Telur" },
          ] as const).map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`pb-3.5 text-sm font-semibold tracking-wide transition-colors relative ${
                tab === id
                  ? "text-[#1C1A16]"
                  : "text-[#8B5E3C]/40 hover:text-[#8B5E3C]/70"
              }`}
            >
              {label}
              {tab === id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2C5F1A] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* ── TAB: Ayam Lohmann ── */}
        {tab === "lohmann" && (
          <div className="animate-in fade-in duration-300">
            {/* Asymmetric two-column: image + data sheet */}
            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-10 mb-10">
              {/* Left — large image with floating stat */}
              <div className="relative rounded-3xl overflow-hidden bg-[#2A1A0A] min-h-[340px] md:min-h-[440px]">
                <Image
                  src="https://images.unsplash.com/photo-1694984717361-6ad859014d2a?w=800&h=600&fit=crop&auto=format"
                  alt="Ayam Lohmann Brown di Girimulyo Farm"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/85 via-[#1C1008]/15 to-transparent" />

                {/* Floating stat badge */}
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A882]/60 mb-2">
                    Populasi Aktif
                  </p>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-6xl md:text-7xl font-bold text-white font-serif leading-none">
                      1.271
                    </span>
                    <span className="text-base font-semibold text-[#D4A882] tracking-wide">
                      Ekor
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — data specimen sheet */}
              <div className="flex flex-col justify-center py-2">
                {STATS.map(({ icon: Icon, label, value, unit, desc, iconColor }, i) => (
                  <div
                    key={label}
                    className={`py-5 ${i !== 0 ? "border-t border-[#8B5E3C]/10" : ""}`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon className="w-3.5 h-3.5" style={{ color: iconColor }} />
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8B5E3C]">
                        {label}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-[2.75rem] font-bold text-[#1C1A16] font-serif leading-none">
                        {value}
                      </span>
                      <span className="text-sm font-medium text-[#8B5E3C]">{unit}</span>
                    </div>
                    <p className="text-xs text-[#9B8878] mt-1.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Breed features — wide editorial dark section */}
            <div className="bg-[#1C1008] rounded-3xl p-8 md:p-10 lg:p-12">
              <div className="md:flex md:items-start md:gap-14">
                <div className="mb-7 md:mb-0 md:w-1/3 shrink-0">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A882]/50 mb-3">
                    Mengapa Lohmann Brown?
                  </p>
                  <h3 className="text-2xl md:text-[1.65rem] font-bold text-white font-serif leading-snug">
                    Ras Unggulan Pilihan Girimulyo Farm
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-3.5">
                    {FEATURES.map(f => (
                      <li key={f} className="flex items-start gap-3.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6DBF40] shrink-0 mt-2" />
                        <span className="text-white/55 text-sm leading-relaxed">{f}</span>
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
            {/* Image strip with overlay */}
            <div className="relative h-48 md:h-60 rounded-3xl overflow-hidden mb-10 bg-[#2A1A0A]">
              <Image
                src="https://images.unsplash.com/photo-1635843125569-b7fb33d26fab?w=1200&h=400&fit=crop&auto=format"
                alt="Telur cokelat segar hasil panen Girimulyo Farm"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1008]/85 via-[#1C1008]/40 to-transparent" />
              <div className="absolute inset-0 flex items-center px-9 md:px-12">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A882]/60 mb-2.5">
                    Standar Kualitas
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white font-serif">
                    Telur Segar{" "}
                    <em className="italic font-light text-[#D4A882]">Girimulyo</em>
                  </h3>
                </div>
              </div>
            </div>

            {/* Quality cards — 2-col grid with colored left border */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {EGG_QUALITIES.map(({ icon: Icon, label, variants, variantColors, desc, isColor, swatches }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-[#8B5E3C]/8 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <div className="flex h-full">
                    {/* Colored left accent */}
                    <div className="w-[3px] bg-[#8B5E3C]/40 shrink-0" />
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
                          <Icon className="text-[#8B5E3C]" style={{ width: 16, height: 16 }} />
                        </div>
                        <h4 className="font-bold text-[#1C1A16] text-sm">{label}</h4>
                      </div>
                      <p className="text-[#9B8878] text-xs leading-relaxed mb-4">
                        {desc}
                      </p>
                      {/* Variant chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {isColor && swatches
                          ? variants.map((v, i) => (
                              <div
                                key={v}
                                className="flex items-center gap-2 bg-[#F9F5EE] rounded-full px-3 py-1.5 border border-[#E8DFD0]"
                              >
                                <span
                                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-white shadow-sm"
                                  style={{ background: swatches[i] }}
                                />
                                <span className="text-[#4A3F30] text-xs font-medium">
                                  {v}
                                </span>
                              </div>
                            ))
                          : variants.map((v, i) => (
                              <span
                                key={v}
                                className={`${variantColors[i] || "bg-[#F0EBE0] text-[#6B5E4A]"} text-xs font-semibold px-3 py-1.5 rounded-full`}
                              >
                                {v}
                              </span>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grade note */}
            <div className="bg-[#F0FDF4] border border-[#2C5F1A]/15 rounded-2xl px-6 py-5 flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-[#2C5F1A] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#1C4010] text-sm mb-1">
                  Seleksi Telur Dilakukan Setiap Hari
                </p>
                <p className="text-[#4A7040] text-xs leading-relaxed">
                  Setiap telur diseleksi berdasarkan ukuran, bentuk, keutuhan
                  kerabang, dan warna sebelum dikemas dan didistribusikan ke
                  pasar. Hanya telur berkualitas Grade A yang lolos seleksi.
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
      <div className="max-w-4xl mx-auto px-6">
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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_FARM}?text=Halo%2C%20saya%20ingin%20memesan%20telur%20dari%20Girimulyo%20Farm`}
              target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1DAE55] text-white font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm">
              <Phone className="w-4 h-4" /> WhatsApp Pesan Telur
            </a>
            {/* <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_FARM}?text=Halo%2C%20saya%20tertarik%20kunjungan%20agrowisata%20Girimulyo%20Farm`}
              target="_blank" rel="noopener noreferrer"
              className="border border-white/25 hover:border-white/50 text-white font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm">
              Daftar Agrowisata
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

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
