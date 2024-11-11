import crypto from "node:crypto";
import { headers } from "next/headers";

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export function getClientIp() {
  const FALLBACK_IP_ADDRESS = "unknown";
  const getHeader = (header: string) =>
    headers().get(header) ?? FALLBACK_IP_ADDRESS;

  const forwardedFor = getHeader("x-forwarded-for");
  const ip = forwardedFor.split(",")[0] || getHeader("x-real-ip");

  return hashIp(ip);
}
