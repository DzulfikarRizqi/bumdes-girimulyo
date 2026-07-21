import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: Record<string, unknown>, expiresIn = "10m"): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}

function getCookieValue(request: NextRequest, name: string): string | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [key, ...rest] = cookie.split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

export function getTokenFromCookie(request: NextRequest): string | null {
  return getCookieValue(request, "token");
}

export function getTempTokenFromCookie(request: NextRequest): string | null {
  return getCookieValue(request, "temp_token");
}

export async function requireAuth(request: NextRequest): Promise<boolean> {
  const token = getTokenFromCookie(request);
  if (!token) return false;
  try {
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}
