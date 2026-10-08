import Link from "next/link";
import type { Product } from "@/types/bazardor";
import {
  CHANGE_COLOR,
  UNIT_LABEL,
  formatChange,
  formatPrice,
} from "@/lib/format";

const BADGE_BG: Record<"up" | "down" | "flat", string> = {
  up: "bg-red-50",
  down: "bg-green-50",
  flat: "bg-gray-100",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-[#e2e9e3] bg-white p-4 transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </span>

        <div>
          <h3 className="font-semibold leading-tight text-[#17231b]">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">
            {UNIT_LABEL[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">আজকের দাম</p>

      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-[#17231b]">
          {formatPrice(product.today)}{" "}
          <span className="text-sm font-medium">টাকা</span>
        </p>

        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${BADGE_BG[product.change.dir]} ${CHANGE_COLOR[product.change.dir]}`}
        >
          {formatChange(product.change)}
        </span>
      </div>
    </Link>
  );
}