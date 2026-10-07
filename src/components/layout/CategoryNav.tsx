
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types/bazardor";

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({
  categories,
}: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের বিভাগ"
      className="border-y border-[#e2e9e3] bg-white"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-3 py-2 sm:gap-3 sm:px-4">
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={category.id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-2 py-2 text-xs transition-colors sm:text-sm ${
                isActive
                  ? "bg-[#e5f4e9] font-semibold text-[#168044]"
                  : "text-[#34443a] hover:bg-[#f0f6f1]"
              }`}
            >
              <span aria-hidden="true">{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}