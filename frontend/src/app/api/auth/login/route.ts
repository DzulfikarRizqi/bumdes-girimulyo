import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { generateOTP, hashOTP } from "@/lib/otp";
import { sendOTPWhatsApp } from "@/lib/whatsapp";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (
      username !== process.env.AUTH_USERNAME ||
      password !== process.env.AUTH_PASSWORD
    ) {
      return NextResponse.json(
        { message: "Username atau password salah" },
        { status: 401 }
      );
    }

    const phone = process.env.ADMIN_WA_NUMBER;
    if (!phone) {
      return NextResponse.json(
        { message: "Nomor WhatsApp admin tidak dikonfigurasi" },
        { status: 500 }
      );
    }

    const code = generateOTP();
    const hash = await hashOTP(code);
    const tempToken = await signToken({ hash }, "5m");

    await sendOTPWhatsApp(phone, code);

    const response = NextResponse.json({ step: "verify" });
    response.cookies.set("temp_token", tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 300,
    });
    return response;
  } catch (err) {
    console.error("POST /api/auth/login error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
