"use client";

import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import {
  Wifi, Wind, Coffee, Bath, Tv, TreePine,
  Phone, Star, Users, Maximize, HeartHandshake,
  Music, Camera, Briefcase, BookOpen, Landmark,
  ArrowRight
} from "lucide-react";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────
const WA_RESORT = process.env.NEXT_PUBLIC_WA_RESORT ?? "";

const ROOMS = [
  {
    img: "photo-1768178540284-ab256d312e61",
    name: "Cottage Kayu",
    desc: "Cottage kayu tradisional dengan kolam pribadi dan pemandangan hutan pinus. Nuansa alam yang intim dan tenang.",
    price: "Rp 850.000",
    rating: 4.9,
    reviews: 87,
    capacity: 2,
    size: "32m²",
    amenities: [Wifi, Wind, Coffee, Bath],
    amenityLabels: ["WiFi", "AC", "Sarapan", "Kamar Mandi"],
    color: "#2C5F1A",
  },
  {
    img: "photo-1760942992111-a65227a3b266",
    name: "Villa Tropis",
    desc: "Villa luas berlantai dua dengan kolam renang bersama, teras panorama, dan ruang keluarga berdesain tropis modern.",
    price: "Rp 1.400.000",
    rating: 4.8,
    reviews: 62,
    capacity: 4,
    size: "58m²",
    amenities: [Wifi, Wind, Coffee, Bath, Tv],
    amenityLabels: ["WiFi", "AC", "Sarapan", "Kamar Mandi", "TV"],
    color: "#8B5E3C",
  },
  {
    img: "photo-1749453841669-5661423f5bc6",
    name: "Lakeside Cabin",
    desc: "Kabin kayu di tepi danau buatan. Pemandangan air sepanjang hari, dilengkapi kayak dan pancing gratis untuk tamu.",
    price: "Rp 1.100.000",
    rating: 4.9,
    reviews: 45,
    capacity: 2,
    size: "40m²",
    amenities: [Wifi, Coffee, Bath, TreePine],
    amenityLabels: ["WiFi", "Sarapan", "Kamar Mandi", "Area Alam"],
    color: "#2C5F1A",
  },
];

const PENDOPO_USES = [
  {
    icon: HeartHandshake, title: "Pernikahan & Resepsi",
    desc: "Suasana Joglo yang otentik menjadi latar pernikahan yang tak terlupakan. Pendopo dapat diatur untuk resepsi dengan kapasitas hingga 150 tamu, lengkap dengan area pelaminan dan taman sekitarnya.",
  },
  {
    icon: Music, title: "Pertunjukan Seni",
    desc: "Panggung alami untuk pagelaran tari tradisional, gamelan, dan kesenian Jawa. Struktur kayu terbuka menciptakan akustik alami dan pencahayaan yang memukau saat senja.",
  },
  {
    icon: Camera, title: "Lokasi Syuting & Fotografi",
    desc: "Arsitektur Joglo kayu jati dengan atap tumpang tiga dan pemandangan perbukitan hijau menjadikan pendopo lokasi favorit untuk film, iklan, dan sesi foto prewedding.",
  },
  {
    icon: Briefcase, title: "Acara Korporat & Seminar",
    desc: "Rapat kerja, team building, atau seminar dalam setting yang berbeda dari ruang kantor biasa. Tersedia proyektor, sound system, dan area breakout outdoor.",
  },
  {
    icon: BookOpen, title: "Workshop & Kelas Seni",
    desc: "Tempat belajar membatik, merajut, atau memasak masakan tradisional Jawa. Instruktur lokal dari Desa Giripurno memandu peserta dalam suasana yang autentik.",
  },
  {
    icon: Landmark, title: "Upacara Adat & Budaya",
    desc: "Menyelenggarakan ritual dan upacara adat Jawa dengan pemandu budaya yang berpengalaman. Pendopo menyatu dengan tradisi turun-temurun masyarakat Giripurno.",
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollReveal() {
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
  }, []);
}

