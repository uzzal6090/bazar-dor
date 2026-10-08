export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-32 rounded-2xl" />
      ))}
    </div>
  );
}