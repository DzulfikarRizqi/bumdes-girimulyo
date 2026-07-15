"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Calendar,
  User,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

const ROOMS = [
  { nomor: "Couple 1", tipe: "Couple", hargaPerMalam: 500000 },
  { nomor: "Family 2", tipe: "Family", hargaPerMalam: 850000 },
  { nomor: "Family 3", tipe: "Family", hargaPerMalam: 850000 },
  { nomor: "Special 1", tipe: "Special", hargaPerMalam: 1200000 },
];

interface Booking {
  no: number;
  idBooking: string;
  tanggalPemesanan: string;
  namaTamu: string;
  noHP: string;
  tipeKamar: "Couple" | "Family" | "Special";
  nomorKamar: string;
  tanggalCheckIn: string;
  tanggalCheckOut: string;
  jumlahMalam: number;
  jumlahTamu: number;
  permintaanKhusus: string;
  hargaPerMalam: number;
  totalHarga: number;
  statusPembayaran: "Lunas" | "DP";
  jumlahBayar: number;
  sisaPembayaran: number;
}

interface FormData {
  namaTamu: string;
  noHP: string;
  tipeKamar: "Couple" | "Family" | "Special";
  nomorKamar: string;
  tanggalCheckIn: string;
  tanggalCheckOut: string;
  jumlahTamu: number;
  permintaanKhusus: string;
  statusPembayaran: "Lunas" | "DP";
  jumlahBayar: number;
}

const EMPTY_FORM: FormData = {
  namaTamu: "",
  noHP: "",
  tipeKamar: "Couple",
  nomorKamar: "Couple 1",
  tanggalCheckIn: "",
  tanggalCheckOut: "",
  jumlahTamu: 2,
  permintaanKhusus: "",
  statusPembayaran: "DP",
  jumlahBayar: 0,
};

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function formatDate(d: string) {
  if (!d) return "—";
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calcNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn + "T00:00:00");
  const b = new Date(checkOut + "T00:00:00");
  const diff = Math.round((b.getTime() - a.getTime()) / 86400000);
  return diff > 0 ? diff : 0;
}

function getRoomsByTipe(tipe: string) {
  return ROOMS.filter((r) => r.tipe === tipe);
}

function getHargaPerMalam(nomor: string) {
  return ROOMS.find((r) => r.nomor === nomor)?.hargaPerMalam ?? 0;
}

