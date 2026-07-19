"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import {
  Bird, Wheat, CalendarDays, Scale,
  Phone, CheckCircle2,
  Maximize2, Egg, Palette, ShieldCheck,
  ArrowRight, Waves, Droplets, Sun, Clock
} from "lucide-react";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "lohmann" | "telur";

// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: Bird, label: "Populasi", value: 1271, unit: "Ekor", desc: "Ayam betina produktif aktif", color: "#C2551C" },
  { icon: Wheat, label: "Pakan", value: 100, unit: "Complete Feed", desc: "Pakan formulasi seimbang", color: "#2C5F1A", suffix: "" },
  { icon: CalendarDays, label: "Masa Produktif", value: 100, unit: "Minggu", desc: "Umur produktif panjang", color: "#8B5E3C", prefix: ">" },
  { icon: Scale, label: "Ransum Harian", value: 125, unit: "gram/ekor", desc: "2× sehari, pagi & sore", color: "#2C5F1A" },
];

const EGG_QUALITIES = [
  {
    icon: Maximize2, label: "Ukuran",
    variants: ["Besar", "Sedang", "Kecil"],
    colors: ["#8B5E3C", "#A07850", "#C4A882"],
    desc: "Dikelompokkan berdasarkan berat telur per butir.",
  },
  {
    icon: Egg, label: "Bentuk",
    variants: ["Oval", "Bulat"],
    colors: ["#2C5F1A", "#4A8A30"],
    desc: "Standar bentuk ideal untuk konsumsi dan kemasan.",
  },
  {
    icon: ShieldCheck, label: "Keutuhan Kerabang",
    variants: ["Kompak", "Retak (afkir)"],
    colors: ["#2C5F1A", "#DC2626"],
    desc: "Kerabang kompak lebih tahan lama dan aman konsumsi.",
  },
  {
    icon: Palette, label: "Warna",
    variants: ["Cokelat Muda", "Cokelat", "Cokelat Gelap"],
    colors: ["#D4A88A", "#A0704A", "#6B3A20"],
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

const ClipboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

const DAILY_CYCLE = [
  { time: "06:00", icon: Sun, label: "Pemberian Pakan Pagi", desc: "Ransum lengkap dengan formulasi nutrisi optimal" },
  { time: "09:00", icon: Egg, label: "Panen Telur", desc: "Pengambilan telur dari kandang baterai" },
  { time: "10:30", icon: Droplets, label: "Pengecekan Air & Kebersihan", desc: "Sanitasi tempat minum dan area kandang" },
  { time: "15:00", icon: Waves, label: "Pemberian Pakan Sore", desc: "Ransum tambahan sebelum malam hari" },
  { time: "17:00", icon: ClipboardIcon, label: "Sortir & Pengemasan", desc: "Grading telur berdasarkan standar kualitas" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}

// ─── Components ──────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grain">
        <Image
          src="https://images.unsplash.com/photo-1694984716468-e61f15c4f851?w=1600&h=900&fit=crop&auto=format"
          alt="Ayam Lohmann Brown di padang rumput hijau Girimulyo Farm"
          fill
          sizes="100vw"
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0A06]/95 via-[#1C1008]/70 to-[#1C1008]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A06] via-transparent to-transparent" />
      </div>

      {/* Top accent bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#2C5F1A] via-[#8B5E3C] to-[#D4A882]" />

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 pb-16 md:pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 reveal">
              Unit Peternakan · BUMDes Girimulyo
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.02] mb-4 font-serif reveal reveal-delay-1">
              Girimulyo <br className="sm:hidden" />
              <em className="italic font-light text-[#D4A882]">Farm</em>
            </h1>

            {/* Tagline */}
            <p className="text-[#D4A882] font-semibold text-base md:text-lg tracking-wide mb-3 reveal reveal-delay-2">
              Pusat Peternakan Ayam Petelur Berkualitas
            </p>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl reveal reveal-delay-3">
              Mengembangkan populasi ayam Lohmann Brown pilihan di ketinggian Desa Giripurno untuk
              menghasilkan telur segar bermutu tinggi bagi pasar lokal Kota Batu.
            </p>

            {/* CTA */}
            <div className="flex gap-3 mt-8 reveal reveal-delay-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_FARM}?text=Halo%2C%20saya%20ingin%20memesan%20telur%20dari%20Girimulyo%20Farm`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DAE55] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" /> Pesan via WhatsApp
              </a>
              <button
                onClick={() => document.getElementById("data-teknis")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 text-sm cursor-pointer"
              >
                Data Teknis <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating stats strip */}
        <div className="relative z-10 border-t border-white/10 bg-[#0F0A06]/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { v: "1.271", l: "Ekor Ayam" },
                { v: "25", l: "Siklus Bertelur", suffix: " Jam" },
                { v: ">100", l: "Minggu Produktif" },
                { v: "92", l: "Produksi Harian", suffix: "%" },
              ].map(({ v, l, suffix }, i) => (
                <div key={l} className="reveal" style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
                  <div className="text-xl md:text-2xl font-bold text-white font-serif tabular-nums">
                    {v}{suffix || ""}
                  </div>
                  <div className="text-white/40 text-[10px] tracking-wider mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabbedContent() {
  const [tab, setTab] = useState<Tab>("lohmann");

  useScrollReveal([tab]);

  return (
    <section id="data-teknis" className="py-20 md:py-28 bg-[#F7F3EC]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 md:mb-16 reveal">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C] mb-4">
            Data Teknis
          </p>
          <h2 className="text-4xl md:text-[3.25rem] font-bold text-[#1C1A16] font-serif leading-[1.08]">
            Profil Ayam <span className="text-[#8B5E3C]/40">&</span>{" "} Kualitas Produk
          </h2>
        </div>

        {/* Tab bar — pill style */}
        <div className="inline-flex bg-[#EDE6D8] rounded-2xl p-1 mb-12 reveal reveal-delay-1">
          {([
            { id: "lohmann" as Tab, label: "Ayam Lohmann Brown" },
            { id: "telur" as Tab, label: "Kualitas Telur" },
          ] as const).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                tab === id
                  ? "bg-white text-[#1C1A16] shadow-sm"
                  : "text-[#6B5E4A] hover:text-[#1C1A16]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── TAB: Ayam Lohmann ── */}
        {tab === "lohmann" && (
          <div className="space-y-10">
            {/* Main grid: image + stats */}
            <div className="grid md:grid-cols-5 gap-8 md:gap-10">
              {/* Left — image (3/5) */}
              <div className="md:col-span-3 relative rounded-2xl overflow-hidden bg-[#2A1A0A] min-h-[400px] md:min-h-[500px] group img-zoom reveal">
                <Image
                  src="https://images.unsplash.com/photo-1694984717361-6ad859014d2a?w=1000&h=700&fit=crop&auto=format"
                  alt="Ayam Lohmann Brown di Girimulyo Farm"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A06]/90 via-[#0F0A06]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A882]/60 mb-2">
                    Kelas Unggul
                  </p>
                  <h3 className="text-white font-bold font-serif text-xl md:text-2xl">
                    Lohmann Brown <em className="italic font-light text-[#D4A882]">Classic</em>
                  </h3>
                </div>
                {/* Floating badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  <p className="text-[#2C5F1A] text-xs font-bold">Populasi Aktif</p>
                  <p className="text-[#1C1A16] text-2xl font-bold font-serif">1.271</p>
                </div>
              </div>

              {/* Right — stats (2/5) */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                {STATS.map(({ icon: Icon, label, value, unit, desc, color }, i) => (
                  <div
                    key={label}
                    className="reveal bg-white rounded-xl border border-[#EDE6D8] p-4 md:p-5 hover:shadow-md hover:border-[#D4C8B8] transition-all duration-300"
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: `${color}CC` }}>{label}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl md:text-3xl font-bold text-[#1C1A16] font-serif leading-none">
                        {label === "Masa Produktif" ? ">" : ""}{value}
                      </span>
                      <span className="text-xs font-medium text-[#6B5E4A]">{unit}</span>
                    </div>
                    <p className="text-[#9B8878] text-xs mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily cycle timeline */}
            <div className="bg-white rounded-2xl border border-[#EDE6D8] p-6 md:p-8 reveal reveal-delay-2">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-4 h-4 text-[#8B5E3C]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C]">Siklus Harian</span>
                <div className="h-px flex-1 bg-[#EDE6D8]" />
              </div>
              <div className="grid sm:grid-cols-5 gap-3 md:gap-4">
                {DAILY_CYCLE.map(({ time, icon: Icon, label, desc }) => (
                  <div key={time} className="text-center p-4 rounded-xl bg-[#F7F3EC] hover:bg-[#EDE6D8] transition-colors duration-300">
                    <div className="text-xs font-bold text-[#2C5F1A] mb-2 font-mono">{time}</div>
                    <div className="w-8 h-8 rounded-full bg-[#2C5F1A]/10 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-4 h-4 text-[#2C5F1A]" />
                    </div>
                    <div className="text-xs font-semibold text-[#1C1A16] mb-1">{label}</div>
                    <div className="text-[10px] text-[#9B8878] leading-relaxed">{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breed features — dark editorial */}
            <div className="bg-[#1C1008] rounded-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden reveal reveal-delay-3">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#2C5F1A]/8 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 md:flex md:items-start md:gap-16">
                <div className="mb-6 md:mb-0 md:w-[280px] shrink-0">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A882]/50 mb-3">
                    Keunggulan Ras
                  </p>
                  <h3 className="text-2xl md:text-[1.65rem] font-bold text-white font-serif leading-snug">
                    Mengapa Lohmann Brown?
                  </h3>
                  <p className="text-white/35 text-xs mt-3 leading-relaxed">
                    Dipilih melalui seleksi ketat untuk performa optimal di iklim tropis dataran tinggi.
                  </p>
                </div>
                <div className="flex-1">
                  <ul className="space-y-3">
                    {FEATURES.map((f, i) => (
                      <li key={f} className="flex items-start gap-3.5 group">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2C5F1A]/20 text-[#A8D97A] text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">{f}</span>
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
          <div className="space-y-8">
            {/* Hero strip — more dramatic */}
            <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden bg-[#2A1A0A] reveal">
              <Image
                src="https://images.unsplash.com/photo-1635843125569-b7fb33d26fab?w=1200&h=500&fit=crop&auto=format"
                alt="Telur cokelat segar hasil panen Girimulyo Farm"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1008]/95 via-[#1C1008]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center px-8 md:px-12">
                <div className="reveal max-w-lg">
                  <div className="inline-flex items-center gap-2 bg-[#D4A882]/20 backdrop-blur-sm text-[#D4A882] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4 border border-[#D4A882]/20">
                    <ShieldCheck className="w-3 h-3" /> Standar Kualitas
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight">
                    Telur Segar{" "}
                    <em className="italic font-light text-[#D4A882]">Girimulyo</em>
                  </h3>
                  <p className="text-white/50 text-sm mt-2 max-w-md">
                    Setiap butir melewati proses grading ketat sebelum sampai ke tangan konsumen
                  </p>
                </div>
              </div>
              {/* Decorative gradient orb */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#D4A882]/15 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Quality specs — editorial 2-col */}
            <div className="grid md:grid-cols-2 gap-5 reveal reveal-delay-1">
              {EGG_QUALITIES.map(({ icon: Icon, label, variants, colors, desc }, idx) => (
                <div
                  key={label}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8DFD0] hover:shadow-xl hover:border-[#D4C8B8] transition-all duration-500"
                >
                  {/* Top gradient accent */}
                  <div
                    className="h-1.5 w-full"
                    style={{ background: `linear-gradient(90deg, ${colors[0]}, ${colors[colors.length - 1] || colors[0]})` }}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                        style={{ background: `${colors[0]}15` }}
                      >
                        <Icon className="w-[18px] h-[18px]" style={{ color: colors[0] }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#1C1A16] text-sm">{label}</h4>
                          <span className="text-[#9B8878] text-[10px] font-mono tracking-wider">
                            0{idx + 1}
                          </span>
                        </div>
                        <p className="text-[#9B8878] text-[10px] leading-relaxed">{desc}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {variants.map((v, i) => (
                        <div
                          key={v}
                          className="flex items-center gap-2.5 bg-[#F7F3EC] rounded-xl pl-2.5 pr-3.5 py-2 border border-[#E8DFD0] group-hover:border-[#D4C8B8] transition-colors"
                        >
                          <span
                            className="w-4 h-4 rounded-full shrink-0 border-2 border-white shadow-sm"
                            style={{ background: colors[i] }}
                          />
                          <span className="text-[#4A3F30] text-xs font-semibold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grade note — premium callout */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C3A10] to-[#0D2408] p-6 md:p-8 reveal reveal-delay-2">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#A8D97A]/8 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#D4A882]/8 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-[#A8D97A]/15 flex items-center justify-center shrink-0 border border-[#A8D97A]/20">
                  <CheckCircle2 className="w-6 h-6 text-[#A8D97A]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-base mb-1 font-serif">
                    Grade A — Seleksi Harian
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                    Setiap telur diseleksi berdasarkan ukuran, bentuk, keutuhan kerabang, dan warna
                    sebelum dikemas dan didistribusikan ke pasar. Hanya telur berkualitas{" "}
                    <span className="text-[#A8D97A] font-semibold">Grade A</span> yang lolos seleksi
                    ketat kami.
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                    <span className="text-white/40 text-[10px] tracking-wider uppercase font-medium">
                      Sistem Penjaminan Mutu
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[#A8D97A]/60 text-[10px] tracking-wider uppercase font-medium">
                      Konsisten Setiap Hari
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactCTA() {
  useScrollReveal();

  return (
    <section className="relative overflow-hidden bg-[#EDE6D8]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — content */}
          <div className="reveal">
            <p className="text-[#2C5F1A] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
              Hubungi Kami
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1A16] font-serif leading-tight mb-4">
              Pesan Telur{" "}
              <span className="text-[#2C5F1A]">Sekarang</span>
            </h2>
            <p className="text-[#6B5E4A] text-sm leading-relaxed max-w-md mb-8">
              Kami melayani pembelian langsung, pengiriman ke area Batu–Malang, dan kunjungan
              edukasi agrowisata untuk sekolah dan keluarga.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_FARM}?text=Halo%2C%20saya%20ingin%20memesan%20telur%20dari%20Girimulyo%20Farm`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DAE55] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 text-sm hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" /> WhatsApp Pesan Telur
              </a>

            </div>
          </div>

          {/* Right — decorative visual */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-[#2A1A0A] reveal reveal-delay-2 img-zoom">
            <Image
              src="https://images.unsplash.com/photo-1694984716468-e61f15c4f851?w=800&h=600&fit=crop&auto=format"
              alt="Ayam Lohmann Brown di Girimulyo Farm"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/80 via-[#1C1008]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-flex items-center gap-2 bg-[#2C5F1A] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                Telur Segar · Siap Kirim
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GirimulyoFarm() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      <Navbar />
      <Hero />
      <TabbedContent />
      <ContactCTA />
      <Footer />
    </div>
  );
}
