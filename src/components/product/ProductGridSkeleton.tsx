
export default function ProductGridSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div
      className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[#e2e9e3] bg-white p-4"
        >
          {/* Product name and image placeholder */}
          <div className="flex items-center gap-3">
            <div className="skeleton h-11 w-11 shrink-0 rounded-xl" />

            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/3 rounded" />
            </div>
          </div>

          {/* Price placeholder */}
          <div className="mt-4 space-y-3">
            <div className="skeleton h-3 w-20 rounded" />

            <div className="flex items-center justify-between gap-3">
              <div className="skeleton h-6 w-28 rounded" />
              <div className="skeleton h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}