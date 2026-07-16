import type { RoomConfig } from "./types";

export const ROOMS: RoomConfig[] = [
  { nomor: "Couple 1", tipe: "Couple", hargaPerMalam: 299000 },
  { nomor: "Couple 2", tipe: "Couple", hargaPerMalam: 299000 },
  { nomor: "Couple 3", tipe: "Couple", hargaPerMalam: 299000 },
  { nomor: "Family 1", tipe: "Family", hargaPerMalam: 399000 },
  { nomor: "Family 2", tipe: "Family", hargaPerMalam: 399000 },
  { nomor: "Family 3", tipe: "Family", hargaPerMalam: 399000 },
  { nomor: "Special 1", tipe: "Special", hargaPerMalam: 599000 },
];

export function getRoomByNomor(nomor: string): RoomConfig | undefined {
  return ROOMS.find((r) => r.nomor === nomor);
}

export function getRoomsByTipe(tipe: string): RoomConfig[] {
  return ROOMS.filter((r) => r.tipe === tipe);
}
