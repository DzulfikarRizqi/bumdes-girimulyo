export type TipeKamar = "Couple" | "Family" | "Special";

export interface RoomConfig {
  nomor: string;
  tipe: TipeKamar;
  hargaPerMalam: number;
}

export interface Booking {
  no: number;
  idBooking: string;
  tanggalPemesanan: string;
  namaTamu: string;
  noHP: string;
  tipeKamar: TipeKamar;
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

export interface SessionData {
  username?: string;
}
