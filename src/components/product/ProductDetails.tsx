
import Link from "next/link";
import type { Product } from "@/types/bazardor";
import {
  CHANGE_BG,
  CHANGE_COLOR,
  UNIT_LABEL,
  UNIT_SHORT,
  formatAverage,
  formatChange,
  formatPrice,
  toBn,
} from "@/lib/format";

function StatCard({
  label,
  value,
  note,
  valueClassName,
}: {
  label: string;
  value: number;
  note: string;
  valueClassName: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e2e9e3] p-4">
      <p className="text-xs text-gray-500">{label}</p>

      <p className={`text-2xl font-bold ${valueClassName}`}>
        {formatAverage(value)} <span className="text-sm">টাকা</span>
      </p>

      <p className="mt-1 text-xs text-gray-500">{note}</p>
    </div>
  );
}

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const min =
    product.markets.length > 0
      ? Math.min(...product.markets.map((market) => market.min))
      : 0;

  const max =
    product.markets.length > 0
      ? Math.max(...product.markets.map((market) => market.max))
      : 0;

  const average =
    product.markets.length > 0
      ? product.markets.reduce(
          (sum, market) =>
            sum + (market.min + market.max) / 2,
          0,
        ) / product.markets.length
      : 0;

  const diff = product.today - product.yesterday;
  const unitLabel = UNIT_LABEL[product.unit] ?? product.unit;

  const markets = [...product.markets].sort(
    (a, b) =>
      (a.min + a.max) / 2 - (b.min + b.max) / 2,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <nav
        aria-label="ব্রেডক্রাম্ব"
        className="flex flex-wrap gap-2 text-xs text-gray-500"
      >
        <Link href="/" className="hover:underline">
          হোম
        </Link>

        <span aria-hidden="true">›</span>

        <Link
          href={`/category/${product.category}`}
          className="hover:underline"
        >
          {product.categoryNameBn}
        </Link>

        <span aria-hidden="true">›</span>

        <span aria-current="page">{product.nameBn}</span>
      </nav>

      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e2e9e3] bg-white p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gray-100 text-4xl"
            aria-hidden="true"
          >
            {product.image}
          </span>

          <div>
            <h1 className="text-2xl font-bold text-[#17231b]">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              গতকালের তুলনায় আজ দাম{" "}
              {diff === 0 ? (
                <strong>অপরিবর্তিত আছে</strong>
              ) : (
                <>
                  <strong>
                    {diff > 0 ? "বেড়েছে" : "কমেছে"}
                  </strong>
                  , {toBn(Math.abs(diff))} টাকা
                </>
              )}
            </p>

            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-[#d5dfd7] px-3 py-1 text-[#34443a]">
                {product.categoryNameBn}
              </span>

              <span className="rounded-full border border-[#d5dfd7] px-3 py-1 text-[#34443a]">
                {unitLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="text-3xl font-bold text-[#17231b]">
            {formatPrice(product.today)}
          </p>

          <p className="text-xs text-gray-500">
            টাকা / {UNIT_SHORT[product.unit] ?? product.unit}
          </p>

          <span
            className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${CHANGE_BG[product.change.dir]} ${CHANGE_COLOR[product.change.dir]}`}
          >
            {formatChange(product.change)}
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e2e9e3] bg-white p-5">
        <h2 className="mb-3 font-bold text-[#17231b]">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard
            label="সর্বনিম্ন দাম"
            value={min}
            note="সবচেয়ে কম দামের বাজার"
            valueClassName="text-green-600"
          />

          <StatCard
            label="সর্বাধিক দাম"
            value={max}
            note="সবচেয়ে বেশি দামের বাজার"
            valueClassName="text-red-600"
          />

          <StatCard
            label="গড় দাম"
            value={average}
            note={`${unitLabel}-এর হিসাব`}
            valueClassName="text-green-700"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-[#e2e9e3] bg-white p-5">
        <h2 className="mb-3 font-bold text-[#17231b]">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="text-[#34443a]">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>

            <tbody>
              {markets.length > 0 ? (
                markets.map((market) => (
                  <tr key={`${market.market}-${market.division}`}>
                    <td>{market.market}</td>
                    <td>{market.division}</td>
                    <td className="text-right">
                      {formatPrice(market.min)} টাকা
                    </td>
                    <td className="text-right">
                      {formatPrice(market.max)} টাকা
                    </td>
                    <td className="text-right font-semibold">
                      {formatAverage(
                        (market.min + market.max) / 2,
                      )}{" "}
                      টাকা
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-gray-500"
                  >
                    কোনো বাজারের তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}