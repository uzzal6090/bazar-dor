import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import ProductSection from "@/components/product/ProductSection";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import { getProducts } from "@/lib/bazardor-api";
import { toBn } from "@/lib/format";

async function HomeSections() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <ProductSection
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconClassName="text-green-600"
        products={risers}
      />

      <ProductSection
        title="আজ দাম কমেছে"
        icon="▼"
        iconClassName="text-red-600"
        products={fallers}
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </>
  );
}

function HomeSkeleton() {
  return (
    <>
      <section>
        <div className="skeleton h-6 w-40" />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <div className="skeleton h-6 w-40" />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <div className="skeleton h-6 w-40" />
        <ProductGridSkeleton count={9} />
      </section>
    </>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}