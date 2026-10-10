
import type { ProductChange } from "@/types/bazardor";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Convert English digits to Bengali digits
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

// Format prices with thousands separators and Bengali digits
export function formatPrice(value: number): string {
  return toBn(value.toLocaleString("en-US"));
}

// Full unit labels
export const UNIT_LABEL: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

// Short unit labels
export const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// Format price change percentage
export function formatChange(change: ProductChange): string {
  const pct = toBn(Math.abs(change.pct).toFixed(1));

  if (change.dir === "up") return `▲ ${pct}%`;
  if (change.dir === "down") return `▼ ${pct}%`;

  return "— ০.০%";
}

// Text colors: price increase = green, decrease = red, unchanged = gray
export const CHANGE_COLOR: Record<"up" | "down" | "flat", string> = {
  up: "text-green-600",
  down: "text-red-600",
  flat: "text-gray-500",
};

// Background colors for price change badges
export const CHANGE_BG: Record<"up" | "down" | "flat", string> = {
  up: "bg-green-50",
  down: "bg-red-50",
  flat: "bg-gray-100",
};

// Get the current date in Bengali
export function getBanglaDate(): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

// Format average prices, keeping up to two decimal places
export function formatAverage(value: number): string {
  return toBn(
    value.toLocaleString("en-US", {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: 2,
    }),
  );
}

