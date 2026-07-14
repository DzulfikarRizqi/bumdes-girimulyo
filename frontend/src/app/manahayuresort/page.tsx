"use client";

import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { 
  Wifi, Wind, Coffee, Bath, Tv, TreePine, 
  Phone, Star, Users, Maximize, HeartHandshake, 
  Music, Camera, Briefcase, Landmark, BookOpen 
} from "lucide-react";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

const WA_RESORT = "6281298765432";

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
    color: "border-[#2C5F1A]/15 hover:border-[#2C5F1A]/40",
    accent: "#2C5F1A",
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
    color: "border-[#8B5E3C]/15 hover:border-[#8B5E3C]/40",
    accent: "#8B5E3C",
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
    color: "border-[#2C5F1A]/15 hover:border-[#2C5F1A]/40",
    accent: "#2C5F1A",
  },
  // {
  //   img: "photo-1721222206418-3de97d2ca96b",
  //   name: "Forest Suite",
  //   desc: "Suite eksklusif dikelilingi pohon pinus tua dengan private plunge pool, hammock, dan akses hiking trail pribadi.",
  //   price: "Rp 1.750.000",
  //   rating: 5.0,
  //   reviews: 28,
  //   capacity: 3,
  //   size: "65m²",
  //   amenities: [Wifi, Wind, Coffee, Bath, Tv],
  //   amenityLabels: ["WiFi", "AC", "Sarapan", "Kamar Mandi", "TV"],
  //   color: "border-[#8B5E3C]/15 hover:border-[#8B5E3C]/40",
  //   accent: "#8B5E3C",
  // },
];

const PENDOPO_USES = [
  {
    icon: HeartHandshake,
    title: "Pernikahan & Resepsi",
    desc: "Suasana Joglo yang otentik menjadi latar pernikahan yang tak terlupakan. Pendopo dapat diatur untuk resepsi dengan kapasitas hingga 150 tamu, lengkap dengan area pelaminan dan taman sekitarnya.",
  },
  {
    icon: Music,
    title: "Pertunjukan Seni",
    desc: "Panggung alami untuk pagelaran tari tradisional, gamelan, dan kesenian Jawa. Struktur kayu terbuka menciptakan akustik alami dan pencahayaan yang memukau saat senja.",
  },
  {
    icon: Camera,
    title: "Lokasi Syuting & Fotografi",
    desc: "Arsitektur Joglo kayu jati dengan atap tumpang tiga dan pemandangan perbukitan hijau menjadikan pendopo lokasi favorit untuk film, iklan, dan sesi foto prewedding.",
  },
  {
    icon: Briefcase,
    title: "Acara Korporat & Seminar",
    desc: "Rapat kerja, team building, atau seminar dalam setting yang berbeda dari ruang kantor biasa. Tersedia proyektor, sound system, dan area breakout outdoor.",
  },
  {
    icon: BookOpen,
    title: "Workshop & Kelas Seni",
    desc: "Tempat belajar membatik, merajut, atau memasak masakan tradisional Jawa. Instruktur lokal dari Desa Giripurno memandu peserta dalam suasana yang autentik.",
  },
  {
    icon: Landmark,
    title: "Upacara Adat & Budaya",
    desc: "Menyelenggarakan ritual dan upacara adat Jawa dengan pemandu budaya yang berpengalaman. Pendopo menyatu dengan tradisi turun-temurun masyarakat Giripurno.",
  },
];

