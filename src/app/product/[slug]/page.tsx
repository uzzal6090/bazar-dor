import { Suspense } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NotFoundView from "@/components/common/NotFoundView";
import ProductDetails from "@/components/product/ProductDetails";
import { getProductBySlug } from "@/lib/bazardor-api";

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return <NotFoundView message="এই পণ্যটি খুঁজে পাওয়া যায়নি।" />;
  }

  return (
    <ProtectedRoute>
      <ProductDetails product={product} />
    </ProtectedRoute>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      <div className="skeleton h-40 rounded-2xl" />
      <div className="skeleton h-28 rounded-2xl" />
      <div className="skeleton h-96 rounded-2xl" />
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}