import type { Product } from "@/types/bazardor";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  iconClassName?: string;
  products: Product[];
}

export default function ProductSection({
  id,
  title,
  subtitle,
  icon,
  iconClassName,
  products,
}: ProductSectionProps) {
  return (
    <section id={id}>
      <h2 className="flex items-center gap-2 text-xl font-bold text-[#17231b]">
        {icon && <span className={`text-sm ${iconClassName}`}>{icon}</span>}
        {title}
      </h2>

      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}

      {products.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-[#e2e9e3] bg-white p-6 text-center text-sm text-gray-500">
          এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
