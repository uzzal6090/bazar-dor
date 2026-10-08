import CategoryNav from "./CategoryNav";
import { getCategories } from "@/lib/bazardor-api";

const Header = async () => {
  const categories = await getCategories();

  return (
   <header className="border-b border-[#e2e9e3] bg-white">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
    <div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🛒</span>

        <h1 className="text-xl font-bold text-[#17231b]">
          বাজার দর
        </h1>
      </div>

      <p className="mt-1 text-xs text-[#68756c]">
        বৃহস্পতিবার, ৮ অক্টোবর ২০২৬
      </p>
    </div>

    <div className="flex items-center gap-2">
      <button className="rounded-md px-3 py-2 text-sm font-medium text-[#34443a] hover:bg-[#f0f6f1]">
        সাইন ইন
      </button>

      <button className="rounded-md bg-[#168044] px-3 py-2 text-sm font-medium text-white hover:bg-[#126b39]">
        সাইন আপ
      </button>
    </div>
  </div>

  <CategoryNav categories={categories} />
</header>
  );
};

export default Header;