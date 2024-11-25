import crypto from "node:crypto";
import { headers } from "next/headers";

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export async function getClientIp() {
  const FALLBACK_IP_ADDRESS = "unknown";
  const getHeader = async (header: string) => {
    const hdrs = await headers();
    return hdrs.get(header) ?? FALLBACK_IP_ADDRESS;
  };

  const forwardedFor = await getHeader("x-forwarded-for");
  const ip = forwardedFor.split(",")[0] || (await getHeader("x-real-ip"));

  return hashIp(ip);
}