export default function DashboardPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const nights = calcNights(form.tanggalCheckIn, form.tanggalCheckOut);
  const harga = getHargaPerMalam(form.nomorKamar);
  const totalHarga = nights * harga;
  const sisa = totalHarga - form.jumlahBayar;

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/bookings`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : data.data ?? []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API}/api/auth/me`, {
          credentials: "include",
        });
        if (res.status === 401 || !res.ok) {
          router.replace("/booking");
          return;
        }
      } catch {
        router.replace("/booking");
        return;
      }
      fetchBookings();
    };
    checkAuth();
  }, [router, fetchBookings]);

  const handleLogout = async () => {
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // proceed with redirect anyway
    }
    router.replace("/booking");
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (b: Booking) => {
    setEditingId(b.idBooking);
    setForm({
      namaTamu: b.namaTamu,
      noHP: b.noHP,
      tipeKamar: b.tipeKamar,
      nomorKamar: b.nomorKamar,
      tanggalCheckIn: b.tanggalCheckIn,
      tanggalCheckOut: b.tanggalCheckOut,
      jumlahTamu: b.jumlahTamu,
      permintaanKhusus: b.permintaanKhusus,
      statusPembayaran: b.statusPembayaran,
      jumlahBayar: b.jumlahBayar,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus booking ini?")) return;
    try {
      const res = await fetch(`${API}/api/bookings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.idBooking !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      jumlahMalam: nights,
      hargaPerMalam: harga,
      totalHarga,
      sisaPembayaran: sisa,
    };

    try {
      const url = editingId
        ? `${API}/api/bookings/${editingId}`
        : `${API}/api/bookings`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setModalOpen(false);
        setEditingId(null);
        setForm(EMPTY_FORM);
        fetchBookings();
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  const updateForm = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    const next = { ...form, [key]: value };

    if (key === "tipeKamar") {
      const rooms = getRoomsByTipe(value as string);
      next.nomorKamar = rooms.length > 0 ? rooms[0].nomor : "";
    }

    if (key === "tanggalCheckIn" || key === "tanggalCheckOut") {
      if (key === "tanggalCheckIn" && next.tanggalCheckOut) {
        const n = calcNights(value as string, next.tanggalCheckOut);
        if (n <= 0) next.tanggalCheckOut = "";
      }
    }

    setForm(next);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
        <p className="text-[#6B5E4A] text-sm">Memuat data booking...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Header */}
      <header className="bg-[#1C1A16] border-b border-[#8B5E3C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Manahayu Resort
            </h1>
            <p className="text-[#D4A574] text-xs font-medium tracking-wider uppercase">
              Admin Panel
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#8B5E3C]/20 hover:bg-[#8B5E3C]/30 text-white/80 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Action bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#1C1A16] font-serif">
              Daftar Booking
            </h2>
            <p className="text-[#6B5E4A] text-xs mt-0.5">
              {bookings.length} booking tercatat
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#2C5F1A] hover:bg-[#234D15] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Booking Baru
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#8B5E3C]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-[#F7F3EC] border-b border-[#8B5E3C]/10">
                  <th className="text-left px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Tamu
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    HP
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Kamar
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Check-in
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Check-out
                  </th>
                  <th className="text-center px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Malam
                  </th>
                  <th className="text-right px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-right px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Bayar
                  </th>
                  <th className="text-right px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Sisa
                  </th>
                  <th className="text-center px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-center px-4 py-3 text-[#6B5E4A] text-xs font-semibold uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="text-center py-12 text-[#A89A86] text-sm"
                    >
                      Belum ada booking.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr
                      key={b.idBooking}
                      className="border-b border-[#8B5E3C]/8 hover:bg-[#FDF8F0]/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-[#4A3F30] text-xs font-mono">
                        {b.idBooking}
                      </td>
                      <td className="px-4 py-3 text-[#1C1A16] font-medium text-xs">
                        {b.namaTamu}
                      </td>
                      <td className="px-4 py-3 text-[#6B5E4A] text-xs">
                        {b.noHP}
                      </td>
                      <td className="px-4 py-3 text-[#1C1A16] text-xs">
                        <span className="font-medium">{b.nomorKamar}</span>
                        <span className="text-[#A89A86] ml-1">
                          ({b.tipeKamar})
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#6B5E4A] text-xs">
                        {formatDate(b.tanggalCheckIn)}
                      </td>
                      <td className="px-4 py-3 text-[#6B5E4A] text-xs">
                        {formatDate(b.tanggalCheckOut)}
                      </td>
                      <td className="px-4 py-3 text-[#1C1A16] text-xs text-center">
                        {b.jumlahMalam}
                      </td>
                      <td className="px-4 py-3 text-[#1C1A16] text-xs text-right font-medium">
                        {formatRupiah(b.totalHarga)}
                      </td>
                      <td className="px-4 py-3 text-[#2C5F1A] text-xs text-right font-medium">
                        {formatRupiah(b.jumlahBayar)}
                      </td>
                      <td className="px-4 py-3 text-xs text-right font-medium">
                        <span
                          className={
                            b.sisaPembayaran > 0
                              ? "text-[#B45309]"
                              : "text-[#2C5F1A]"
                          }
                        >
                          {formatRupiah(b.sisaPembayaran)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            b.statusPembayaran === "Lunas"
                              ? "bg-[#DCFCE7] text-[#166534]"
                              : "bg-[#FEF3C7] text-[#92400E]"
                          }`}
                        >
                          {b.statusPembayaran}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openEdit(b)}
                            className="p-1.5 rounded-lg hover:bg-[#EDE6D8] text-[#8B5E3C] hover:text-[#6B4226] transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(b.idBooking)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-[#A89A86] hover:text-red-600 transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-[#1C1A16]/60 backdrop-blur-sm"
            onClick={() => {
              setModalOpen(false);
              setEditingId(null);
            }}
          />

          {/* Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-[#8B5E3C]/10 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-[#1C1A16] font-serif">
                {editingId ? "Edit Booking" : "Booking Baru"}
              </h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditingId(null);
                }}
                className="p-1.5 rounded-lg hover:bg-[#EDE6D8] text-[#6B5E4A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Nama Tamu */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                  Nama Tamu
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89A86]" />
                  <input
                    type="text"
                    required
                    value={form.namaTamu}
                    onChange={(e) => updateForm("namaTamu", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm placeholder:text-[#A89A86] focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                    placeholder="Nama lengkap tamu"
                  />
                </div>
              </div>

              {/* No HP */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                  No HP
                </label>
                <input
                  type="text"
                  required
                  value={form.noHP}
                  onChange={(e) => updateForm("noHP", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm placeholder:text-[#A89A86] focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              {/* Tipe Kamar + Nomor Kamar */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                    Tipe Kamar
                  </label>
                  <select
                    value={form.tipeKamar}
                    onChange={(e) =>
                      updateForm(
                        "tipeKamar",
                        e.target.value as "Couple" | "Family" | "Special"
                      )
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors cursor-pointer"
                  >
                    <option value="Couple">Couple</option>
                    <option value="Family">Family</option>
                    <option value="Special">Special</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                    Nomor Kamar
                  </label>
                  <select
                    value={form.nomorKamar}
                    onChange={(e) => updateForm("nomorKamar", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors cursor-pointer"
                  >
                    {getRoomsByTipe(form.tipeKamar).map((r) => (
                      <option key={r.nomor} value={r.nomor}>
                        {r.nomor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Check-in + Check-out */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                    Tanggal Check-in
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89A86]" />
                    <input
                      type="date"
                      required
                      value={form.tanggalCheckIn}
                      onChange={(e) =>
                        updateForm("tanggalCheckIn", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                    Tanggal Check-out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89A86]" />
                    <input
                      type="date"
                      required
                      min={form.tanggalCheckIn || undefined}
                      value={form.tanggalCheckOut}
                      onChange={(e) =>
                        updateForm("tanggalCheckOut", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Jumlah Tamu */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                  Jumlah Tamu
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.jumlahTamu}
                  onChange={(e) =>
                    updateForm("jumlahTamu", parseInt(e.target.value) || 1)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                />
              </div>

              {/* Permintaan Khusus */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                  Permintaan Khusus{" "}
                  <span className="text-[#A89A86] font-normal">(opsional)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.permintaanKhusus}
                  onChange={(e) =>
                    updateForm("permintaanKhusus", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm placeholder:text-[#A89A86] focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors resize-none"
                  placeholder="Contoh: extra bed, late check-in, dll."
                />
              </div>

              {/* Status + Jumlah Bayar */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                    Status Pembayaran
                  </label>
                  <select
                    value={form.statusPembayaran}
                    onChange={(e) =>
                      updateForm(
                        "statusPembayaran",
                        e.target.value as "Lunas" | "DP"
                      )
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors cursor-pointer"
                  >
                    <option value="Lunas">Lunas</option>
                    <option value="DP">DP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1A16] mb-1.5">
                    Jumlah Bayar
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={form.jumlahBayar}
                    onChange={(e) =>
                      updateForm(
                        "jumlahBayar",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-[#F7F3EC] rounded-xl p-4 space-y-2 border border-[#8B5E3C]/8">
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B5E4A]">Jumlah Malam</span>
                  <span className="font-medium text-[#1C1A16]">{nights}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B5E4A]">Harga / Malam</span>
                  <span className="font-medium text-[#1C1A16]">
                    {formatRupiah(harga)}
                  </span>
                </div>
                <div className="h-px bg-[#8B5E3C]/10" />
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B5E4A] font-semibold">
                    Total Harga
                  </span>
                  <span className="font-bold text-[#1C1A16]">
                    {formatRupiah(totalHarga)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B5E4A]">Sisa Pembayaran</span>
                  <span
                    className={`font-bold ${
                      sisa > 0 ? "text-[#B45309]" : "text-[#2C5F1A]"
                    }`}
                  >
                    {formatRupiah(sisa > 0 ? sisa : 0)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingId(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-[#D8CFC0] text-[#6B5E4A] text-sm font-medium hover:bg-[#F7F3EC] transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || nights <= 0}
                  className="flex-1 py-2.5 rounded-xl bg-[#2C5F1A] hover:bg-[#234D15] disabled:opacity-50 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  {submitting
                    ? "Menyimpan..."
                    : editingId
                      ? "Simpan Perubahan"
                      : "Tambah Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#8B5E3C]/10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-[#A89A86] text-xs">
            &copy; {new Date().getFullYear()} Manahayu Resort &middot; BUMDes
            Girimulyo
          </p>
        </div>
      </footer>
    </div>
  );
}
