import { Router } from "express";
import {
  getAllBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  getNextBookingNumber,
  getBookingSheetRow,
} from "../lib/google-sheets.js";
import { getRoomByNomor } from "../lib/rooms.js";
import { parseDateValue } from "../lib/date.js";
import type { Booking } from "../types/index.js";

const router = Router();

function isOverlap(
  bookings: Booking[],
  nomorKamar: string,
  checkIn: string,
  checkOut: string,
  excludeId?: string
): boolean {
  return bookings
    .filter((b) => b.nomorKamar === nomorKamar && b.idBooking !== excludeId)
    .some((b) => b.tanggalCheckIn < checkOut && b.tanggalCheckOut > checkIn);
}

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
    const ci = parseDateValue(partial.tanggalCheckIn);
    const co = parseDateValue(partial.tanggalCheckOut);
    if (ci && co) {
      jumlahMalam = Math.round((co.getTime() - ci.getTime()) / 86400000);
    }
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

    if (body.tanggalCheckIn && body.tanggalCheckOut && body.nomorKamar) {
      const existing = await getAllBookings();
      if (isOverlap(existing, body.nomorKamar, body.tanggalCheckIn, body.tanggalCheckOut)) {
        return res.status(409).json({ error: "Kamar sudah dipesan pada tanggal tersebut" });
      }
    }

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
    const existing = bookings.find((b) => b.idBooking === id);
    if (!existing) {
      return res.status(404).json({ error: "Booking tidak ditemukan" });
    }

    const sheetRow = await getBookingSheetRow(id);
    if (sheetRow === null) {
      return res.status(404).json({ error: "Booking tidak ditemukan di sheet" });
    }

    const body = req.body as Partial<Booking>;
    const room = getRoomByNomor(body.nomorKamar || existing.nomorKamar);

    const tanggalCheckIn = body.tanggalCheckIn || existing.tanggalCheckIn;
    const tanggalCheckOut = body.tanggalCheckOut || existing.tanggalCheckOut;

    let jumlahMalam = existing.jumlahMalam;
    if (tanggalCheckIn && tanggalCheckOut) {
      const ci = parseDateValue(tanggalCheckIn);
      const co = parseDateValue(tanggalCheckOut);
      if (ci && co) {
        jumlahMalam = Math.round((co.getTime() - ci.getTime()) / 86400000);
        if (jumlahMalam < 0) jumlahMalam = 0;
      }
    }

    const hargaPerMalam = room?.hargaPerMalam ?? body.hargaPerMalam ?? existing.hargaPerMalam;
    const totalHarga = hargaPerMalam * jumlahMalam;
    const jumlahBayar = body.jumlahBayar ?? existing.jumlahBayar;
    const sisaPembayaran = totalHarga - jumlahBayar;

    const updated: Booking = {
      no: existing.no,
      idBooking: existing.idBooking,
      tanggalPemesanan: existing.tanggalPemesanan,
      namaTamu: body.namaTamu ?? existing.namaTamu,
      noHP: body.noHP ?? existing.noHP,
      tipeKamar: (room?.tipe || body.tipeKamar || existing.tipeKamar) as Booking["tipeKamar"],
      nomorKamar: body.nomorKamar ?? existing.nomorKamar,
      tanggalCheckIn,
      tanggalCheckOut,
      jumlahMalam,
      jumlahTamu: body.jumlahTamu ?? existing.jumlahTamu,
      permintaanKhusus: body.permintaanKhusus ?? existing.permintaanKhusus,
      hargaPerMalam,
      totalHarga,
      statusPembayaran: body.statusPembayaran ?? existing.statusPembayaran,
      jumlahBayar,
      sisaPembayaran,
    };

    if (isOverlap(bookings, updated.nomorKamar, updated.tanggalCheckIn, updated.tanggalCheckOut, id)) {
      return res.status(409).json({ error: "Kamar sudah dipesan pada tanggal tersebut" });
    }

    await updateBooking(sheetRow, updated);
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
    const existing = bookings.find((b) => b.idBooking === id);
    if (!existing) {
      return res.status(404).json({ error: "Booking tidak ditemukan" });
    }

    const sheetRow = await getBookingSheetRow(id);
    if (sheetRow === null) {
      return res.status(404).json({ error: "Booking tidak ditemukan di sheet" });
    }

    await deleteBooking(sheetRow);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /bookings error:", err);
    res.status(500).json({ error: "Gagal hapus booking" });
  }
});

export default router;
