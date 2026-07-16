import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  getAllBookings,
  addBooking,
  getNextBookingNumber,
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

export async function GET() {
  try {
    const bookings = await getAllBookings();
    return NextResponse.json(bookings);
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    return NextResponse.json(
      { error: "Gagal mengambil data booking" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authed = await requireAuth(request);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as Partial<Booking>;
    const num = await getNextBookingNumber();
    const room = getRoomByNomor(body.nomorKamar || "");
    const fields = calculateFields(body, room?.hargaPerMalam);

    if (body.tanggalCheckIn && body.tanggalCheckOut && body.nomorKamar) {
      const existing = await getAllBookings();
      if (isOverlap(existing, body.nomorKamar, body.tanggalCheckIn, body.tanggalCheckOut)) {
        return NextResponse.json(
          { error: "Kamar sudah dipesan pada tanggal tersebut" },
          { status: 409 }
        );
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
    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json(
      { error: "Gagal membuat booking" },
      { status: 500 }
    );
  }
}