// ─── Components ──────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grain">
        <Image
          src="/hero-manahayu.webp"
          alt="Kolam renang resort berlatar perbukitan hijau Giripurno"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0A] via-[#0D1E10]/50 to-[#0D1E10]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F0A]/80 via-transparent to-transparent" />
      </div>

      {/* Top accent bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#D4A574] via-[#8B5E3C] to-[#2C5F1A]" />

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 pb-16 md:pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 reveal">
              Resort & Penginapan
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.02] mb-4 font-serif reveal reveal-delay-1">
              Manahayu <br className="sm:hidden" />
              <em className="italic font-light text-[#D4A574]">Resort</em>
            </h1>

            {/* Tagline */}
            <p className="text-[#D4A574] font-semibold text-base md:text-lg tracking-wide mb-3 reveal reveal-delay-2">
              Berlibur ke alam pegunungan Batu
            </p>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl reveal reveal-delay-3">
              Cottage kayu, villa tropis, dan udara segar Desa Giripurno menanti Anda.
            </p>

            {/* CTA */}
            <div className="flex gap-3 mt-8 reveal reveal-delay-4">
              <a
                href={`https://wa.me/${WA_RESORT}?text=Halo%2C%20saya%20ingin%20memesan%20kamar%20di%20Manahayu%20Resort`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4A574] hover:bg-[#C49560] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm hover:shadow-lg hover:shadow-[#D4A574]/25 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" /> Pesan via WhatsApp
              </a>
              <button
                onClick={() => document.getElementById("kamar")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 text-sm cursor-pointer"
              >
                Lihat Kamar <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 border-t border-white/10 bg-[#0A0F0A]/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <div className="grid grid-cols-3 gap-4">
              {[
                { v: "3", l: "Tipe Kamar" },
                { v: "★ 4.9", l: "Rating Tamu" },
                { v: "1.200", l: "Ketinggian dpl", suffix: " m" },
              ].map(({ v, l, suffix }, i) => (
                <div key={l} className="reveal" style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
                  <div className="text-xl md:text-2xl font-bold text-[#D4A574] font-serif tabular-nums">
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

function PendopoSection() {
  useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-[#EDE6D8] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Asymmetric hero layout */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center mb-16">
          {/* Image — wide span */}
          <div className="md:col-span-7 relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#1C1008] group img-zoom reveal">
            <Image
              src="https://images.unsplash.com/photo-1555217851-6141535bd771?w=1000&h=750&fit=crop&auto=format"
              alt="Pendopo Joglo tradisional di Manahayu Resort Giripurno"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/60 via-transparent to-transparent" />
            {/* Floating info badges */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                <p className="text-[#1C1A16] text-[10px] font-bold tracking-wider uppercase">Luas Area</p>
                <p className="text-[#8B5E3C] text-xl font-bold font-serif">± 200 m²</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                <p className="text-[#1C1A16] text-[10px] font-bold tracking-wider uppercase">Kapasitas</p>
                <p className="text-[#8B5E3C] text-xl font-bold font-serif">hingga 150</p>
              </div>
            </div>
          </div>

          {/* Content — narrower span */}
          <div className="md:col-span-5 reveal reveal-delay-1">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#8B5E3C] mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-[#8B5E3C]/40" />
              Venue Serbaguna
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1A16] leading-tight mb-5 font-serif">
              Pendopo{" "}
              <em className="italic font-light text-[#2C5F1A]">Manahayu</em>
            </h2>
            <p className="text-[#6B5E4A] text-sm leading-relaxed mb-4">
              Di jantung Manahayu Resort berdiri sebuah pendopo Joglo tradisional beratap tumpang tiga,
              dibangun dari kayu jati pilihan. Bangunan ini bukan sekadar ornamen — ia adalah ruang hidup
              yang menghubungkan tamu dengan warisan budaya Jawa.
            </p>
            <p className="text-[#6B5E4A] text-sm leading-relaxed mb-6">
              Dengan kolom-kolom kayu yang menjulang dan teras terbuka menghadap perbukitan,
              pendopo ini menawarkan pengalaman yang tidak bisa digantikan oleh ruang serbaguna modern mana pun.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Kayu Jati Asli", "Atap Tumpang Tiga", "Teras Panorama"].map((tag) => (
                <span key={tag} className="bg-[#D8CFC0] text-[#4A3F30] text-xs font-medium px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Use cases grid */}
        <div className="reveal reveal-delay-2">
          <div className="mb-10 flex items-center gap-4">
            <h3 className="text-2xl font-bold text-[#1C1A16] font-serif">Cocok untuk berbagai acara</h3>
            <div className="h-px flex-1 bg-[#D8CFC0]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PENDOPO_USES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white rounded-xl p-5 border border-[#D8CFC0]/60 hover:border-[#2C5F1A]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F0FDF4] flex items-center justify-center mb-3 group-hover:bg-[#2C5F1A]/10 transition-colors">
                  <Icon className="w-[18px] h-[18px] text-[#2C5F1A]" />
                </div>
                <h4 className="font-bold text-[#1C1A16] text-sm mb-1.5">{title}</h4>
                <p className="text-[#6B5E4A] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomCatalog() {
  useScrollReveal();

  return (
    <section id="kamar" className="py-20 md:py-28 bg-[#F7F3EC]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 reveal">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C] mb-3">
            Kamar & Suite
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1A16] font-serif leading-tight">
            Pilih Pengalaman{" "}
            <span className="text-[#8B5E3C]">Menginap</span>
          </h2>
          <p className="mt-3 text-[#6B5E4A] text-sm">
            Harga termasuk sarapan untuk 2 orang · Check-in 14.00 · Check-out 12.00
          </p>
        </div>

        {/* Staggered grid: first card full-width, rest in 2-col */}
        <div className="grid md:grid-cols-2 gap-6">
          {ROOMS.map((room, i) => (
            <div
              key={room.name}
              className={`group bg-white rounded-2xl overflow-hidden border border-[#EDE6D8] hover:shadow-xl transition-all duration-500 hover:-translate-y-1 reveal ${i === 0 ? "md:col-span-2 md:grid md:grid-cols-5" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Image */}
              <div className={`relative overflow-hidden bg-[#1C3A10] ${i === 0 ? "md:col-span-2 min-h-[300px]" : "h-56"}`}>
                <Image
                  src={`https://images.unsplash.com/${room.img}?w=800&h=500&fit=crop&auto=format`}
                  alt={`${room.name} Manahayu Resort`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-[#1C1A16] text-xs font-bold">{room.rating}</span>
                  <span className="text-[#6B5E4A] text-[10px]">({room.reviews})</span>
                </div>
                {/* Price on image for compact cards */}
                {i !== 0 && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <div className="text-[10px] text-[#6B5E4A] font-medium">Mulai</div>
                    <div className="font-bold font-serif text-sm" style={{ color: room.color }}>{room.price}</div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`p-6 ${i === 0 ? "md:col-span-3 flex flex-col justify-center" : ""}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#1C1A16] font-serif">{room.name}</h3>
                    {i === 0 && (
                      <p className="text-[#6B5E4A] text-sm leading-relaxed mt-2 max-w-lg">{room.desc}</p>
                    )}
                  </div>
                  {i === 0 && (
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-[10px] text-[#6B5E4A] font-medium">Mulai</div>
                      <div className="font-bold text-2xl font-serif" style={{ color: room.color }}>{room.price}</div>
                      <div className="text-[#6B5E4A] text-xs">/malam</div>
                    </div>
                  )}
                </div>

                {i !== 0 && (
                  <p className="text-[#6B5E4A] text-sm leading-relaxed mb-5">{room.desc}</p>
                )}

                {/* Meta row */}
                <div className="flex items-center gap-5 mb-4 text-[#4A3F30]">
                  <span className="flex items-center gap-1.5 text-xs">
                    <Users className="w-3.5 h-3.5" /> {room.capacity} Tamu
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <Maximize className="w-3.5 h-3.5" /> {room.size}
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {room.amenities.map((Icon, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-[#F7F3EC] text-[#4A3F30] text-[10px] font-medium px-2.5 py-1.5 rounded-full border border-[#EDE6D8]"
                    >
                      <Icon className="w-3 h-3" /> {room.amenityLabels[i]}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/${WA_RESORT}?text=Halo,%20saya%20ingin%20memesan%20${encodeURIComponent(room.name)}%20di%20Manahayu%20Resort`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full font-semibold py-3 rounded-xl transition-all duration-300 text-sm hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: room.color, color: "white" }}
                >
                  <Phone className="w-4 h-4" /> Pesan Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ManahayuResort() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      <Navbar />
      <Hero />
      <PendopoSection />
      <RoomCatalog />
      <Footer />
    </div>
  );
}
