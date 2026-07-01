"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import {
  Leaf, MapPin, Phone, Mail, Triangle,
  ChevronDown, ArrowRight, Menu, X, ExternalLink
} from "lucide-react";
import Footer from "@/components/ui/Footer";

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
          Sinergi Warga,
          <br /><em className="italic font-light text-[#A8D97A]">Membangun Desa</em>
        </h1>
        <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          BUMDes Girimulyo hadir sebagai motor penggerak ekonomi Desa Giripurno. Kami mengelola potensi lokal melalui peternakan unggas berkualitas dan pariwisata alam terpadu untuk kesejahteraan masyarakat.
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
            Dari peternakan mandiri hingga kenyamanan resort di dataran tinggi, 
            <br></br> 
            kami kelola dengan sepenuh hati untuk memajukan perekonomian desa
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
                <Leaf className="w-3 h-3" /> Peternakan Desa
              </div>
              {/* <div className="absolute bottom-5 left-6">
                <p className="text-white/60 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Hasil panen langsung dari kebun</p>
              </div> */}
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#1C1A16] mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Girimulyo Farm</h3>
              <p className="text-[#6B5E4A] text-sm leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Pusat peternakan ayam petelur Lohmann kebanggaan desa. Dikelola secara profesional dengan standar pakan bermutu tinggi untuk menghasilkan telur berkualitas setiap hari.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Ayam Lohmann", "Telur Berkualitas", "Peternakan Mandiri"].map(tag => (
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
              {/* <div className="absolute bottom-5 left-6">
                <p className="text-white/60 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pengalaman menginap di alam terbuka</p>
              </div> */}
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#1C1A16] mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Manahayu Resort</h3>
              <p className="text-[#6B5E4A] text-sm leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Nikmati ketenangan menginap di sejuknya dataran tinggi Giripurno. Kami menawarkan kenyamanan cottage kayu, pemandangan alam yang asri, dan keramahan khas pedesaan Kota Batu.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Villa Panorama", "Paket Wisata", "Holiday"].map(tag => (
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

// function WhySection() {
//   const items = [
//     { icon: "🌱", title: "Berbasis Komunitas", desc: "Semua keuntungan kembali ke warga Desa Giripurno melalui program pemberdayaan." },
//     { icon: "♻️", title: "Berkelanjutan", desc: "Praktik pertanian dan pariwisata yang menjaga kelestarian alam pegunungan Batu." },
//     { icon: "🤝", title: "Terbuka untuk Mitra", desc: "Kami mengundang investor dan mitra bisnis untuk tumbuh bersama desa." },
//     { icon: "📍", title: "Lokasi Strategis", desc: "Terletak di Kecamatan Bumiaji, pusat agrowisata dan alam Kota Batu, Jawa Timur." },
//   ];
//   return (
//     <section className="py-24 bg-[#EDE6D8]">
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="text-center mb-14">
//           <div className="text-xs font-semibold tracking-widest uppercase text-[#8B5E3C] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Mengapa Kami</div>
//           <h2 className="text-4xl md:text-5xl font-bold text-[#1C1A16]" style={{ fontFamily: "'Fraunces', serif" }}>
//             Nilai yang Kami Jaga
//           </h2>
//         </div>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {items.map(item => (
//             <div key={item.title} className="bg-white rounded-2xl p-6 border border-[#2C5F1A]/8 hover:border-[#2C5F1A]/25 hover:shadow-md transition-all duration-300">
//               <div className="text-3xl mb-4">{item.icon}</div>
//               <h4 className="font-bold text-[#1C1A16] mb-2 text-base" style={{ fontFamily: "'Fraunces', serif" }}>{item.title}</h4>
//               <p className="text-[#6B5E4A] text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

type IdentityTab = "motto" | "visi" | "kesimpulan";

const MISI_ITEMS = [
  "Pengembangan usaha ekonomi melalui usaha ekonomi produktif dengan melibatkan masyarakat.",
  "Menjalin kerjasama dengan semua pihak dalam pengembangan Usaha BUM Desa.",
  "Meningkatkan Penerimaan Pendapatan Asli Desa (PAD) melalui kegiatan Usaha BUM Desa.",
  "Meningkatkan perekonomian Desa dengan memberdayakan masyarakat.",
  "Mengembangkan jaringan kerjasama ekonomi dengan berbagai pihak baik Negeri maupun swasta.",
];

const AKAL = [
  { letter: "A", word: "ADAPTIF", desc: "Siap berubah dan menyesuaikan diri dengan dinamika kebutuhan masyarakat dan pasar." },
  { letter: "K", word: "KOLABORATIF", desc: "Tumbuh bersama melalui kerjasama lintas pemangku kepentingan desa dan mitra." },
  { letter: "A", word: "AKURAT", desc: "Bekerja dengan data, perencanaan yang tepat, dan keputusan berbasis fakta lapangan." },
  { letter: "L", word: "LOYAL", desc: "Setia pada misi pemberdayaan desa dan kepercayaan yang diberikan warga Giripurno." },
];

function WhySection() {
  const [tab, setTab] = useState<IdentityTab>("motto");

  const tabs: { id: IdentityTab; label: string }[] = [
    { id: "motto", label: "Motto" },
    { id: "visi", label: "Visi & Misi" },
    { id: "kesimpulan", label: "Kesimpulan" },
  ];

  return (
    <section className="py-24 bg-[#EDE6D8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-[#8B5E3C] mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Identitas BUMDes
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1A16] leading-tight"
              style={{ fontFamily: "'Fraunces', serif" }}>
              Jati Diri &{" "}
              <em className="italic font-light text-[#2C5F1A]">Arah Kami</em>
            </h2>
          </div>

          {/* Tab pills */}
          <div className="flex bg-[#D8CFC0] rounded-2xl p-1.5 gap-1 self-start md:self-auto shrink-0">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 whitespace-nowrap ${
                  tab === id
                    ? "bg-white text-[#1C1A16] shadow-sm shadow-[#8B5E3C]/15"
                    : "text-[#6B5E4A] hover:text-[#1C1A16]"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB: MOTTO ── */}
        {tab === "motto" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left — AKAL acronym hero */}
            <div className="bg-[#2C5F1A] rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[340px]">
              <div>
                <p className="text-[#A8D97A] font-bold tracking-widest uppercase mb-5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Motto BUMDes Girimulyo
                </p>
                <div className="flex gap-3 mb-5">
                  {"AKAL".split("").map((l, i) => (
                    <div key={i}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/12 border border-white/20 flex items-center justify-center">
                      <span className="text-3xl md:text-4xl font-bold text-white"
                        style={{ fontFamily: "'Fraunces', serif" }}>
                        {l}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/50 leading-relaxed"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Setiap huruf mewakili nilai inti yang menjadi landasan kerja seluruh pengurus dan unit usaha BUMDes Girimulyo.
                </p>
              </div>
            </div>

            {/* Right — letter breakdown */}
            <div className="flex flex-col gap-4">
              {AKAL.map(({ letter, word, desc }) => (
                <div key={word}
                  className="bg-white rounded-2xl px-5 py-4 border border-[#2C5F1A]/8 hover:border-[#2C5F1A]/25 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2C5F1A] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-md"
                      style={{ fontFamily: "'Fraunces', serif" }}>
                      {letter}
                    </span>
                  </div>
                  <div>
                    <h4
                      className="text-md font-bold text-[#1C1A16] mb-1"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }} 
                    >
                      {word}
                    </h4>
                    <p className="text-[#6B5E4A] leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: VISI & MISI ── */}
        {tab === "visi" && (
          <div className="grid md:grid-cols-5 gap-6">
            {/* Visi */}
            <div className="md:col-span-2 bg-[#1C1A16] rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2C5F1A] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <Leaf className="w-3 h-3" /> Visi
                </div>
                <p className="text-white font-bold text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: "'Fraunces', serif" }}>
                  "Terwujudnya BUMDes Girimulyo yang Mandiri sebagai Basis Pengembangan Perekonomian Desa dan Lembaga Ekonomi Antar Desa yang Berbasis pada Kerjasama dan Gotong Royong."
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-white/35 text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  BUMDes Girimulyo · Desa Giripurno
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="md:col-span-3 bg-white rounded-3xl p-8 md:p-10 border border-[#2C5F1A]/8">
              <div className="inline-flex items-center gap-2 bg-[#EDE6D8] text-[#8B5E3C] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Misi
              </div>
              <ul className="space-y-4">
                {MISI_ITEMS.map((m, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-[#2C5F1A]/10 text-[#2C5F1A] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {i + 1}
                    </span>
                    <p className="text-[#4A3F30] text-sm leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {m}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── TAB: KESIMPULAN ── */}
        {tab === "kesimpulan" && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Quote block */}
            <div className="flex-1 bg-[#2C5F1A] rounded-3xl p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
              {/* Decorative quotemark */}
              <div className="absolute top-6 left-8 text-white/8 select-none pointer-events-none"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "180px", lineHeight: 1 }}>
                "
              </div>
              <p className="relative z-10 text-white text-xl md:text-2xl font-bold leading-[1.4] tracking-tight"
                style={{ fontFamily: "'Fraunces', serif" }}>
                "BUMDes harus menjadi wadah yang{" "}
                <em className="italic font-light text-[#A8D97A]">menyatukan sekaligus melindungi</em>{" "}
                pelaku ekonomi kecil, menjadi bisnis yang lebih besar tanpa harus mendominasi usaha / bisnis yang dalam proses berkembang."
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-px bg-white/30" />
                <p className="text-white/45 text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Prinsip BUMDes Girimulyo
                </p>
              </div>
            </div>

            {/* Side annotation cards */}
            <div className="flex flex-col gap-4 md:w-72 shrink-0">
              {[
                { icon: "🤝", title: "Menyatukan", desc: "BUMDes adalah rumah bersama bagi seluruh pelaku ekonomi kecil di desa — petani, pengrajin, hingga pedagang lokal." },
                { icon: "🛡️", title: "Melindungi", desc: "Hadir sebagai payung yang memastikan usaha kecil tidak terpinggirkan oleh kepentingan modal besar." },
                { icon: "🌱", title: "Bukan Mendominasi", desc: "BUMDes tumbuh bersama, bukan di atas usaha warga — pertumbuhan yang inklusif dan berkeadilan." },
              ].map(({ icon, title, desc }) => (
                <div key={title}
                  className="bg-white rounded-2xl px-5 py-4 border border-[#2C5F1A]/8 hover:border-[#2C5F1A]/25 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <h4 className="font-bold text-[#1C1A16] text-sm mb-1"
                      style={{ fontFamily: "'Fraunces', serif" }}>{title}</h4>
                    <p className="text-[#6B5E4A] text-xs leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// function Footer() {
//   return (
//     <footer className="bg-[#1C1A16] text-white/60 pt-16 pb-8">
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="grid md:grid-cols-3 gap-12 mb-12">
//           <div>
//             <div className="flex items-center gap-2.5 mb-4">
//               <div className="w-8 h-8 rounded-full bg-[#2C5F1A] flex items-center justify-center">
//                 <Leaf className="w-4 h-4 text-white" />
//               </div>
//               <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//                 BUMDes <span className="text-[#8B5E3C]">GIRIMULYO</span>
//               </span>
//             </div>
//             <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//               Badan Usaha Milik Desa Giripurno — menggerakkan ekonomi lokal melalui pertanian organik dan pariwisata resort.
//             </p>
//             <div className="flex gap-3">
//               {[
//                 { icon: FaInstagram, href: "https://www.instagram.com/bumdesgirimulyo/", label: "Instagram" },
//                 { icon: FaYoutube, href: "https://www.youtube.com/@BUMDESGIRIMULYO", label: "YouTube" },
//                 { icon: Triangle, href: "#", label: "Sosial media lain (placeholder)" },
//               ].map((social, i) => {
//                 const Icon = social.icon;
//                 return (
//                   <a
//                     key={i}
//                     href={social.href}
//                     aria-label={social.label}
//                     target={social.href.startsWith("http") ? "_blank" : undefined}
//                     rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
//                     onClick={(e) => {
//                       if (social.href === "#") {
//                         e.preventDefault();
//                       }
//                     }}
//                     className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all"
//                   >
//                     <Icon className="w-4 h-4" />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//           <div>
//             <h4 className="text-white font-semibold text-sm mb-5 tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tautan</h4>
//             <ul className="space-y-2.5">
//               {[{ l: "Beranda", to: "/" }, { l: "Girimulyo Farm", to: "/girimulyofarm" }, { l: "Manahayu Resort", to: "/manahayuresort" }, { l: "Portal Desa Giripurno", to: "#" }].map(({ l, to }) => (
//                 <li key={l}><Link href={to} className="text-sm hover:text-white transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l}</Link></li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-white font-semibold text-sm mb-5 tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Kontak</h4>
//             <div className="space-y-3">
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-4 h-4 text-[#2C5F1A] shrink-0 mt-0.5" />
//                 <p className="text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Desa Giripurno, Kec. Bumiaji,<br />Kota Batu, Jawa Timur 65336</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone className="w-4 h-4 text-[#2C5F1A] shrink-0" />
//                 <a href="tel:+6234112345" className="text-sm hover:text-white transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>(0341) 123-4567</a>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail className="w-4 h-4 text-[#2C5F1A] shrink-0" />
//                 <a href="mailto:bumdes@giripurno.desa.id" className="text-sm hover:text-white transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>bumdes@giripurno.desa.id</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//           <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>© 2026 BUMDes Girimulyo. Hak cipta dilindungi.</p>
//           <div className="flex items-center gap-4">
//             {/* <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Portal Desa Giripurno</a> */}
//             <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pemerintah Kota Batu</p>
//             <span className="w-1 h-1 rounded-full bg-white/20" />
//             {/* <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pemerintah Kota Batu</a> */}
//             <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Desa Giripurno Kecamatan Bumiaji</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] pt-16">
      <Navbar />
      <Hero />
      <BusinessUnits />
      <WhySection />
      <Footer />
    </div>
  );
}
