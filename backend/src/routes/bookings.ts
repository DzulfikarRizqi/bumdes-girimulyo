import { Router } from "express";
import {
  getAllBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  getNextBookingNumber,
} from "../lib/google-sheets.js";
import { getRoomByNomor } from "../lib/rooms.js";
import type { Booking } from "../types/index.js";

const router = Router();

function generateIdBooking(num: number): string {
  return `BK-${String(num).padStart(3, "0")}`;
}

function calculateFields(
  partial: Partial<Booking>,
  roomPrice?: number
): Pick<
  Booking,
  "jumlahMalam" | "hargaPerMalam" | "totalHarga" | "sisaPembayaran"
> {
  let jumlahMalam = partial.jumlahMalam || 0;
  if (partial.tanggalCheckIn && partial.tanggalCheckOut) {
    const ci = new Date(partial.tanggalCheckIn);
    const co = new Date(partial.tanggalCheckOut);
    jumlahMalam = Math.round((co.getTime() - ci.getTime()) / 86400000);
  }

  const hargaPerMalam =
    roomPrice ?? partial.hargaPerMalam ?? 0;
  const totalHarga = hargaPerMalam * jumlahMalam;
  const sisaPembayaran =
    totalHarga - (partial.jumlahBayar || 0);

  return { jumlahMalam, hargaPerMalam, totalHarga, sisaPembayaran };
}

router.get("/", async (_req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (err) {
    console.error("GET /bookings error:", err);
    res.status(500).json({ error: "Gagal mengambil data booking" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body as Partial<Booking>;
    const num = await getNextBookingNumber();
    const room = getRoomByNomor(body.nomorKamar || "");
    const fields = calculateFields(body, room?.hargaPerMalam);

    const booking: Booking = {
      no: num,
      idBooking: generateIdBooking(num),
      tanggalPemesanan: new Date().toISOString().split("T")[0],
      namaTamu: body.namaTamu || "",
      noHP: body.noHP || "",
      tipeKamar: (room?.tipe || body.tipeKamar || "Couple") as Booking["tipeKamar"],
      nomorKamar: body.nomorKamar || "",
      tanggalCheckIn: body.tanggalCheckIn || "",
      tanggalCheckOut: body.tanggalCheckOut || "",
      jumlahMalam: fields.jumlahMalam,
      jumlahTamu: body.jumlahTamu || 1,
      permintaanKhusus: body.permintaanKhusus || "",
      hargaPerMalam: fields.hargaPerMalam,
      totalHarga: fields.totalHarga,
      statusPembayaran: body.statusPembayaran || "DP",
      jumlahBayar: body.jumlahBayar || 0,
      sisaPembayaran: fields.sisaPembayaran,
    };

    await addBooking(booking);
    res.status(201).json(booking);
  } catch (err) {
    console.error("POST /bookings error:", err);
    res.status(500).json({ error: "Gagal membuat booking" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await getAllBookings();
    const idx = bookings.findIndex((b) => b.idBooking === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Booking tidak ditemukan" });
    }

    const body = req.body as Partial<Booking>;
    const room = getRoomByNomor(body.nomorKamar || bookings[idx].nomorKamar);
    const fields = calculateFields(body, room?.hargaPerMalam);

    const updated: Booking = {
      ...bookings[idx],
      ...body,
      no: bookings[idx].no,
      idBooking: bookings[idx].idBooking,
      tanggalPemesanan: bookings[idx].tanggalPemesanan,
      tipeKamar: (room?.tipe || body.tipeKamar || bookings[idx].tipeKamar) as Booking["tipeKamar"],
      jumlahMalam: fields.jumlahMalam,
      hargaPerMalam: fields.hargaPerMalam,
      totalHarga: fields.totalHarga,
      sisaPembayaran: fields.sisaPembayaran,
    };

    await updateBooking(idx + 5, updated);
    res.json(updated);
  } catch (err) {
    console.error("PUT /bookings error:", err);
    res.status(500).json({ error: "Gagal update booking" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await getAllBookings();
    const idx = bookings.findIndex((b) => b.idBooking === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Booking tidak ditemukan" });
    }

    await deleteBooking(idx + 5);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /bookings error:", err);
    res.status(500).json({ error: "Gagal hapus booking" });
  }
});

export default router;
