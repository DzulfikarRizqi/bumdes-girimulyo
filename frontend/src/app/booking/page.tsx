"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          { credentials: "include" }
        );
        if (res.ok) {
          router.replace("/booking/dashboard");
          return;
        }
      } catch {
        // not logged in, continue to login form
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message || "Username atau password salah.");
        setLoading(false);
        return;
      }

      router.push("/booking/dashboard");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
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
          <form onSubmit={handleSubmit} className="space-y-5">
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
              {loading ? "Masuk..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#A89A86] text-xs mt-6">
  &copy; {new Date().getFullYear()}{" "}Manahayu Resort &middot; BUMDes Girimulyo
</p>
      </div>
    </div>
  );
}
