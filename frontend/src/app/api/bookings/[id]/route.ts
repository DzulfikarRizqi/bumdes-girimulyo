import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  getAllBookings,
  updateBooking,
  deleteBooking,
  getBookingSheetRow,
} from "@/lib/google-sheets";
import { getRoomByNomor } from "@/lib/rooms";
import { parseDateValue } from "@/lib/date";
import type { Booking } from "@/lib/types";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await requireAuth(request);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const bookings = await getAllBookings();
    const existing = bookings.find((b) => b.idBooking === id);
    if (!existing) {
      return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
    }

    const sheetRow = await getBookingSheetRow(id);
    if (sheetRow === null) {
      return NextResponse.json(
        { error: "Booking tidak ditemukan di sheet" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as Partial<Booking>;
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
      return NextResponse.json(
        { error: "Kamar sudah dipesan pada tanggal tersebut" },
        { status: 409 }
      );
    }

    await updateBooking(sheetRow, updated);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/bookings error:", err);
    return NextResponse.json(
      { error: "Gagal update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await requireAuth(request);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const bookings = await getAllBookings();
    const existing = bookings.find((b) => b.idBooking === id);
    if (!existing) {
      return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
    }

    const sheetRow = await getBookingSheetRow(id);
    if (sheetRow === null) {
      return NextResponse.json(
        { error: "Booking tidak ditemukan di sheet" },
        { status: 404 }
      );
    }

    await deleteBooking(sheetRow);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/bookings error:", err);
    return NextResponse.json(
      { error: "Gagal hapus booking" },
      { status: 500 }
    );
  }
}
