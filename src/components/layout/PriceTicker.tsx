
import type { Product } from "@/types/bazardor";

interface PriceTickerProps {
  products: Product[];
}

function formatBengaliNumber(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

function getUnitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    l: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return units[unit.toLowerCase()] ?? unit;
}

export default function PriceTicker({
  products,
}: PriceTickerProps) {
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
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0"
          >
            {products.map((product) => {
              const direction = product.change?.dir;
              const percentage = product.change?.pct ?? 0;

              const directionSymbol =
                direction === "up"
                  ? "▲"
                  : direction === "down"
                    ? "▼"
                    : "—";

              const changeColor =
                direction === "up"
                  ? "text-green-700"
                  : direction === "down"
                    ? "text-red-600"
                    : "text-gray-500";

              return (
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
                    {formatBengaliNumber(product.today)} টাকা/
                    {getUnitLabel(product.unit)}
                  </span>

                  <span
                    className={`whitespace-nowrap text-[11px] font-semibold ${changeColor}`}
                  >
                    {directionSymbol}{" "}
                    {formatBengaliNumber(Math.abs(percentage))}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}