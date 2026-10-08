"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/bazardor";
import ProductCard from "@/components/product/ProductCard";
import { toBn } from "@/lib/format";

type SortOption = "default" | "asc" | "desc";

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];

    // Number diye compare kora hocche (p.today), Bangla string diye na
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);

    return list;
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-[#e2e9e3] bg-white p-4">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান:
        </label>

        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="appearance-none rounded-lg border border-[#d5dfd7] bg-white py-2 pl-3 pr-9 text-sm text-[#17231b] outline-none focus:border-[#168044]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>

          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        মোট {toBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}