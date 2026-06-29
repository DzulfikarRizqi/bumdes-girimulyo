"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, ExternalLink } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Efek latar belakang saat di-scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isSolid = !isHome || scrolled;

  const navLinks = [
    { label: "Beranda", to: "/" },
    { label: "Girimulyo Farm", to: "/girimulyofarm" },
    { label: "Manahayu Resort", to: "/manahayuresort" },
  ];

  return (
    <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
            isSolid
                ? "bg-white/95 text-[#1C1A16] shadow-sm border-b border-[#E5E3D8]/80"
                : "bg-transparent text-white"
    }`}
>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* BAGIAN KIRI (Logo) - Menggunakan flex-1 agar porsi ruangnya seimbang dengan kanan */}
        <div className="flex-1 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#2C5F1A] flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            {/* Warna teks dikunci menjadi gelap permanen agar tidak hilang di latar krem */}
            <span className="font-bold text-sm tracking-wide text-[#1C1A16]">
              BUMDes <span className="text-[#8B5E3C]">GIRIMULYO</span>
            </span>
          </Link>
        </div>

        {/* BAGIAN TENGAH (Navigasi) - Terkunci statis di tengah */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`text-sm font-medium transition-colors hover:text-[#2C5F1A] ${
                pathname === link.to ? "font-bold text-[#2C5F1A]" : "text-[#1C1A16]/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* BAGIAN KANAN (Tombol) - Menggunakan flex-1 dan justify-end agar rata kanan */}
        <div className="flex-1 flex items-center justify-end gap-4">
          
          {/* Tampil HANYA di halaman Manahayu Resort */}
          {pathname === "/manahayuresort" && (
            <Link
                href="/booking"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-[#8c561f] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-[#2C5F1A]/30 transition hover:bg-[#de8328]"
            >
                Admin Login
            </Link>
)}

          {/* Tombol Portal Desa */}
          <a
            href="https://desagiripurno.id"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-[#2C5F1A] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#3A7A22] transition-colors items-center gap-1.5"
          >
            Portal Desa <ExternalLink className="w-3 h-3" />
          </a>

          {/* Toggle Menu Mobile */}
          <button
            className="md:hidden text-[#1C1A16]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE (DROPDOWN) */}
      {open && (
        <div className="md:hidden bg-[#F7F3EC] border-t border-[#2C5F1A]/10 px-6 py-5 flex flex-col gap-4 shadow-lg absolute w-full">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium hover:text-[#2C5F1A] ${
                 pathname === link.to ? "font-bold text-[#2C5F1A]" : "text-[#1C1A16]/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {pathname === "/manahayuresort" && (
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="text-sm font-medium inline-flex items-center justify-center rounded-full bg-[#8c561f] px-4 py-2 text-white hover:bg-[#de8328] transition"
            >
              Admin Login
            </Link>
          )}

          <a
            href="https://desagiripurno.id"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2C5F1A] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center flex items-center justify-center gap-1.5"
          >
            Portal Desa <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </header>
  );
}