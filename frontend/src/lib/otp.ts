export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function hashOTP(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyOTP(code: string, hash: string): Promise<boolean> {
  const computed = await hashOTP(code);
  return computed === hash;
}