export default function ManahayuResort() {
  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#0D1E10]">
          <Image
            src="https://images.unsplash.com/photo-1648995505975-8fe3ebc7b253?w=1600&h=900&fit=crop&auto=format"
            alt="Kolam renang resort berlatar perbukitan hijau Giripurno"
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1E10] via-[#0D1E10]/35 to-[#0D1E10]/30" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <div className="inline-flex items-center gap-2 bg-[#8B5E3C] text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            🌿 Resort & Penginapan
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif">
            Manahayu <em className="italic font-light text-[#D4A574]">Resort</em>
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed mb-8">
            Melarikan diri ke alam pegunungan Batu. Cottage kayu, villa tropis, dan udara segar Giripurno menanti Anda.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { val: "3", label: "Tipe Kamar" },
              { val: "★ 4.9", label: "Rating Tamu" },
              // { val: "1.100m", label: "Ketinggian dpl" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-white font-serif">{val}</div>
                <div className="text-white/50 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pendopo Section */}
      <section className="py-20 bg-[#EDE6D8]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top: two-column layout */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16">
            {/* Image side */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#1C1008]">
              <Image
                src="https://images.unsplash.com/photo-1555217851-6141535bd771?w=900&h=680&fit=crop&auto=format"
                alt="Pendopo Joglo tradisional di Manahayu Resort Giripurno"
                fill
                sizes="(max-width:768px)100vw,50vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3">
                  <p className="text-[#1C1A16] text-xs font-bold">
                    Luas Area
                  </p>
                  <p className="text-[#8B5E3C] text-lg font-bold font-serif">
                    ± 200 m²
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3">
                  <p className="text-[#1C1A16] text-xs font-bold">
                    Kapasitas
                  </p>
                  <p className="text-[#8B5E3C] text-lg font-bold font-serif">
                    hingga 150 orang
                  </p>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-[#8B5E3C] mb-3">
                Venue Serbaguna
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1C1A16] leading-tight mb-5 font-serif">
                Pendopo <em className="italic font-light text-[#2C5F1A]">Manahayu</em>
              </h2>
              <p className="text-[#6B5E4A] text-sm leading-relaxed mb-4">
                Di jantung Manahayu Resort berdiri sebuah pendopo Joglo tradisional beratap tumpang tiga, 
                dibangun dari kayu jati pilihan. Bangunan ini bukan sekadar ornamen — ia adalah ruang hidup 
                yang menghubungkan tamu dengan warisan budaya Jawa, sekaligus berfungsi sebagai venue 
                serbaguna untuk berbagai acara.
              </p>
              <p className="text-[#6B5E4A] text-sm leading-relaxed mb-6">
                Dengan kolom-kolom kayu yang menjulang dan teras terbuka menghadap perbukitan, 
                pendopo ini menawarkan pengalaman yang tidak bisa digantikan oleh ruang serbaguna modern mana pun.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Kayu Jati Asli", "Atap Tumpang Tiga", "Teras Panorama"].map(tag => (
                  <span key={tag} className="bg-[#D8CFC0] text-[#4A3F30] text-xs font-medium px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: use cases grid */}
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-[#1C1A16] font-serif">
                Pendopo ini cocok untuk
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PENDOPO_USES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-[#8B5E3C]/8 hover:border-[#2C5F1A]/25 hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-4 group-hover:bg-[#2C5F1A]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[#2C5F1A]" />
                  </div>
                  <h4 className="font-bold text-[#1C1A16] text-sm mb-2">
                    {title}
                  </h4>
                  <p className="text-[#6B5E4A] text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Room Catalog */}
      <section className="py-12 bg-[#F7F3EC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#8B5E3C] mb-3">Kamar & Suite</div>
            <h2 className="text-4xl font-bold text-[#1C1A16] font-serif">Pilih Kamar Anda</h2>
            <p className="mt-3 text-[#6B5E4A] text-sm">Harga termasuk sarapan untuk 2 orang · Check-in 14.00 · Check-out 12.00</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
            {ROOMS.map(room => (
              <div key={room.name} className={`group bg-white rounded-3xl overflow-hidden border ${room.color} hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
                <div className="relative h-56 overflow-hidden" style={{ background: "#1C3A10" }}>
                  <Image
                    src={`https://images.unsplash.com/${room.img}?w=800&h=500&fit=crop&auto=format`}
                    alt={`${room.name} Manahayu Resort`}
                    fill
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                    className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-[#1C1A16] text-xs font-bold">{room.rating}</span>
                    <span className="text-[#6B5E4A] text-[10px]">({room.reviews})</span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#1C1A16] font-serif">{room.name}</h3>
                    <div className="text-right">
                      <div className="font-bold text-lg font-serif" style={{ color: room.accent }}>{room.price}</div>
                      <div className="text-[#6B5E4A] text-xs">/malam</div>
                    </div>
                  </div>
                  <p className="text-[#6B5E4A] text-sm leading-relaxed mb-5">{room.desc}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-5 mb-5 text-[#4A3F30]">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Users className="w-3.5 h-3.5" /> {room.capacity} Tamu
                    </span>
                    <span className="flex items-center gap-1.5 text-xs">
                      <Maximize className="w-3.5 h-3.5" /> {room.size}
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((Icon, i) => (
                      <div key={i} className="flex items-center gap-1 bg-[#EDE6D8] text-[#4A3F30] text-[10px] font-medium px-2.5 py-1 rounded-full">
                        <Icon className="w-3 h-3" /> {room.amenityLabels[i]}
                      </div>
                    ))}
                  </div>

                  <a href={`https://wa.me/${WA_RESORT}?text=Halo,%20saya%20ingin%20memesan%20${encodeURIComponent(room.name)}%20di%20Manahayu%20Resort`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                    style={{ background: room.accent, color: "white" }}
                    onMouseOver={e => (e.currentTarget.style.opacity = "0.88")}
                    onMouseOut={e => (e.currentTarget.style.opacity = "1")}>
                    <Phone className="w-4 h-4" /> Pesan Sekarang via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer
      <footer className="bg-[#1C1A16] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#2C5F1A] flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white text-sm font-bold">BUMDes <span className="text-[#8B5E3C]">GIRIMULYO</span></span>
          </div>
          <p className="text-white/30 text-xs text-center">
            Desa Giripurno, Kec. Bumiaji, Kota Batu, Jawa Timur · © 2024 · <a href={`https://wa.me/${WA_RESORT}`} className="hover:text-white/60">{WA_RESORT}</a>
          </p>
          <ArrowLeft className="hidden" />
          <Link href="/girimulyofarm" className="text-[#2C5F1A] hover:text-[#4A8A30] text-sm font-medium transition-colors">
            ← Girimulyo Farm
          </Link>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}
