import { type ClassValue, clsx } from "clsx";
import { createTwc } from "react-twc";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const twx = createTwc({ compose: cn });

export function rgbColorToString(color: { r: number; g: number; b: number }) {
  return `${color.r} ${color.g} ${color.b}`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat().format(new Date(date));
}

export async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}
