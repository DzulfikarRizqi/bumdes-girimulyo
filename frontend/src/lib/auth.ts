import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === "token") return rest.join("=");
  }
  return null;
}

export async function requireAuth(request: NextRequest): Promise<boolean> {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  try {
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}
