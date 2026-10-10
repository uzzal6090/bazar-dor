import type { Product } from "@/types/bazardor";
import {
  CHANGE_COLOR,
  UNIT_SHORT,
  formatChange,
  formatPrice,
} from "@/lib/format";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div
      aria-label="আজকের পণ্যের দাম"
      className="overflow-hidden border-b border-[#e2e9e3] bg-[#f9fbf9]"
    >
      <div className="price-ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0">
            {products.map((product) => (
              <div
                key={`${copy}-${product.id}`}
                className="flex shrink-0 items-center gap-2 border-r border-[#e6ece7] px-4 py-3 text-xs sm:px-5 sm:text-sm"
              >
                <span aria-hidden="true">
                  {product.image || product.categoryIcon}
                </span>

                <span className="font-medium text-[#34443a]">
                  {product.nameBn}
                </span>

                <span className="whitespace-nowrap text-gray-600">
                  {formatPrice(product.today)} টাকা/
                  {UNIT_SHORT[product.unit] ?? product.unit}
                </span>

                <span
                  className={`whitespace-nowrap text-[11px] font-semibold ${CHANGE_COLOR[product.change.dir]}`}
                >
                  {formatChange(product.change)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}