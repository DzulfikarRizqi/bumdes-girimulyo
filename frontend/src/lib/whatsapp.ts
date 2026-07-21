const FONNTE_API = "https://api.fonnte.com/send";

export async function sendOTPWhatsApp(phone: string, code: string): Promise<void> {
  const token = process.env.FONNTE_API_TOKEN;
  if (!token) throw new Error("FONNTE_API_TOKEN is not set");

  const res = await fetch(FONNTE_API, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target: phone,
      message: `Kode OTP Login Manahayu Resort\n\n${code}\n\nKode berlaku 5 menit. Jangan bagikan kode ini kepada siapa pun.`,
      type: "text",
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.reason || "Gagal mengirim OTP via WhatsApp");
  }
}
