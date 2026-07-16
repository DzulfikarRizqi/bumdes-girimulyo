import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (
      username === process.env.AUTH_USERNAME &&
      password === process.env.AUTH_PASSWORD
    ) {
      const token = await signToken({ username });
      const response = NextResponse.json({ success: true, username });
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 86400,
      });
      return response;
    }

    return NextResponse.json(
      { error: "Username atau password salah" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
