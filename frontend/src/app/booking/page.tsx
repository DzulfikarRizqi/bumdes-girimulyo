"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function BookingLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "verify">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          router.replace("/booking/dashboard");
          return;
        }
      } catch {
        // not logged in
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (step === "verify" && otpRef.current) {
      otpRef.current.focus();
    }
  }, [step]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message || "Username atau password salah.");
        setLoading(false);
        return;
      }

      setStep("verify");
      setOtp("");
      setLoading(false);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: otp }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message || "Kode OTP salah.");
        setLoading(false);
        return;
      }

      router.push("/booking/dashboard");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Gagal mengirim ulang. Login ulang.");
        setLoading(false);
        return;
      }

      setOtp("");
      setLoading(false);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep("login");
    setError("");
    setOtp("");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
        <p className="text-[#6B5E4A] text-sm">Memeriksa sesi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C1A16] font-serif">
            Manahayu Resort
          </h1>
          <p className="text-[#8B5E3C] text-sm font-medium mt-1 tracking-wide uppercase">
            Admin Panel
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#8B5E3C]/10 p-8">
          {step === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold text-[#1C1A16] mb-1.5"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm placeholder:text-[#A89A86] focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                  placeholder="Masukkan username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#1C1A16] mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] text-sm placeholder:text-[#A89A86] focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                  placeholder="Masukkan password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2C5F1A] hover:bg-[#234D15] disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-colors cursor-pointer"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#F7F3EC] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-[#2C5F1A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#1C1A16]">
                  Verifikasi OTP
                </p>
                <p className="text-xs text-[#8B5E3C] mt-1">
                  Kode telah dikirim ke WhatsApp Manahayu Resort
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1A16] mb-2 text-center">
                  Masukkan kode 6 digit
                </label>
                <input
                  ref={otpRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(val);
                  }}
                  placeholder="000000"
                  className="w-full text-center text-2xl font-mono tracking-[0.5em] px-4 py-3 rounded-xl border border-[#D8CFC0] bg-[#FDF8F0] text-[#1C1A16] placeholder:text-[#D8CFC0] focus:outline-none focus:ring-2 focus:ring-[#2C5F1A]/30 focus:border-[#2C5F1A] transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-[#2C5F1A] hover:bg-[#234D15] disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-colors cursor-pointer"
              >
                {loading ? "Memverifikasi..." : "Verifikasi"}
              </button>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="text-[#8B5E3C] hover:text-[#6B4226] transition-colors cursor-pointer disabled:opacity-50"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="text-[#2C5F1A] hover:text-[#1C3A10] transition-colors cursor-pointer disabled:opacity-50"
                >
                  Kirim ulang OTP
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-[#A89A86] text-xs mt-6">
          &copy; {new Date().getFullYear()} Manahayu Resort &middot; BUMDes Girimulyo
        </p>
      </div>
    </div>
  );
}
