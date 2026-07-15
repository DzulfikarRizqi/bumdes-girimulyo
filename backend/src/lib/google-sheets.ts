import { google } from "googleapis";
import type { Booking } from "../types/index.js";

const SHEET_NAME = "Booking Kamar";

let sheetsClient: ReturnType<typeof google.sheets> | null = null;

function getSheets() {
  if (sheetsClient) return sheetsClient;

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) {
    throw new Error("GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY must be set");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsClient = google.sheets({ version: "v4", auth });
  return sheetsClient;
}

function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!id) throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not set");
  return id;
}

function bookingToRow(b: Booking): (string | number)[] {
  return [
    b.no,
    b.idBooking,
    b.tanggalPemesanan,
    b.namaTamu,
    b.noHP,
    b.tipeKamar,
    b.nomorKamar,
    b.tanggalCheckIn,
    b.tanggalCheckOut,
    b.jumlahMalam,
    b.jumlahTamu,
    b.permintaanKhusus,
    b.hargaPerMalam,
    b.totalHarga,
    b.statusPembayaran,
    b.jumlahBayar,
    b.sisaPembayaran,
  ];
}

function rowToBooking(row: (string | number)[], index: number): Booking {
  return {
    no: Number(row[0]) || index + 1,
    idBooking: String(row[1] || ""),
    tanggalPemesanan: String(row[2] || ""),
    namaTamu: String(row[3] || ""),
    noHP: String(row[4] || ""),
    tipeKamar: String(row[5] || "") as Booking["tipeKamar"],
    nomorKamar: String(row[6] || ""),
    tanggalCheckIn: String(row[7] || ""),
    tanggalCheckOut: String(row[8] || ""),
    jumlahMalam: Number(row[9]) || 0,
    jumlahTamu: Number(row[10]) || 0,
    permintaanKhusus: String(row[11] || ""),
    hargaPerMalam: Number(row[12]) || 0,
    totalHarga: Number(row[13]) || 0,
    statusPembayaran: String(row[14] || "DP") as Booking["statusPembayaran"],
    jumlahBayar: Number(row[15]) || 0,
    sisaPembayaran: Number(row[16]) || 0,
  };
}

export async function getAllBookings(): Promise<Booking[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: `${SHEET_NAME}!A5:Q`,
  });

  const rows = res.data.values || [];
  return rows.map((row, i) => rowToBooking(row, i));
}

export async function addBooking(booking: Booking): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: `${SHEET_NAME}!A:Q`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [bookingToRow(booking)] },
  });
}

export async function updateBooking(
  rowIndex: number,
  booking: Booking
): Promise<void> {
  const sheets = getSheets();
  const range = `${SHEET_NAME}!A${rowIndex}:Q${rowIndex}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSpreadsheetId(),
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [bookingToRow(booking)] },
  });
}

export async function deleteBooking(rowIndex: number): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.clear({
    spreadsheetId: getSpreadsheetId(),
    range: `${SHEET_NAME}!A${rowIndex}:Q${rowIndex}`,
  });
}

export async function getNextBookingNumber(): Promise<number> {
  const bookings = await getAllBookings();
  if (bookings.length === 0) return 1;
  return Math.max(...bookings.map((b) => b.no)) + 1;
}
