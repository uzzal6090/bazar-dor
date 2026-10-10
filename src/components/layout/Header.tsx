import Link from "next/link";
import { Suspense } from "react";
import AuthButtons from "./AuthButtons";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import BanglaDate from "./BanglaDate";
import { getCategories, getProducts } from "@/lib/bazardor-api";
import Image from "next/image";

const Header = async () => {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <header className="border-b border-[#e2e9e3] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo-icon.png"
              alt="বাজার দর লোগো"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl"
            />
            <span className="text-xl font-bold text-[#17231b]">বাজার দর</span>
          </div>
          <BanglaDate className="mt-1 text-xs text-[#68756c]" />
        </Link>

        <AuthButtons />
      </div>

      <Suspense fallback={null}>
        <CategoryNav categories={categories} />
      </Suspense>
      <PriceTicker products={products} />
    </header>
  );
};

export default Header;
