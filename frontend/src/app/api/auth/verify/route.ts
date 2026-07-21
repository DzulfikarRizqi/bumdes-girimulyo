import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyToken, getTempTokenFromCookie } from "@/lib/auth";
import { verifyOTP } from "@/lib/otp";

export async function POST(request: NextRequest) {
  try {
    const tempToken = getTempTokenFromCookie(request);
    if (!tempToken) {
      return NextResponse.json(
        { message: "Sesi verifikasi habis. Silakan login ulang." },
        { status: 401 }
      );
    }

    let payload: { hash?: string };
    try {
      payload = (await verifyToken(tempToken)) as { hash?: string };
    } catch {
      return NextResponse.json(
        { message: "Sesi verifikasi habis. Silakan login ulang." },
        { status: 401 }
      );
    }

    const { code } = await request.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { message: "Kode OTP wajib diisi" },
        { status: 400 }
      );
    }

    const isValid = await verifyOTP(code.trim(), payload.hash || "");
    if (!isValid) {
      return NextResponse.json(
        { message: "Kode OTP salah" },
        { status: 401 }
      );
    }

    const token = await signToken({ username: "admin" }, "10m");

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
    response.cookies.set("temp_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (err) {
    console.error("POST /api/auth/verify error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
