export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6 space-y-4"
      style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.4)" }}
    >
      <div className="skeleton h-5 w-2/3" />
      <div className="skeleton h-3.5 w-full" />
      <div className="skeleton h-3.5 w-5/6" />
      <div className="skeleton h-3.5 w-4/6" />
      <div className="pt-2 border-t border-white/5">
        <div className="skeleton h-3 w-24" />
      </div>
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-8 space-y-4">
        <div className="skeleton h-9 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-5 space-y-3">
            <div className="skeleton h-4 w-32" />
            <div className="skeleton h-3.5 w-full" />
            <div className="skeleton h-3.5 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
