import { Suspense } from "react";
import CategoryProducts from "@/components/category/CategoryProducts";
import NotFoundView from "@/components/common/NotFoundView";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/bazardor-api";
import { toBn } from "@/lib/format";

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return <NotFoundView message="এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।" />;
  }

  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    return <NotFoundView message="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।" />;
  }

  return (
    <>
      <div className="flex items-center gap-4 rounded-2xl border border-[#e2e9e3] bg-white p-5">
        <span className="text-4xl">{category.icon}</span>

        <div>
          <h1 className="text-2xl font-bold text-[#17231b]">
            {category.nameBn}
          </h1>
          <p className="text-sm text-gray-500">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts products={products} />
    </>
  );
}

function CategorySkeleton() {
  return (
    <>
      <div className="skeleton h-24 rounded-2xl" />
      <div className="skeleton h-16 rounded-2xl" />
      <ProductGridSkeleton count={4} />
    </>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
}