import type { RoomConfig } from "../types/index.js";

export const ROOMS: RoomConfig[] = [
  { nomor: "Couple 1", tipe: "Couple", hargaPerMalam: 500000 },
  { nomor: "Family 2", tipe: "Family", hargaPerMalam: 850000 },
  { nomor: "Family 3", tipe: "Family", hargaPerMalam: 850000 },
  { nomor: "Special 1", tipe: "Special", hargaPerMalam: 1200000 },
];

export function getRoomByNomor(nomor: string): RoomConfig | undefined {
  return ROOMS.find((r) => r.nomor === nomor);
}

export function getRoomsByTipe(tipe: string): RoomConfig[] {
  return ROOMS.filter((r) => r.tipe === tipe);
}
