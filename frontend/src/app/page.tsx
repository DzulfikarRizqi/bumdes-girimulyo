"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import {
  ChevronDown, ArrowRight, Handshake, Shield, Sprout
} from "lucide-react";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0D2408]">
        {/* <img 
          // src="https://images.unsplash.com/photo-1556019947-8695cb3d4e81?w=1600&h=900&fit=crop&auto=format"
          src="/heroSection.JPG"
          alt="Pemandangan udara desa berlatar pegunungan hijau" 
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity" 
        /> */}
        <Image
          src="/hero-section-2.webp"
          alt="Pemandangan Hutan Gunung Arjuno Bumiaji"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D2408]/65 via-[#1C3A10]/25 to-[#0D2408]/85" />
      </div>
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2C5F1A] via-[#8B5E3C] to-[#2C5F1A]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/75 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {/* <Leaf className="w-3 h-3 text-[#6DBF40]" /> */}
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
            <div className="relative h-72 bg-[#428c24] overflow-hidden">
              {/* <img 
                src="https://images.unsplash.com/photo-1762414103968-0e1c31b1aaca?w=800&h=520&fit=crop&auto=format"
                alt="Keranjang hasil panen sayuran dan buah organik Girimulyo Farm"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" 
              /> */}
              <Image
                // src="/cardGirifarm.JPG"
                src="/card-girifarm.webp"
                alt="Kolam renang resort dengan tanaman tropis dan gazebo bambu"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A10]/70 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#2C5F1A] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {/* <Leaf className="w-3 h-3" />  */}
                Peternakan Desa
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
              {/* <img 
                src="https://images.unsplash.com/photo-1760942992111-a65227a3b266?w=800&h=520&fit=crop&auto=format"
                alt="Kolam renang resort dengan tanaman tropis dan gazebo bambu"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" 
              /> */}
              <Image
                src="/cardManahayu.JPG"
                alt="Kolam renang resort dengan tanaman tropis dan gazebo bambu"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A1F0A]/70 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#8B5E3C] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Resort & Wisata
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
  return (
    <section className="bg-[#EDE6D8]">
      {/* ── MOTTO: AKAL ── */}
      <div className="relative py-28 bg-[#1C3A10] overflow-hidden">
        {/* Decorative background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-white/[0.04] font-bold leading-none" style={{ fontFamily: "'Fraunces', serif", fontSize: "min(28vw, 320px)" }}>
            AKAL
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C3A10] via-transparent to-[#1C3A10]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            {/* Left: text */}
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-[#A8D97A] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Motto BUMDes
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                Empat Nilai <em className="italic font-light text-[#A8D97A]">Fondasi</em>
              </h2>
              <p className="mt-4 text-white/45 text-sm max-w-lg leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Setiap huruf dalam &ldquo;AKAL&rdquo; mewakili komitmen yang menjadi landasan kerja seluruh pengurus dan unit usaha BUMDes Girimulyo.
              </p>
            </div>

            {/* Right: placeholder image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#2A4A1A]">
              <Image
                // src="/cardGirifarm.JPG"
                src="/Petani.JPG"
                alt="Kolam renang resort dengan tanaman tropis dan gazebo bambu"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A10]/80 via-[#1C3A10]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/50 text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Desa Giripurno · Kecamatan Bumiaji · Kota Batu
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AKAL.map(({ letter, word, desc }, i) => (
              <div key={word} className="group relative bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.12] hover:border-white/[0.18] transition-all duration-400">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-[#A8D97A]/30 leading-none group-hover:text-[#A8D97A]/50 transition-colors" style={{ fontFamily: "'Fraunces', serif" }}>
                    {letter}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-bold text-white/20 tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {word}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VISI & MISI ── */}
      <div className="py-24 bg-[#F7F3EC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Visi — left panel */}
            <div className="relative bg-[#1C1A16] rounded-3xl p-10 md:p-12 overflow-hidden flex flex-col justify-between">
              {/* Decorative gradient orb */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2C5F1A]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#8B5E3C]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="inline-flex items-center gap-2 bg-[#2C5F1A] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Visi
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <p className="text-white font-bold text-lg md:text-2xl leading-[1.5]" style={{ fontFamily: "'Fraunces', serif" }}>
                  &ldquo;Terwujudnya BUMDes Girimulyo yang Mandiri sebagai Basis Pengembangan Perekonomian Desa dan Lembaga Ekonomi Antar Desa yang Berbasis pada Kerjasama dan Gotong Royong.&rdquo;
                </p>
              </div>
              <div className="relative z-10 mt-8 pt-5 border-t border-white/10">
                <p className="text-white/25 text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  BUMDes Girimulyo · Desa Giripurno
                </p>
              </div>
            </div>

            {/* Misi — right panel */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#2C5F1A]/8">
              <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 bg-[#EDE6D8] text-[#8B5E3C] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Misi
                </div>
                <div className="h-px flex-1 bg-[#E5E3D8]" />
              </div>

              <div className="space-y-0">
                {MISI_ITEMS.map((m, i) => (
                  <div key={i} className="group flex items-stretch gap-4">
                    {/* Left: number + connector line */}
                    <div className="flex flex-col items-center shrink-0 w-7">
                      <div className="w-7 h-7 rounded-full bg-[#2C5F1A] text-white text-[10px] font-bold flex items-center justify-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {i + 1}
                      </div>
                      {i < MISI_ITEMS.length - 1 && (
                        <div className="w-px flex-1 bg-[#2C5F1A]/15 my-1" />
                      )}
                    </div>
                    {/* Right: content */}
                    <div className={`py-2.5 ${i < MISI_ITEMS.length - 1 ? "pb-5" : ""}`}>
                      <p className="text-[#4A3F30] text-xs leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {m}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── KESIMPULAN ── */}
      <div className="relative py-24 bg-[#2C5F1A] overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#A8D97A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1C3A10]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Quote */}
          <div className="relative mb-16">
            <div className="absolute -top-6 -left-2 text-white/[0.06] select-none pointer-events-none leading-none" style={{ fontFamily: "'Fraunces', serif", fontSize: "200px" }}>
              &ldquo;
            </div>
            <blockquote className="relative z-10 max-w-4xl">
              <p className="text-white text-2xl md:text-4xl font-bold leading-[1.4] tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                BUMDes harus menjadi wadah yang{" "}
                <em className="italic font-light text-[#EDE6D8]">menyatukan sekaligus melindungi</em>{" "}
                pelaku ekonomi kecil, menjadi bisnis yang lebih besar tanpa harus mendominasi usaha yang dalam proses berkembang.
              </p>
            </blockquote>
          </div>

          {/* Principle cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Handshake, title: "Menyatukan", desc: "BUMDes adalah rumah bersama bagi seluruh pelaku ekonomi kecil di desa — petani, pengrajin, hingga pedagang lokal." },
              { icon: Shield, title: "Melindungi", desc: "Hadir sebagai payung yang memastikan usaha kecil tidak terpinggirkan oleh kepentingan modal besar." },
              { icon: Sprout, title: "Bukan Mendominasi", desc: "BUMDes tumbuh bersama, bukan di atas usaha warga — pertumbuhan yang inklusif dan berkeadilan." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-white/[0.1] backdrop-blur-sm border border-white/[0.12] rounded-2xl p-7 hover:bg-white/[0.18] hover:border-white/[0.22] transition-all duration-400">
                <div className="w-11 h-11 rounded-xl bg-white/[0.12] flex items-center justify-center mb-5 group-hover:bg-white/[0.2] transition-colors">
                  <Icon className="w-5 h-5 text-[#EDE6D8]" />
                </div>
                <h4 className="text-white font-bold text-base mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                  {title}
                </h4>
                <p className="text-white/55 text-xs leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
