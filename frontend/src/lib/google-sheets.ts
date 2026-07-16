import { google, sheets_v4 } from "googleapis";
import type { Booking } from "./types";
import { normalizeDateValue } from "./date";

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

function isSerialDate(value: unknown): boolean {
  if (typeof value === "number" && value > 40000 && value < 60000 && Number.isInteger(value)) {
    return true;
  }
  if (typeof value === "string" && /^\d{4,5}$/.test(value.trim())) {
    const num = Number(value);
    return num > 40000 && num < 60000;
  }
  return false;
}

function serialToDate(serial: number): string {
  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let remaining = serial;
  let year = 1900;

  while (true) {
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const daysInYear = leap ? 366 : 365;
    if (remaining <= daysInYear) break;
    remaining -= daysInYear;
    year++;
  }

  let month = 1;
  for (let m = 0; m < 12; m++) {
    let dim = DAYS_IN_MONTH[m];
    if (m === 1 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      dim = 29;
    }
    if (remaining <= dim) break;
    remaining -= dim;
    month++;
  }

  const mm = String(month).padStart(2, "0");
  const dd = String(remaining).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function toDate(val: unknown): string {
  if (val === undefined || val === null) return "";
  const str = String(val).trim();
  if (!str) return "";

  if (isSerialDate(val)) {
    const num = typeof val === "number" ? val : Number(val);
    return serialToDate(num);
  }

  return normalizeDateValue(str);
}

function bookingToRow(b: Booking): (string | number)[] {
  return [
    b.no,
    b.idBooking,
    b.tanggalPemesanan,
    b.namaTamu,
    `'${b.noHP}`,
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

function rowToBooking(row: unknown[], index: number): Booking {
  return {
    no: Number(row[0]) || index + 1,
    idBooking: String(row[1] || ""),
    tanggalPemesanan: toDate(row[2]),
    namaTamu: String(row[3] || ""),
    noHP: String(row[4] || "").replace(/^'/, ""),
    tipeKamar: String(row[5] || "") as Booking["tipeKamar"],
    nomorKamar: String(row[6] || ""),
    tanggalCheckIn: toDate(row[7]),
    tanggalCheckOut: toDate(row[8]),
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
    range: `${SHEET_NAME}!A2:Q`,
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  const rows = res.data.values as unknown[][] | undefined | null;
  return (rows || [])
    .filter((row): row is unknown[] => !!(row && row[1] && String(row[1]).trim().startsWith("BK")))
    .map((row, i) => rowToBooking(row, i));
}

export async function getBookingSheetRow(idBooking: string): Promise<number | null> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.get({
    spreadsheetId: getSpreadsheetId(),
    ranges: [`${SHEET_NAME}!A2:B`],
    fields: "sheets.data.rowData",
  });

  const rowData = res.data.sheets?.[0]?.data?.[0]?.rowData || [];
  for (let i = 0; i < rowData.length; i++) {
    const cellB = rowData[i]?.values?.[1]?.userEnteredValue?.stringValue
      ?? rowData[i]?.values?.[1]?.userEnteredValue?.numberValue
      ?? "";
    if (String(cellB).trim() === idBooking) {
      return i + 2;
    }
  }
  return null;
}

export async function addBooking(booking: Booking): Promise<void> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: `${SHEET_NAME}!A:A`,
  });
  const allRows = res.data.values || [];
  const nextRow = allRows.length + 1;
  const range = `${SHEET_NAME}!A${nextRow}:Q${nextRow}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSpreadsheetId(),
    range,
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

async function getSheetIdByName(name: string): Promise<number> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.get({
    spreadsheetId: getSpreadsheetId(),
    fields: "sheets.properties",
  });
  const prop = (res.data.sheets as sheets_v4.Schema$Sheet[] | undefined)?.find(
    (s) => s.properties?.title === name
  );
  const sheetId = prop?.properties?.sheetId;
  if (sheetId === undefined || sheetId === null) {
    throw new Error(`Sheet "${name}" not found`);
  }
  return sheetId;
}

export async function deleteBooking(rowIndex: number): Promise<void> {
  const sheets = getSheets();
  const sheetId = await getSheetIdByName(SHEET_NAME);
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: getSpreadsheetId(),
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: rowIndex - 1,
              endIndex: rowIndex,
            },
          },
        },
      ],
    },
  });
}

export async function getNextBookingNumber(): Promise<number> {
  const bookings = await getAllBookings();
  if (bookings.length === 0) return 1;
  return Math.max(...bookings.map((b) => b.no)) + 1;
}
