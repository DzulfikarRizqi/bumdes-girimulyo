import Link from "next/link";
import { Leaf, MapPin, Phone, Mail, Triangle } from "lucide-react";
import {FaInstagram as Instagram, FaYoutube as Youtube} from "react-icons/fa";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/bumdesgirimulyo/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@BUMDESGIRIMULYO", label: "YouTube" },
  { icon: Triangle, href: "#", label: "Sosial media lain (placeholder)" },
];

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Girimulyo Farm", href: "/girimulyofarm" },
  { label: "Manahayu Resort", href: "/manahayuresort" },
  { label: "Portal Desa Giripurno", href: "https://desagiripurno.id" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1C1A16] text-white/70 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C5F1A]">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span
                className="text-sm font-bold tracking-wide text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                BUMDes <span className="text-[#8B5E3C]">GIRIMULYO</span>
              </span>
            </div>
            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Badan Usaha Milik Desa Giripurno — menggerakkan ekonomi lokal melalui pertanian organik dan pariwisata resort.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={`${social.label}-${index}`}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={(event) => {
                      if (social.href === "#") event.preventDefault();
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all hover:border-white/30 hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4
              className="mb-5 text-sm font-semibold tracking-wide text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Tautan
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-white"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-5 text-sm font-semibold tracking-wide text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Kontak
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2C5F1A]" />
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Desa Giripurno, Kec. Bumiaji,
                  <br />
                  Kota Batu, Jawa Timur 65336
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#2C5F1A]" />
                <a
                  href="tel:+6234112345"
                  className="text-sm transition-colors hover:text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  (0341) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#2C5F1A]" />
                <a
                  href="mailto:bumdes@giripurno.desa.id"
                  className="text-sm transition-colors hover:text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  bumdes@giripurno.desa.id
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            © 2026 BUMDes Girimulyo. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Pemerintah Kota Batu
            </p>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <p className="text-xs text-white/25" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Desa Giripurno Kecamatan Bumiaji
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
